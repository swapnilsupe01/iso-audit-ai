import React, { useState } from 'react';
import {
  UploadCloud, FileText, CheckCircle2, ShieldCheck, Cpu, ArrowRight, Sparkles,
  ChevronDown, ChevronUp, X, FileCheck, FolderOpen, Plus
} from 'lucide-react';

// ─── 14 ISO Audit Departments ────────────────────────────────────────────────
const DEPARTMENTS = [
  {
    id: "ISO_DOCS",
    label: "ISO Documents",
    icon: "📋",
    color: "#3B82F6",
    checklist: [
      "Quality Manual",
      "Standard Operating Procedures (SOPs)",
      "Work Instructions",
      "Document control register",
      "Version history and approvals"
    ]
  },
  {
    id: "ISO_TEAM",
    label: "ISO Team Leader (MR)",
    icon: "🏅",
    color: "#8B5CF6",
    checklist: [
      "Appointment letter",
      "Roles and responsibilities defined",
      "Management review meeting minutes",
      "ISO objectives tracking"
    ]
  },
  {
    id: "TOP_MGMT",
    label: "Top Management",
    icon: "👔",
    color: "#EC4899",
    checklist: [
      "Quality/ISO policy signed by MD/CEO",
      "Objectives set and reviewed",
      "Management review records",
      "Resource allocation evidence"
    ]
  },
  {
    id: "MASTERS",
    label: "Masters",
    icon: "🗂️",
    color: "#06B6D4",
    checklist: [
      "Master list of documents",
      "Master list of records",
      "Approved vendor list",
      "Customer master list"
    ]
  },
  {
    id: "HR",
    label: "Human Resource",
    icon: "👥",
    color: "#10B981",
    checklist: [
      "Employee training records",
      "Competency matrix",
      "Job descriptions",
      "Induction training records",
      "Skill gap analysis"
    ]
  },
  {
    id: "SALES",
    label: "Sales",
    icon: "📈",
    color: "#F59E0B",
    checklist: [
      "Customer order review records",
      "Customer complaints register",
      "Customer feedback forms",
      "Contract review evidence",
      "Delivery performance records"
    ]
  },
  {
    id: "PURCHASE",
    label: "Purchase",
    icon: "🛒",
    color: "#EF4444",
    checklist: [
      "Approved supplier list",
      "Supplier evaluation records",
      "Purchase orders",
      "Supplier performance monitoring",
      "Incoming material inspection"
    ]
  },
  {
    id: "STORES",
    label: "Stores",
    icon: "🏭",
    color: "#84CC16",
    checklist: [
      "Stock register",
      "FIFO/FEFO records",
      "Material identification tags",
      "Rejection/quarantine area records",
      "Inventory accuracy records"
    ]
  },
  {
    id: "QC",
    label: "Quality Control",
    icon: "🔬",
    color: "#F97316",
    checklist: [
      "Inspection reports (incoming/in-process/final)",
      "Test certificates",
      "Calibration records of instruments",
      "Non-conformance reports (NCR)",
      "CAPA records"
    ],
    priority: "PRIORITY 1"
  },
  {
    id: "PRODUCTION",
    label: "Production",
    icon: "⚙️",
    color: "#14B8A6",
    checklist: [
      "Production planning records",
      "Batch/lot records",
      "Process parameters monitoring",
      "Machine setup records",
      "Product traceability records"
    ]
  },
  {
    id: "MAINTENANCE",
    label: "Maintenance",
    icon: "🔧",
    color: "#6366F1",
    checklist: [
      "Preventive maintenance schedule",
      "Maintenance logs",
      "Breakdown records",
      "MTTR data",
      "Machine history cards"
    ]
  },
  {
    id: "RISK",
    label: "Risk Assessment",
    icon: "⚠️",
    color: "#DC2626",
    checklist: [
      "Risk register (identified risks)",
      "Risk rating matrix",
      "Risk treatment plans",
      "Risk review records",
      "Opportunity register"
    ],
    priority: "PRIORITY 1"
  },
  {
    id: "INTERNAL_AUDIT",
    label: "Internal Audit",
    icon: "📝",
    color: "#7C3AED",
    checklist: [
      "Annual audit schedule",
      "Audit plan for each department",
      "Audit findings report",
      "Nonconformance reports",
      "CAPA raised and closed",
      "Auditor competency records"
    ],
    priority: "PRIORITY 1"
  },
  {
    id: "GAP_ASSESSMENT",
    label: "Gap Assessment",
    icon: "🎯",
    color: "#0EA5E9",
    checklist: [
      "Initial gap analysis report",
      "Clause-wise compliance status",
      "Action plan to close gaps",
      "Progress tracking",
      "Re-assessment records"
    ]
  }
];

