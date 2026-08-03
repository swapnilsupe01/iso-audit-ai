"""
ISO Clauses Framework Package
Provides structured clause data, audit checkpoints, and compliance rules for ISO standards:
- ISO 9001: Quality Management Systems (QMS)
- ISO 14001: Environmental Management Systems (EMS)
- ISO 45001: Occupational Health and Safety (OH&S)
- ISO 22000: Food Safety Management Systems (FSMS)
- ISO 27001: Information Security Management Systems (ISMS)
- IMS: Integrated Management System
"""

from .iso9001 import ISO9001_CLAUSES
from .iso14001 import ISO14001_CLAUSES
from .iso45001 import ISO45001_CLAUSES
from .iso22000 import ISO22000_CLAUSES
from .iso27001 import ISO27001_CLAUSES
from .ims import IMS_CLAUSES, GET_INTEGRATED_STANDARDS

ALL_STANDARDS = {
    "ISO 9001": {
        "title": "Quality Management Systems",
        "version": "2015",
        "description": "Customer satisfaction, quality control, process approach & continuous improvement.",
        "clauses": ISO9001_CLAUSES,
    },
    "ISO 14001": {
        "title": "Environmental Management Systems",
        "version": "2015",
        "description": "Environmental impact reduction, sustainability, pollution prevention & legal compliance.",
        "clauses": ISO14001_CLAUSES,
    },
    "ISO 45001": {
        "title": "Occupational Health and Safety",
        "version": "2018",
        "description": "Workplace hazard identification, worker safety, risk management & injury prevention.",
        "clauses": ISO45001_CLAUSES,
    },
    "ISO 22000": {
        "title": "Food Safety Management Systems",
        "version": "2018",
        "description": "HACCP principles, food chain safety, prerequisite programs & hazard control.",
        "clauses": ISO22000_CLAUSES,
    },
    "ISO 27001": {
        "title": "Information Security Management Systems",
        "version": "2022",
        "description": "Information security risks, data privacy, cyber resilience & Annex A security controls.",
        "clauses": ISO27001_CLAUSES,
    },
    "IMS": {
        "title": "Integrated Management System",
        "version": "Combined",
        "description": "Unified compliance matrix harmonizing ISO 9001, 14001, 45001, 27001, and 22000.",
        "clauses": IMS_CLAUSES,
    },
}
