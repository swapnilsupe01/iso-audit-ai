"""
ISO 22000:2018 Food Safety Management Systems (FSMS) Framework
"""

ISO22000_CLAUSES = [
    {
        "id": "7.1.6",
        "clause": "7.1.6 Control of externally developed FSMS elements",
        "title": "Externally Provided FSMS Elements",
        "requirements": "Ensure externally developed FSMS elements conform to ISO 22000 requirements.",
        "evidence_required": "Supplier food safety certifications, audit reports, specs verification.",
        "weight": 8
    },
    {
        "id": "8.2",
        "clause": "8.2 Prerequisite programmes (PRPs)",
        "title": "Prerequisite Programmes (PRPs)",
        "requirements": "Establish, implement, and maintain PRPs to assist in controlling food safety hazards.",
        "evidence_required": "Sanitation SOPs, pest control contracts, hygiene inspection logs, allergen control plan.",
        "weight": 10
    },
    {
        "id": "8.3",
        "clause": "8.3 Traceability system",
        "title": "Traceability System",
        "requirements": "Establish traceability system to identify incoming material batches and distribution paths.",
        "evidence_required": "Mock recall reports, batch coding system logs, forward/backward tracking exercises.",
        "weight": 10
    },
    {
        "id": "8.5.2",
        "clause": "8.5.2 Hazard analysis",
        "title": "Hazard Analysis & Assessment",
        "requirements": "Conduct hazard analysis to identify biological, chemical, and physical hazards requiring control.",
        "evidence_required": "HACCP Flow diagrams, hazard identification worksheet, severity/risk evaluation.",
        "weight": 10
    },
    {
        "id": "8.5.4",
        "clause": "8.5.4 Hazard control plan (HACCP / OPRP plan)",
        "title": "HACCP & OPRP Plan",
        "requirements": "Establish CCP critical limits, action criteria for OPRPs, and monitoring procedures.",
        "evidence_required": "HACCP Master Plan, CCP monitoring logs, critical limit validation studies.",
        "weight": 10
    },
    {
        "id": "8.9",
        "clause": "8.9 Control of product and process nonconformities",
        "title": "Product Hold & Recall",
        "requirements": "Ensure products affected by nonconformities are evaluated and prevented from entering food chain.",
        "evidence_required": "Quarantine records, product hold logs, withdrawal & recall procedure, disposition records.",
        "weight": 10
    }
]
