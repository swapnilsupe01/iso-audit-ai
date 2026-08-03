import chromadb
import pymupdf
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import json

# ============================================
# FREE LOCAL EMBEDDING MODEL
# No API key needed
# ============================================
embedder = SentenceTransformer('all-MiniLM-L6-v2')
# Downloads once (~80MB), runs locally forever

# ChromaDB local storage
chroma_client = chromadb.PersistentClient(
    path="./chroma_db"
)

# ============================================
# ISO KNOWLEDGE BASE
# All clauses stored as vectors
# ============================================

ISO_KNOWLEDGE = {
    "ISO 9001:2015": {
        "4.1": {
            "requirement": """Organization shall determine 
            external and internal issues relevant to its 
            purpose. Context analysis required including 
            interested parties, SWOT analysis, PESTLE 
            analysis. Evidence: Context document, 
            stakeholder register, SWOT/PESTLE records.""",
            "keywords": ["context", "interested parties", 
                        "swot", "pestle", "stakeholders",
                        "external", "internal issues"]
        },
        "5.1": {
            "requirement": """Top management shall demonstrate 
            leadership and commitment. Quality policy must be 
            established, documented and communicated.
            Management shall ensure resources available.
            Evidence: Signed policy, meeting minutes,
            resource allocation records.""",
            "keywords": ["leadership", "management", "policy",
                        "commitment", "resources", "objectives"]
        },
        "6.1": {
            "requirement": """Organization shall plan actions 
            to address risks and opportunities. Risk assessment
            methodology defined. Risk register maintained.
            Treatment plans documented and implemented.
            Evidence: Risk register, treatment plan,
            risk criteria, opportunity register.""",
            "keywords": ["risk", "opportunity", "assessment",
                        "treatment", "register", "criteria"]
        },
        "7.2": {
            "requirement": """Organization shall determine 
            necessary competence of persons affecting quality.
            Training provided where gaps identified.
            Training effectiveness evaluated.
            Evidence: Competency matrix, training records,
            effectiveness evaluation, job descriptions.""",
            "keywords": ["competence", "training", "skills",
                        "education", "qualification", "matrix"]
        },
        "8.4": {
            "requirement": """Control of externally provided 
            processes, products and services. Supplier 
            evaluation criteria defined. Approved supplier 
            list maintained. Supplier performance monitored.
            Evidence: Approved vendor list, evaluation 
            records, performance monitoring, purchase orders.""",
            "keywords": ["supplier", "vendor", "external",
                        "purchase", "evaluation", "approved"]
        },
        "9.1": {
            "requirement": """Monitor, measure, analyze and 
            evaluate quality performance. Methods defined 
            for monitoring. Analysis performed at planned 
            intervals. Customer satisfaction monitored.
            Evidence: KPI records, monitoring reports,
            customer satisfaction data, analysis records.""",
            "keywords": ["monitoring", "measurement", "kpi",
                        "performance", "analysis", "customer"]
        },
        "9.2": {
            "requirement": """Internal audits conducted at 
            planned intervals. Audit program established.
            Auditors selected ensuring objectivity.
            Audit findings reported to management.
            CAPA raised for nonconformities found.
            Evidence: Audit schedule, audit reports,
            auditor records, CAPA records.""",
            "keywords": ["internal audit", "audit schedule",
                        "audit plan", "findings", "CAPA",
                        "nonconformity", "auditor"]
        },
        "10.1": {
            "requirement": """Nonconformities identified and 
            controlled. Corrective actions implemented.
            Root cause analysis performed. Effectiveness 
            of actions verified. Lessons learned shared.
            Evidence: NCR register, CAPA records,
            root cause analysis, verification records.""",
            "keywords": ["nonconformity", "corrective action",
                        "CAPA", "root cause", "NCR",
                        "improvement", "defect"]
        }
    },
    
    "ISO 27001:2022": {
        "4.1": {
            "requirement": """Determine external and internal 
            issues relevant to ISMS purpose. Understand 
            organizational context for information security.
            Consider legal regulatory requirements.
            Evidence: Context document, issue register,
            regulatory requirements list.""",
            "keywords": ["context", "isms", "information security", "issues", "regulatory", "legal"]
        },
        "5.2": {
            "requirement": """Information security policy 
            established by top management. Policy appropriate 
            to organization purpose. Includes commitment to 
            satisfy requirements and continual improvement.
            Policy communicated and available.
            Evidence: Signed IS policy, communication 
            records, policy review records.""",
            "keywords": ["information security policy",
                        "isms policy", "security objectives",
                        "commitment", "management", "signed"]
        },
        "6.1": {
            "requirement": """Risk assessment process defined.
            Information security risks identified, analyzed
            and evaluated. Risk acceptance criteria defined.
            Risk treatment plan documented and approved.
            Statement of Applicability (SoA) maintained.
            Evidence: Risk register, SoA document,
            treatment plan, risk assessment records.""",
            "keywords": ["risk assessment", "risk register",
                        "soa", "statement of applicability",
                        "treatment", "annex a", "controls"]
        },
        "9.2": {
            "requirement": """Internal ISMS audits conducted 
            at planned intervals. Audit programme considers 
            importance of processes and previous results.
            Auditors selected ensuring objectivity.
            Results reported to management.
            Evidence: ISMS audit schedule, audit reports,
            auditor competency, CAPA from audits.""",
            "keywords": ["isms audit", "internal audit",
                        "audit schedule", "audit programme",
                        "security audit", "findings"]
        }
    },
    
    "ISO 14001:2015": {
        "6.1": {
            "requirement": """Identify environmental aspects 
            and impacts of activities. Determine significant 
            aspects. Consider life cycle perspective.
            Compliance obligations identified.
            Evidence: Aspect impact register, 
            significance criteria, legal register.""",
            "keywords": ["environmental aspect", "impact",
                        "significant", "legal", "compliance",
                        "life cycle", "hira"]
        },
        "9.1": {
            "requirement": """Monitor and measure environmental
            performance. Legal compliance evaluated.
            Environmental objectives monitored.
            Evidence: Monitoring records, compliance 
            evaluation, objectives tracking.""",
            "keywords": ["environmental monitoring",
                        "compliance", "objectives",
                        "measurement", "performance"]
        }
    },
    
    "ISO 45001:2018": {
        "6.1": {
            "requirement": """Hazard identification and risk 
            assessment process established. All activities,
            routine and non-routine considered. Worker 
            participation in hazard identification.
            HIRA documented and reviewed regularly.
            Evidence: HIRA records, risk assessment,
            worker consultation records.""",
            "keywords": ["hazard", "hira", "risk assessment",
                        "safety", "health", "worker",
                        "incident", "accident"]
        },
        "9.2": {
            "requirement": """OH&S management system audited 
            at planned intervals. Audit programme established.
            Audit results reported to management.
            Evidence: OH&S audit schedule, audit reports,
            CAPA from safety audits.""",
            "keywords": ["ohs audit", "safety audit",
                        "health safety", "audit programme"]
        }
    },
    
    "ISO 22000:2018": {
        "8.2": {
            "requirement": """Prerequisite programmes (PRPs) 
            established and maintained. PRPs appropriate 
            to organization and products. PRPs documented
            and verified for effectiveness.
            Evidence: PRP documents, verification records,
            GMP records, cleaning records.""",
            "keywords": ["prp", "prerequisite", "gmp",
                        "food safety", "cleaning", "hygiene",
                        "contamination", "haccp"]
        },
        "8.5": {
            "requirement": """HACCP plan established. 
            Hazard analysis performed. Critical control 
            points identified. Critical limits defined.
            Monitoring system established. Corrective 
            actions defined for deviations.
            Evidence: HACCP plan, hazard analysis,
            CCP monitoring records, deviation records.""",
            "keywords": ["haccp", "ccp", "critical control",
                        "hazard analysis", "food safety",
                        "critical limit", "monitoring"]
        }
    }
}

