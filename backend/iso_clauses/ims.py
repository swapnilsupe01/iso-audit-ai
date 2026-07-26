"""
IMS: Integrated Management System Harmonized Clause Framework
Combines ISO 9001, ISO 14001, ISO 45001, ISO 27001, and ISO 22000 into a unified audit matrix.
"""

from .iso9001 import ISO9001_CLAUSES
from .iso14001 import ISO14001_CLAUSES
from .iso45001 import ISO45001_CLAUSES
from .iso27001 import ISO27001_CLAUSES
from .iso22000 import ISO22000_CLAUSES

IMS_CLAUSES = [
    {
        "id": "IMS-4.0",
        "clause": "IMS Clause 4: Organizational Context & Scope Integration",
        "title": "Unified Context & Stakeholder Alignment",
        "requirements": "Harmonized evaluation of QMS, EMS, OH&S, and ISMS internal/external factors and legal requirements.",
        "evidence_required": "Integrated IMS Manual, Stakeholder & Legal Register, Unified Scope document.",
        "weight": 10,
        "standards": ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001", "ISO 22000"]
    },
    {
        "id": "IMS-5.0",
        "clause": "IMS Clause 5: Top Management Leadership & Integrated Governance",
        "title": "Integrated Leadership & Policy",
        "requirements": "Single integrated EHSQ & Information Security policy signed by executive management.",
        "evidence_required": "Unified IMS Policy, Executive Management Review Minutes, Resource Allocation.",
        "weight": 10,
        "standards": ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001"]
    },
    {
        "id": "IMS-6.0",
        "clause": "IMS Clause 6: Integrated Risk & Opportunity Management",
        "title": "Unified Risk & Aspect Assessment",
        "requirements": "Combined risk assessment covering operational quality, environmental aspects, safety hazards, and security threats.",
        "evidence_required": "Integrated Risk Register (QMS + EMS + OH&S + ISMS), Opportunity Tracking Plan.",
        "weight": 10,
        "standards": ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001", "ISO 22000"]
    },
    {
        "id": "IMS-7.5",
        "clause": "IMS Clause 7.5: Unified Documented Information",
        "title": "Integrated Document Control",
        "requirements": "Centralized document control for standard operating procedures, forms, and revision history across all standards.",
        "evidence_required": "Master Document Index, Version Control System, Access Control Permissions.",
        "weight": 9,
        "standards": ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001", "ISO 22000"]
    },
    {
        "id": "IMS-8.0",
        "clause": "IMS Clause 8: Operational Control & Emergency Preparedness",
        "title": "Integrated Operational Controls",
        "requirements": "Harmonized SOPs for operations, change management, spill response, fire safety, and incident recovery.",
        "evidence_required": "Integrated Operations Manual, Emergency Preparedness Drills, Supplier Evaluation.",
        "weight": 10,
        "standards": ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001", "ISO 22000"]
    },
    {
        "id": "IMS-9.0",
        "clause": "IMS Clause 9: Combined Performance Evaluation & Auditing",
        "title": "Integrated Audits & Management Review",
        "requirements": "Single integrated annual audit program and combined Management Review addressing all ISO standards.",
        "evidence_required": "Integrated Audit Plan, Audit Reports, Management Review Pack & Action Log.",
        "weight": 10,
        "standards": ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001", "ISO 22000"]
    },
    {
        "id": "IMS-10.0",
        "clause": "IMS Clause 10: Continual Improvement & CAPA System",
        "title": "Unified Corrective Action System",
        "requirements": "Single CAPA portal handling non-conformities, incidents, customer complaints, and security breaches.",
        "evidence_required": "Integrated CAPA Register, Root Cause Analysis (5-Why), Effectiveness verification.",
        "weight": 10,
        "standards": ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001", "ISO 22000"]
    }
]

def GET_INTEGRATED_STANDARDS(selected_standards):
    """
    Returns combined clauses for multiple selected standards or IMS harmonization.
    """
    clauses = []
    if "IMS" in selected_standards:
        return IMS_CLAUSES
    
    if "ISO 9001" in selected_standards:
        clauses.extend(ISO9001_CLAUSES)
    if "ISO 14001" in selected_standards:
        clauses.extend(ISO14001_CLAUSES)
    if "ISO 45001" in selected_standards:
        clauses.extend(ISO45001_CLAUSES)
    if "ISO 22000" in selected_standards:
        clauses.extend(ISO22000_CLAUSES)
    if "ISO 27001" in selected_standards:
        clauses.extend(ISO27001_CLAUSES)
        
    return clauses if clauses else ISO9001_CLAUSES
