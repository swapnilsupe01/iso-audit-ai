"""
ISO/IEC 27001:2022 Information Security Management Systems (ISMS) Framework
"""

ISO27001_CLAUSES = [
    {
        "id": "6.1.2",
        "clause": "6.1.2 Information security risk assessment",
        "title": "Information Security Risk Assessment",
        "requirements": "Define and apply an information security risk assessment process that establishes risk criteria.",
        "evidence_required": "ISMS Risk Assessment Methodology, Risk Register, Threat/Vulnerability matrix.",
        "weight": 10
    },
    {
        "id": "6.1.3",
        "clause": "6.1.3 Information security risk treatment",
        "title": "Statement of Applicability (SoA)",
        "requirements": "Formulate risk treatment plan and produce Statement of Applicability (SoA) covering Annex A controls.",
        "evidence_required": "Statement of Applicability (SoA), Risk Treatment Plan (RTP), control justification.",
        "weight": 10
    },
    {
        "id": "A.5",
        "clause": "Annex A.5 Organizational controls",
        "title": "Organizational Controls",
        "requirements": "Information security policies, roles, segregation of duties, threat intelligence, and cloud services.",
        "evidence_required": "Information Security Policy, Acceptable Use Policy, Cloud Security checklist.",
        "weight": 9
    },
    {
        "id": "A.6",
        "clause": "Annex A.6 People controls",
        "title": "People Controls & Screening",
        "requirements": "Background screening, security awareness training, disciplinary process, remote working rules.",
        "evidence_required": "Employee background check logs, security awareness training completion records.",
        "weight": 8
    },
    {
        "id": "A.7",
        "clause": "Annex A.7 Physical controls",
        "title": "Physical & Environmental Security",
        "requirements": "Physical security perimeters, entry controls, equipment protection, clear desk/clear screen policy.",
        "evidence_required": "Visitor logs, badge access reports, CCTV retention policy, clean desk audit sheets.",
        "weight": 9
    },
    {
        "id": "A.8",
        "clause": "Annex A.8 Technological controls",
        "title": "Technological Security Controls",
        "requirements": "Access control, privileged access management, vulnerability management, data leakage prevention (DLP), encryption.",
        "evidence_required": "Access control review, patch management reports, pentest reports, firewall rule reviews.",
        "weight": 10
    }
]