# ============================================
# BUILD KNOWLEDGE BASE
# Run once — stores all clauses in ChromaDB
# ============================================

def build_knowledge_base():
    """Load all ISO clauses into ChromaDB"""
    
    collection = chroma_client.get_or_create_collection(
        name="iso_knowledge",
        metadata={"hnsw:space": "cosine"}
    )
    
    # Check if already built
    if collection.count() > 0:
        print(f"✅ Knowledge base already loaded — {collection.count()} clauses")
        return collection
    
    documents = []
    embeddings = []
    ids = []
    metadatas = []
    
    for standard, clauses in ISO_KNOWLEDGE.items():
        for clause_id, data in clauses.items():
            
            # Full text for embedding
            full_text = f"""
            Standard: {standard}
            Clause: {clause_id}
            Requirement: {data['requirement']}
            Keywords: {', '.join(data['keywords'])}
            """
            
            doc_id = f"{standard}_{clause_id}".replace(
                " ", "_"
            ).replace(":", "")
            
            embedding = embedder.encode(
                [full_text]
            ).tolist()[0]
            
            documents.append(full_text)
            embeddings.append(embedding)
            ids.append(doc_id)
            metadatas.append({
                "standard": standard,
                "clause_id": clause_id
            })
    
    collection.add(
        documents=documents,
        embeddings=embeddings,
        ids=ids,
        metadatas=metadatas
    )
    
    print(f"✅ Built knowledge base with {len(documents)} clauses")
    return collection

