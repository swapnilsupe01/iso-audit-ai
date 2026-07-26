"""
ISO 9001:2015 Quality Management Systems (QMS) Clauses Framework
"""

ISO9001_CLAUSES = [
    {
        "id": "4.1",
        "clause": "4.1 Understanding the organization and its context",
        "title": "Context of Organization",
        "requirements": "Determine external and internal issues relevant to purpose and strategic direction affecting intended QMS outcomes.",
        "evidence_required": "SWOT/PESTLE analysis, context document, internal/external issue register.",
        "weight": 8
    },
    {
        "id": "4.2",
        "clause": "4.2 Understanding needs & expectations of interested parties",
        "title": "Interested Parties",
        "requirements": "Identify relevant interested parties (customers, regulators, suppliers) and their quality requirements.",
        "evidence_required": "Stakeholder matrix, customer contracts, regulatory requirement logs.",
        "weight": 7
    },
    {
        "id": "4.3",
        "clause": "4.3 Determining the scope of the QMS",
        "title": "QMS Scope",
        "requirements": "Define boundaries and applicability of QMS including justified exclusions.",
        "evidence_required": "Documented scope statement, site list, process boundaries.",
        "weight": 9
    },
    {
        "id": "5.1",
        "clause": "5.1 Leadership and commitment",
        "title": "Leadership & Commitment",
        "requirements": "Top management must demonstrate accountability, customer focus, and resource provision.",
        "evidence_required": "Management review minutes, quality objectives signoff, resource allocation records.",
        "weight": 10
    },
    {
        "id": "5.2",
        "clause": "5.2 Policy",
        "title": "Quality Policy",
        "requirements": "Establish, communicate, and apply a quality policy appropriate to organization context.",
        "evidence_required": "Signed Quality Policy, communication records, employee awareness evidence.",
        "weight": 10
    },
    {
        "id": "6.1",
        "clause": "6.1 Actions to address risks and opportunities",
        "title": "Risk Management",
        "requirements": "Identify risks and opportunities to prevent undesired effects and achieve continual improvement.",
        "evidence_required": "Risk Assessment Register, risk treatment plans, mitigation monitoring records.",
        "weight": 10
    },
    {
        "id": "6.2",
        "clause": "6.2 Quality objectives and planning to achieve them",
        "title": "Quality Objectives",
        "requirements": "Establish measurable quality objectives at relevant functions, levels, and processes.",
        "evidence_required": "KPI dashboard, SMART objectives documentation, tracking charts.",
        "weight": 9
    },
    {
        "id": "7.1.5",
        "clause": "7.1.5 Monitoring and measuring resources",
        "title": "Calibrations & Measurement",
        "requirements": "Ensure valid and reliable results when monitoring or measuring product/service conformity.",
        "evidence_required": "Calibration logs, measurement equipment list, certificate of calibration.",
        "weight": 8
    },
    {
        "id": "7.2",
        "clause": "7.2 Competence",
        "title": "Competence & Training",
        "requirements": "Ensure personnel affecting quality performance are competent based on education, training, or experience.",
        "evidence_required": "Training matrices, skill gap analysis, job descriptions, competency evaluation records.",
        "weight": 8
    },
    {
        "id": "7.5",
        "clause": "7.5 Documented information",
        "title": "Document Control",
        "requirements": "Control creation, updating, versioning, storage, and retention of QMS documented information.",
        "evidence_required": "Document control procedure, master document list, distribution and revision logs.",
        "weight": 9
    },
    {
        "id": "8.1",
        "clause": "8.1 Operational planning and control",
        "title": "Operational Control",
        "requirements": "Plan, implement, and control operational processes needed for product/service delivery.",
        "evidence_required": "Standard Operating Procedures (SOPs), process control plans, inspection sheets.",
        "weight": 9
    },
    {
        "id": "8.4",
        "clause": "8.4 Control of externally provided processes, products and services",
        "title": "Supplier Management",
        "requirements": "Evaluate, select, monitor performance, and re-evaluate external providers.",
        "evidence_required": "Approved Vendor List (AVL), supplier evaluation forms, SLA monitoring logs.",
        "weight": 8
    },
    {
        "id": "8.7",
        "clause": "8.7 Control of nonconforming outputs",
        "title": "Nonconforming Outputs",
        "requirements": "Identify and control nonconforming outputs to prevent unintended use or delivery.",
        "evidence_required": "Non-Conformance Reports (NCR), quarantine logs, disposition approvals.",
        "weight": 9
    },
    {
        "id": "9.1.2",
        "clause": "9.1.2 Customer satisfaction",
        "title": "Customer Satisfaction",
        "requirements": "Monitor customer perception of degree to which needs and expectations have been fulfilled.",
        "evidence_required": "Customer satisfaction surveys, feedback analysis, complaint resolution logs.",
        "weight": 8
    },
    {
        "id": "9.2",
        "clause": "9.2 Internal audit",
        "title": "Internal Audit",
        "requirements": "Conduct internal audits at planned intervals to assess QMS conformity and effectiveness.",
        "evidence_required": "Annual audit schedule, audit plans, internal audit reports, auditor qualifications.",
        "weight": 10
    },
    {
        "id": "9.3",
        "clause": "9.3 Management review",
        "title": "Management Review",
        "requirements": "Top management shall review organization's QMS at planned intervals.",
        "evidence_required": "Management Review Meeting (MRM) agenda, minutes, action items tracking.",
        "weight": 10
    },
    {
        "id": "10.2",
        "clause": "10.2 Nonconformity and corrective action",
        "title": "Corrective Action",
        "requirements": "Evaluate need for action to eliminate causes of nonconformities so they do not recur.",
        "evidence_required": "CAPA log, root cause analysis (5-Why/Fishbone), effectiveness verification.",
        "weight": 10
    }
]
