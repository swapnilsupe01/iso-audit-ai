"""
ISO Audit AI - FastAPI Backend API Server
Supports Pure RAG Engine (SentenceTransformers + ChromaDB), Gemini AI,
PDF & Excel Report Generation, and Physical vs. Online Audit Comparison.
"""

import os
import shutil
import logging
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, File, UploadFile, Form, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel

from .pdf_extractor import PDFExtractor
from .gemini_service import GeminiAuditService
from .report_generator import ReportGenerator
from .iso_clauses import ALL_STANDARDS

# Import Pure RAG Engine modules
try:
    from .pure_rag_engine import (
        build_knowledge_base,
        run_pure_rag_audit,
        compare_physical_vs_online
    )
    RAG_AVAILABLE = True
except ImportError as e:
    logger_err = logging.getLogger("main_api")
    logger_err.warning(f"Pure RAG Engine import warning: {e}")
    RAG_AVAILABLE = False

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("main_api")

app = FastAPI(
    title="ISO Audit AI — Pure RAG Engine",
    description="Automated AI Audit & Compliance Analysis for ISO 9001, 14001, 45001, 22000, 27001, and IMS using Pure Local RAG & Gemini AI",
    version="2.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup Storage Directories
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "uploads"))
REPORT_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "reports"))
CHROMA_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "chroma_db"))

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(REPORT_DIR, exist_ok=True)
os.makedirs(CHROMA_DIR, exist_ok=True)

# Initialize Services
gemini_service = GeminiAuditService()

# Active audit cache
AUDIT_CACHE = {}

@app.on_event("startup")
async def startup_event():
    """Initializes local ChromaDB ISO knowledge base on server startup."""
    logger.info("Initializing ISO Audit AI Services...")
    if RAG_AVAILABLE:
        try:
            logger.info("Building Pure RAG ISO Knowledge Base in ChromaDB...")
            build_knowledge_base()
            logger.info("Pure RAG System initialized successfully.")
        except Exception as e:
            logger.error(f"Error building RAG knowledge base: {e}")

class AuditRequest(BaseModel):
    filename: str
    selected_standards: List[str]
    sample_text: Optional[str] = None
    company_name: Optional[str] = "Corporate Entity"

class CompareRequest(BaseModel):
    physical_findings: List[Dict[str, Any]]
    online_findings: List[Dict[str, Any]]

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "ISO Audit AI System API — Pure RAG Engine",
        "api_required": False,
        "supported_standards": list(ALL_STANDARDS.keys())
    }

@app.get("/api/standards")
def get_standards():
    """Returns supported ISO standards metadata and clause counts."""
    standards_list = [
        {"id": 1, "name": "ISO 9001:2015", "code": "ISO 9001", "desc": "Quality Management Systems"},
        {"id": 2, "name": "ISO 14001:2015", "code": "ISO 14001", "desc": "Environmental Management Systems"},
        {"id": 3, "name": "ISO 45001:2018", "code": "ISO 45001", "desc": "Occupational Health & Safety"},
        {"id": 4, "name": "IMS Matrix", "code": "IMS", "desc": "Integrated Management System (9001+14001+45001)"},
        {"id": 5, "name": "ISO 22000:2018", "code": "ISO 22000", "desc": "Food Safety Management Systems"},
        {"id": 6, "name": "ISO 27001:2022", "code": "ISO 27001", "desc": "Information Security Management"}
    ]
    return {"standards": standards_list, "details": ALL_STANDARDS}

@app.post("/api/audit/upload")
async def upload_document(file: UploadFile = File(...)):
    """Receives policy document, saves to stage dir, and extracts text structure."""
    try:
        file_location = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        extracted = PDFExtractor.extract_text_from_file(file_location)
        extracted["file_path"] = file_location

        return {
            "message": "File uploaded successfully",
            "file_info": {
                "filename": extracted["filename"],
                "file_type": extracted["file_type"],
                "page_count": extracted["page_count"],
                "word_count": extracted["word_count"],
                "char_count": extracted["char_count"],
                "headings_detected": extracted["detected_headings"][:8]
            }
        }
    except Exception as e:
        logger.error(f"Upload error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/audit/analyze")