# ============================================
# CORE RAG ANALYSIS
# Pure vector similarity — no API needed
# ============================================

def analyze_clause_pure_rag(
    document_text: str,
    standard: str,
    clause_id: str
) -> dict:
    """
    Pure RAG analysis:
    1. Get ISO clause requirement
    2. Embed document text
    3. Check similarity
    4. Generate finding based on similarity
    """
    
    # Get clause requirement
    standard_clauses = ISO_KNOWLEDGE.get(standard, {})
    clause_data = standard_clauses.get(clause_id, {})
    
    if not clause_data:
        return {
            "clause_id": clause_id,
            "status": "Not applicable",
            "finding": "Clause not found",
            "severity_score": 0
        }
    
    requirement = clause_data['requirement']
    keywords = clause_data['keywords']
    
    # Embed requirement and document
    req_embedding = embedder.encode([requirement])
    doc_embedding = embedder.encode([document_text[:1000]])
    
    # Calculate similarity
    similarity = cosine_similarity(
        req_embedding, 
        doc_embedding
    )[0][0]
    
    # Check keyword presence
    doc_lower = document_text.lower()
    keywords_found = [
        kw for kw in keywords 
        if kw.lower() in doc_lower
    ]
    keyword_score = len(keywords_found) / len(keywords)
    
    # Combined score
    combined_score = (similarity * 0.6) + (keyword_score * 0.4)
    
    # Determine status based on score
    if combined_score >= 0.75:
        status = "Conforming"
        severity = 1
        finding = f"Document demonstrates good compliance with {clause_id} requirements. Evidence found for: {', '.join(keywords_found[:3])}"
        recommendation = "Maintain current practices and continue monitoring."
    elif combined_score >= 0.55:
        status = "Minor Gap"
        severity = 4
        missing = [k for k in keywords if k not in keywords_found]
        finding = f"Partial compliance found. Missing evidence for: {', '.join(missing[:3])}"
        recommendation = f"Strengthen documentation for: {', '.join(missing[:3])}"
    elif combined_score >= 0.35:
        status = "Major Gap"
        severity = 7
        finding = f"Significant gaps found in {clause_id} compliance. Limited evidence of required processes."
        recommendation = f"Implement documented processes for all {clause_id} requirements immediately."
    else:
        status = "Nonconformance"
        severity = 10
        finding = f"No evidence found for {clause_id} requirements. Critical gap identified."
        recommendation = f"Urgently establish and document {clause_id} processes. Raise CAPA immediately."
    
    return {
        "clause_id": clause_id,
        "clause_name": list(standard_clauses.keys())[
            list(standard_clauses.keys()).index(clause_id)
        ] if clause_id in standard_clauses else clause_id,
        "standard": standard,
        "status": status,
        "similarity_score": round(float(similarity), 3),
        "keyword_score": round(keyword_score, 3),
        "combined_score": round(combined_score, 3),
        "keywords_found": keywords_found,
        "finding": finding,
        "requirement": requirement.strip(),
        "recommendation": recommendation,
        "severity_score": severity
    }

