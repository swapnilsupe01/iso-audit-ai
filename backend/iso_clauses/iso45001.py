"""
ISO 45001:2018 Occupational Health and Safety Management Systems (OH&S) Framework
"""

ISO45001_CLAUSES = [
    {
        "id": "5.4",
        "clause": "5.4 Consultation and participation of workers",
        "title": "Worker Participation & Consultation",
        "requirements": "Establish processes for consultation and participation of non-managerial workers in OH&S decisions.",
        "evidence_required": "Safety committee meeting minutes, worker consultation log, hazard reporting system.",
        "weight": 10
    },
    {
        "id": "6.1.2.1",
        "clause": "6.1.2.1 Hazard identification",
        "title": "Hazard Identification",
        "requirements": "Establish proactive hazard identification processes including routine and non-routine activities.",
        "evidence_required": "HIRA (Hazard Identification & Risk Assessment) register, Job Safety Analyses (JSA).",
        "weight": 10
    },
    {
        "id": "6.1.2.2",
        "clause": "6.1.2.2 Assessment of OH&S risks",
        "title": "OH&S Risk Assessment",
        "requirements": "Assess OH&S risks from identified hazards taking into account effectiveness of existing controls.",
        "evidence_required": "Risk matrix, severity/likelihood ratings, risk priority index.",
        "weight": 9
    },
    {
        "id": "6.1.3",
        "clause": "6.1.3 Legal requirements and other requirements",
        "title": "OH&S Legal Compliance",
        "requirements": "Determine legal and regulatory OH&S requirements applicable to operations and hazards.",
        "evidence_required": "Factories Act / OSHA compliance register, safety permits, statutory inspection certificates.",
        "weight": 10
    },
    {
        "id": "8.1.2",
        "clause": "8.1.2 Eliminating hazards and reducing OH&S risks",
        "title": "Hierarchy of Controls",
        "requirements": "Apply hierarchy of controls: Elimination, Substitution, Engineering, Administrative, PPE.",
        "evidence_required": "Engineering control specs, PPE issuance logs, machine guarding inspection, SOPs.",
        "weight": 10
    },
    {
        "id": "8.1.3",
        "clause": "8.1.3 Management of change",
        "title": "Management of Change (MoC)",
        "requirements": "Control planned temporary and permanent changes that impact OH&S performance.",
        "evidence_required": "MoC procedure, pre-commissioning safety review, change impact assessments.",
        "weight": 9
    },
    {
        "id": "8.2",
        "clause": "8.2 Emergency preparedness and response",
        "title": "Emergency Response & Drills",
        "requirements": "Maintain response capabilities for potential OH&S emergencies including first aid and rescue.",
        "evidence_required": "Fire drill reports, evacuation logs, certified first aider list, first aid box inspection.",
        "weight": 10
    },
    {
        "id": "10.2",
        "clause": "10.2 Incident, nonconformity and corrective action",
        "title": "Incident Investigation & CAR",
        "requirements": "Investigate incidents, near-misses, and nonconformities to determine root causes and implement CAPA.",
        "evidence_required": "Incident Investigation Reports, Near-Miss log, root cause analysis, corrective actions.",
        "weight": 10
    }
]