const STANDARDS = [
  { id: "ISO 9001",  num: 1, label: "ISO 9001:2015",  desc: "Quality Management",           tag: "Quality" },
  { id: "ISO 14001", num: 2, label: "ISO 14001:2015", desc: "Environmental Management",     tag: "Environmental" },
  { id: "ISO 45001", num: 3, label: "ISO 45001:2018", desc: "Occupational Health & Safety", tag: "Health & Safety" },
  { id: "IMS",       num: 4, label: "IMS",            desc: "Integrated — 9001+14001+45001",tag: "Integrated" },
  { id: "ISO 22000", num: 5, label: "ISO 22000:2018", desc: "Food Safety Management",       tag: "Food Safety" },
  { id: "ISO 27001", num: 6, label: "ISO 27001:2022", desc: "Information Security",         tag: "InfoSec" },
];


export default function Upload({ onAuditComplete }) {
  const [selectedStandards, setSelectedStandards] = useState(["ISO 9001"]);
  const [selectedDepts, setSelectedDepts] = useState(new Set(["ISO_DOCS", "RISK", "INTERNAL_AUDIT", "QC"]));
  const [deptFiles, setDeptFiles] = useState({});       // { deptId: [File, ...] }
  const [expandedDept, setExpandedDept] = useState(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");

  // ─── Standards toggle ─────────────────────────────────────────────────────
  const toggleStandard = (id) => {
    if (id === "IMS") { setSelectedStandards(["IMS"]); return; }
    let updated = selectedStandards.filter(s => s !== "IMS");
    updated = updated.includes(id) ? updated.filter(s => s !== id) : [...updated, id];
    setSelectedStandards(updated.length ? updated : ["ISO 9001"]);
  };

  // ─── Dept toggle ──────────────────────────────────────────────────────────
  const toggleDept = (id) => {
    setSelectedDepts(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // ─── File handling ────────────────────────────────────────────────────────
  const handleFileAdd = (deptId, files) => {
    const arr = Array.from(files);
    setDeptFiles(prev => ({
      ...prev,
      [deptId]: [...(prev[deptId] || []), ...arr]
    }));
    // Automatically select department when file is uploaded to it
    setSelectedDepts(prev => {
      const next = new Set(prev);
      next.add(deptId);
      return next;
    });
  };

  const removeFile = (deptId, idx) => {
    setDeptFiles(prev => ({
      ...prev,
      [deptId]: prev[deptId].filter((_, i) => i !== idx)
    }));
  };

  // ─── Count selected dept files ────────────────────────────────────────────
  const totalFiles = Object.values(deptFiles).reduce((a, arr) => a + arr.length, 0);
  const filledDepts = Object.keys(deptFiles).filter(k => deptFiles[k]?.length > 0).length;

  // ─── Run Audit ────────────────────────────────────────────────────────────
  const handleRunAudit = async () => {
    setIsAuditing(true);
    setProgress(10);

    try {
      // Gather all files across selected OR file-populated departments
      const allFiles = [];
      const activeDepts = new Set([...selectedDepts, ...Object.keys(deptFiles).filter(k => deptFiles[k]?.length > 0)]);

      for (const deptId of activeDepts) {
        const files = deptFiles[deptId] || [];
        files.forEach(f => allFiles.push({ file: f, deptId }));
      }

      let combinedText = "";
      let uploadedFilename = "Department Audit Bundle";
      const uploadedFileNames = [];

      if (allFiles.length > 0) {
        setProgressLabel(`Uploading ${allFiles.length} document(s)...`);
        setProgress(25);

        // Upload files to server
        for (const { file, deptId } of allFiles) {
          const formData = new FormData();
          formData.append("file", file);
          try {
            const res = await fetch("/api/audit/upload", { method: "POST", body: formData });
            if (res.ok) {
              const data = await res.json();
              const fname = data.file_info?.filename || file.name;
              uploadedFileNames.push(fname);
              uploadedFilename = fname;
            }
          } catch (e) {
            console.warn(`Failed to upload ${file.name}:`, e);
          }
        }
        setProgress(55);

        if (uploadedFileNames.length > 1) {
          uploadedFilename = uploadedFileNames[0]; // Primary filename
        }
      } else {
        // Use built-in sample text for selected departments
        const selectedDeptList = DEPARTMENTS.filter(d => activeDepts.has(d.id));
        combinedText = buildSampleText(selectedDeptList);
        uploadedFilename = `${selectedDeptList.map(d => d.label).slice(0, 2).join(", ")} Policy Bundle`;
      }

      setProgressLabel(`Running AI clause audit for ${selectedStandards.join(", ")}...`);
      setProgress(70);

      const processRes = await fetch("/api/audit/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: uploadedFilename,
          selected_standards: selectedStandards,
          sample_text: combinedText || null
        })
      });

      setProgress(95);

      if (!processRes.ok) throw new Error("Audit processing failed");

      const auditData = await processRes.json();

      // Attach department metadata for results display
      auditData._departments = Array.from(selectedDepts);
      auditData._dept_file_counts = Object.fromEntries(
        Array.from(selectedDepts).map(id => [id, (deptFiles[id] || []).length])
      );

      setProgress(100);
      setTimeout(() => { setIsAuditing(false); onAuditComplete(auditData); }, 400);

    } catch (err) {
      console.error(err);
      alert("Audit failed. Ensure backend is running on http://localhost:8000");
      setIsAuditing(false);
    }
  };

  // ─── Generate sample text from departments ────────────────────────────────
  const buildSampleText = (depts) => {
    return depts.map(dept =>
      `=== ${dept.label.toUpperCase()} SECTION ===\n` +
      dept.checklist.map(item => `This organization maintains formal documented ${item.toLowerCase()} as per ISO compliance requirements. The procedure is reviewed annually and approved by top management.`).join("\n")
    ).join("\n\n");
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

      {/* Page Title */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, background: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '10px' }}>
          Department-Wise ISO Audit Engine
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '620px', margin: '0 auto' }}>
          Select departments → upload their documents → AI audits each section exactly as a real ISO auditor would.
        </p>
      </div>

      {/* STEP 1: ISO Standard */}
      <div className="glass-card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <ShieldCheck color="#3B82F6" size={22} />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Step 1 — Select ISO Standards</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {STANDARDS.map(std => {
            const active = selectedStandards.includes(std.id);
            return (
              <div key={std.id} onClick={() => toggleStandard(std.id)} style={{
                padding: '14px 16px', borderRadius: '10px', cursor: 'pointer',
                background: active ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.03)',
                border: active ? '1.5px solid #3B82F6' : '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.18s'
              }}>
                {/* ID Number Badge */}
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px', flexShrink: 0,
                  background: active ? '#3B82F6' : 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '0.88rem',
                  color: active ? '#FFFFFF' : '#64748B'
                }}>
                  {std.num}
                </div>

                {/* Standard Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: active ? '#3B82F6' : '#F1F5F9' }}>
                      {std.label}
                    </span>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 700, padding: '1px 6px', borderRadius: '4px',
                      background: active ? 'rgba(59,130,246,0.25)' : 'rgba(255,255,255,0.08)',
                      color: active ? '#93C5FD' : '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em'
                    }}>
                      {std.tag}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {std.desc}
                  </div>
                </div>

                {active && <CheckCircle2 size={18} color="#3B82F6" style={{ flexShrink: 0 }} />}
              </div>
            );
          })}
        </div>

      </div>

      {/* STEP 2: Department Module Selector */}
      <div className="glass-card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FolderOpen color="#8B5CF6" size={22} />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Step 2 — Select Audit Modules (Departments)</h2>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {selectedDepts.size} selected • {totalFiles} file{totalFiles !== 1 ? 's' : ''} uploaded
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '12px' }}>
          {DEPARTMENTS.map(dept => {
            const isSelected = selectedDepts.has(dept.id);
            const files = deptFiles[dept.id] || [];
            const isOpen = expandedDept === dept.id;

            return (
              <div key={dept.id} style={{
                borderRadius: '12px',
                border: isSelected ? `1.5px solid ${dept.color}40` : '1px solid rgba(255,255,255,0.06)',
                background: isSelected ? `${dept.color}0D` : 'rgba(255,255,255,0.02)',
                overflow: 'hidden',
                transition: 'all 0.18s'
              }}>
                {/* Dept Header Row */}
                <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                  onClick={() => toggleDept(dept.id)}>
                  <span style={{ fontSize: '1.2rem' }}>{dept.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem', color: isSelected ? dept.color : '#CBD5E1' }}>
                        {dept.label}
                      </span>
                      {dept.priority && (
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#EF4444', background: 'rgba(239,68,68,0.12)', padding: '2px 6px', borderRadius: '4px' }}>
                          {dept.priority}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                      {dept.checklist.length} checkpoints {files.length > 0 ? `• ${files.length} file${files.length > 1 ? 's' : ''} attached` : ''}
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 size={18} color={dept.color} />}
                </div>

                {/* Expand: checklist + file upload */}
                {isSelected && (
                  <div style={{ borderTop: `1px solid ${dept.color}20` }}>
                    {/* Checklist toggle */}
                    <div
                      style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: '0.78rem', color: 'var(--text-muted)' }}
                      onClick={() => setExpandedDept(isOpen ? null : dept.id)}
                    >
                      <span>📋 Required Evidence Checklist</span>
                      {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </div>

                    {isOpen && (
                      <div style={{ padding: '0 14px 12px' }}>
                        {dept.checklist.map((item, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '6px', fontSize: '0.82rem', color: '#94A3B8' }}>
                            <span style={{ color: dept.color, marginTop: '1px' }}>✓</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* File Upload Zone */}
                    <div style={{ padding: '0 14px 14px' }}>
                      <label style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        border: `1.5px dashed ${dept.color}40`, borderRadius: '8px',
                        padding: '10px 12px', cursor: 'pointer',
                        background: 'rgba(0,0,0,0.2)', fontSize: '0.8rem', color: 'var(--text-muted)'
                      }}>
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.txt,.doc,.docx,.xlsx,.xls,.csv"
                          style={{ display: 'none' }}
                          onChange={e => handleFileAdd(dept.id, e.target.files)}
                        />
                        <Plus size={16} color={dept.color} />
                        <span>Upload {dept.label} documents <span style={{ color: '#64748B' }}>(PDF / Excel / TXT)</span></span>
                      </label>

                      {/* Attached Files List */}
                      {files.length > 0 && (
                        <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {files.map((f, i) => (
                            <div key={i} style={{
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              padding: '5px 10px', borderRadius: '6px',
                              background: `${dept.color}12`, border: `1px solid ${dept.color}25`
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}>
                                <FileCheck size={13} color={dept.color} />
                                <span style={{ color: '#CBD5E1', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                                <span style={{ color: '#475569' }}>({(f.size / 1024).toFixed(0)} KB)</span>
                              </div>
                              <X size={13} color="#64748B" style={{ cursor: 'pointer' }} onClick={() => removeFile(dept.id, i)} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 3: Quick Summary Bar */}
      <div className="glass-card" style={{ marginBottom: '20px', padding: '14px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FolderOpen size={16} color="#8B5CF6" />
            <span style={{ fontSize: '0.88rem' }}>
              <strong style={{ color: '#8B5CF6' }}>{selectedDepts.size}</strong> departments selected
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={16} color="#10B981" />
            <span style={{ fontSize: '0.88rem' }}>
              <strong style={{ color: '#10B981' }}>{totalFiles}</strong> files uploaded
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={16} color="#3B82F6" />
            <span style={{ fontSize: '0.88rem' }}>
              Standards: <strong style={{ color: '#3B82F6' }}>{selectedStandards.join(", ")}</strong>
            </span>
          </div>
          <div style={{ marginLeft: 'auto', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {totalFiles === 0 ? "📌 No files uploaded — AI will use built-in sample data for selected departments" : `✅ ${filledDepts} department${filledDepts > 1 ? 's' : ''} have documents attached`}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {isAuditing && (
        <div className="glass-card" style={{ marginBottom: '20px', textAlign: 'center' }}>
          <div style={{ fontWeight: 600, marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Cpu color="#3B82F6" size={18} />
            {progressLabel || "Initializing audit engine..."}
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #3B82F6, #8B5CF6)', transition: 'width 0.3s ease', borderRadius: '4px' }} />
          </div>
          <div style={{ marginTop: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{progress}%</div>
        </div>
      )}

      {/* Run Audit Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          className="btn-primary"
          onClick={handleRunAudit}
          disabled={isAuditing || selectedDepts.size === 0}
          style={{ padding: '14px 40px', fontSize: '1.05rem', borderRadius: '12px', opacity: selectedDepts.size === 0 ? 0.5 : 1 }}
        >
          {isAuditing ? 'AI Audit in Progress...' : `Execute Department Audit (${selectedDepts.size} modules)`}
          <ArrowRight size={20} />
        </button>
        <div style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Gemini AI will audit all {selectedDepts.size} selected departments against {selectedStandards.join(", ")} clauses
        </div>
      </div>
    </div>
  );
}