# ============================================
# FULL AUDIT RUNNER
# ============================================

def run_pure_rag_audit(
    document_text: str,
    standard: str,
    company_name: str
) -> dict:
    """Run complete audit for all clauses"""
    
    standard_clauses = ISO_KNOWLEDGE.get(standard, {})
    
    if not standard_clauses:
        return {"error": f"Standard {standard} not found"}
    
    findings = []
    
    for clause_id in standard_clauses.keys():
        print(f"  Analyzing {standard} Clause {clause_id}...")
        
        finding = analyze_clause_pure_rag(
            document_text,
            standard,
            clause_id
        )
        findings.append(finding)
    
    # Calculate summary
    total = len(findings)
    conforming = sum(
        1 for f in findings 
        if f['status'] == 'Conforming'
    )
    minor_gaps = sum(
        1 for f in findings 
        if f['status'] == 'Minor Gap'
    )
    major_gaps = sum(
        1 for f in findings 
        if f['status'] == 'Major Gap'
    )
    nonconformances = sum(
        1 for f in findings 
        if f['status'] == 'Nonconformance'
    )
    
    compliance_score = round(
        (conforming / total) * 100
    ) if total > 0 else 0
    
    return {
        "company_name": company_name,
        "standard": standard,
        "audit_summary": {
            "total_clauses": total,
            "conforming": conforming,
            "minor_gaps": minor_gaps,
            "major_gaps": major_gaps,
            "nonconformances": nonconformances,
            "compliance_score": compliance_score,
            "risk_level": (
                "Low" if compliance_score >= 80
                else "Medium" if compliance_score >= 60
                else "High"
            )
        },
        "findings": findings
    }

# ============================================
# PHYSICAL vs ONLINE COMPARISON
# Your unique IEEE paper feature
# ============================================

def compare_physical_vs_online(
    physical_findings: list,
    online_findings: list
) -> dict:
    """
    Compare manual auditor findings
    vs AI RAG findings
    For IEEE paper accuracy measurement
    """
    
    matches = 0
    total = len(online_findings)
    comparison = []
    
    for online in online_findings:
        clause = online['clause_id']
        
        # Find matching physical finding
        physical = next(
            (p for p in physical_findings 
             if p['clause_id'] == clause),
            None
        )
        
        if physical:
            match = (
                physical['status'] == online['status']
            )
            if match:
                matches += 1
            
            comparison.append({
                "clause_id": clause,
                "physical_status": physical['status'],
                "ai_status": online['status'],
                "match": match,
                "ai_score": online['combined_score']
            })
    
    accuracy = round((matches / total) * 100) if total > 0 else 0
    
    return {
        "accuracy_percentage": accuracy,
        "total_clauses": total,
        "matches": matches,
        "mismatches": total - matches,
        "comparison": comparison,
        "conclusion": (
            f"AI RAG system achieved {accuracy}% accuracy "
            f"compared to manual auditor findings across "
            f"{total} ISO clauses"
        )
    }