async def analyze_document_rag(
    file: UploadFile = File(...),
    company_name: str = Form("Corporate Audit Entity"),
    standard: str = Form("ISO 9001:2015")
):
    """
    Form-data endpoint: Uploads PDF file, runs Pure RAG Audit engine, and creates PDF report.
    """
    try:
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        
        extracted = PDFExtractor.extract_text_from_file(file_path)
        doc_text = extracted.get("full_text", "")

        # Standard mapping helper
        std_key = "ISO 9001:2015"
        for k in ["ISO 9001:2015", "ISO 27001:2022", "ISO 14001:2015", "ISO 45001:2018", "ISO 22000:2018"]:
            if k.lower() in standard.lower() or standard.lower() in k.lower():
                std_key = k
                break

        if RAG_AVAILABLE:
            audit_results = run_pure_rag_audit(doc_text, std_key, company_name)
        else:
            # Fallback to Gemini / Rule engine if sentence-transformers is loading
            audit_results = gemini_service.run_audit(extracted, [std_key])

        # Generate report
        report_path = ReportGenerator.generate_pdf_report(audit_results, REPORT_DIR)
        report_filename = os.path.basename(report_path)

        audit_results["report_url"] = f"/api/reports/download/{audit_results.get('audit_id', 'AUD-001')}"
        audit_results["pdf_report_filename"] = report_filename

        AUDIT_CACHE[audit_results.get("audit_id", "AUD-001")] = audit_results
        return audit_results

    except Exception as e:
        logger.error(f"Analysis error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/audit/process")
async def process_audit(request: AuditRequest):
    """
    JSON API endpoint: Executes audit logic for selected document against specified ISO standards.
    """
    filename = request.filename
    selected_standards = request.selected_standards if request.selected_standards else ["ISO 9001"]

    file_path = os.path.join(UPLOAD_DIR, filename)

    if os.path.exists(file_path):
        doc_data = PDFExtractor.extract_text_from_file(file_path)
    elif request.sample_text:
        doc_data = {
            "filename": filename or "Sample Policy Document.txt",
            "full_text": request.sample_text,
            "page_count": 1,
            "word_count": len(request.sample_text.split()),
            "detected_headings": []
        }
    else:
        raise HTTPException(status_code=404, detail=f"Uploaded file '{filename}' not found on server.")

    # Execute Audit via Gemini/Rule engine
    audit_result = gemini_service.run_audit(doc_data, selected_standards)

    # Generate PDF Report
    report_filepath = ReportGenerator.generate_pdf_report(audit_result, REPORT_DIR)
    audit_result["pdf_report_filename"] = os.path.basename(report_filepath)

    AUDIT_CACHE[audit_result["audit_id"]] = audit_result
    return audit_result

@app.post("/api/audit/compare")
async def compare_audits(request: CompareRequest):
    """
    Compares physical manual audit findings vs. AI online RAG findings (useful for research papers).
    """
    if RAG_AVAILABLE:
        result = compare_physical_vs_online(
            request.physical_findings,
            request.online_findings
        )
        return result
    else:
        return {"error": "RAG engine not initialized"}

@app.get("/api/reports/download/{audit_id}")
def download_pdf_report(audit_id: str):
    """Serves generated PDF report file."""
    audit_result = AUDIT_CACHE.get(audit_id)
    filename = f"ISO_Audit_Report_{audit_id}.pdf"
    file_path = os.path.join(REPORT_DIR, filename)

    if not os.path.exists(file_path):
        if audit_result:
            file_path = ReportGenerator.generate_pdf_report(audit_result, REPORT_DIR)
        else:
            raise HTTPException(status_code=404, detail="PDF report not found.")

    return FileResponse(
        path=file_path,
        media_type="application/pdf",
        filename=filename
    )

@app.get("/api/reports/download-excel/{audit_id}")
def download_excel_report(audit_id: str):
    """Generates and serves an Excel (.xlsx) audit report."""
    audit_result = AUDIT_CACHE.get(audit_id)
    if not audit_result:
        raise HTTPException(status_code=404, detail=f"Audit ID '{audit_id}' not found. Run audit first.")

    try:
        file_path = ReportGenerator.generate_excel_report(audit_result, REPORT_DIR)
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))

    filename = os.path.basename(file_path)
    return FileResponse(
        path=file_path,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename=filename
    )

@app.get("/api/report/{filename}")
async def download_report_by_name(filename: str):
    """Serves report by direct filename."""
    file_path = os.path.join(REPORT_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Report file not found")
    return FileResponse(file_path, media_type="application/pdf", filename=filename)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
