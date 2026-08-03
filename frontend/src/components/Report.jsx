import React, { useState } from 'react';
import { Download, Printer, ArrowLeft, FileText, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

const FORMAT_OPTIONS = [
  {
    id: "PDF",
    icon: <FileText size={20} />,
    label: "PDF Report",
    desc: "Printable executive audit report with signature block",
    color: "#3B82F6",
    ext: ".pdf"
  },
  {
    id: "EXCEL",
    icon: <FileSpreadsheet size={20} />,
    label: "Excel Workbook",
    desc: "2-sheet .xlsx: Executive Summary + Clause Findings with colour-coded status",
    color: "#10B981",
    ext: ".xlsx"
  }
];

export default function Report({ auditData, onBack }) {
  const [selectedFormat, setSelectedFormat] = useState("PDF");

  if (!auditData) return null;

  const handleDownload = () => {
    if (!auditData.audit_id) {
      alert("Audit ID not found. Please re-run the audit.");
      return;
    }
    if (selectedFormat === "PDF") {
      window.open(`/api/reports/download/${auditData.audit_id}`, '_blank');
    } else {
      window.open(`/api/reports/download-excel/${auditData.audit_id}`, '_blank');
    }
  };

  const handlePrint = () => window.print();

  const score = auditData.overall_score || 0;
  const scoreColor = score >= 80 ? '#166534' : score >= 60 ? '#92400E' : '#991B1B';

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>

      {/* ── Top Action Bar ──────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <button className="btn-secondary" onClick={onBack}>
          <ArrowLeft size={16} />
          Back to Results
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={handlePrint}>
            <Printer size={16} />
            Print
          </button>
          <button
            className="btn-primary"
            onClick={handleDownload}
            style={{
              background: selectedFormat === "PDF"
                ? 'linear-gradient(135deg, #2563EB, #1D4ED8)'
                : 'linear-gradient(135deg, #059669, #047857)'
            }}
          >
            <Download size={16} />
            Download {selectedFormat === "PDF" ? "PDF" : "Excel"}
          </button>
        </div>
      </div>

      {/* ── Export Format Selector ──────────────────────────────────── */}
      <div className="glass-card" style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
          Select Export Format
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {FORMAT_OPTIONS.map(fmt => {
            const isActive = selectedFormat === fmt.id;
            return (
              <div
                key={fmt.id}
                onClick={() => setSelectedFormat(fmt.id)}
                style={{
                  padding: '18px 20px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  border: isActive ? `2px solid ${fmt.color}` : '1px solid rgba(255,255,255,0.08)',
                  background: isActive ? `${fmt.color}18` : 'rgba(255,255,255,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  transition: 'all 0.18s ease'
                }}
              >
                {/* Format Icon */}
                <div style={{
                  width: '44px', height: '44px', borderRadius: '10px', flexShrink: 0,
                  background: isActive ? `${fmt.color}25` : 'rgba(255,255,255,0.05)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isActive ? fmt.color : '#64748B'
                }}>
                  {fmt.icon}
                </div>

                {/* Format Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: isActive ? fmt.color : '#F1F5F9' }}>
                    {fmt.label}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '3px', lineHeight: 1.4 }}>
                    {fmt.desc}
                  </div>
                </div>

                {/* Selected Indicator */}
                {isActive && <CheckCircle2 size={20} color={fmt.color} style={{ flexShrink: 0 }} />}
              </div>
            );
          })}
        </div>

        {/* Format Details Strip */}
        <div style={{
          marginTop: '14px', padding: '10px 14px', borderRadius: '8px',
          background: 'rgba(0,0,0,0.2)', fontSize: '0.82rem', color: 'var(--text-muted)',
          display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap'
        }}>
          {selectedFormat === "PDF" ? (
            <>
              <FileText size={14} color="#3B82F6" />
              <span><strong style={{ color: '#F1F5F9' }}>PDF</strong> — Single-page printable report. Includes executive summary, clause breakdown table, and auditor sign-off block. Best for formal submission.</span>
            </>
          ) : (
            <>
              <FileSpreadsheet size={14} color="#10B981" />
              <span><strong style={{ color: '#F1F5F9' }}>Excel</strong> — 2-sheet workbook: Sheet 1 = Executive Summary with colour-coded score, Sheet 2 = Full clause findings table with status filters. Best for internal tracking.</span>
            </>
          )}
        </div>
      </div>

      {/* ── Printable Report Preview ──────────────────────────────────── */}
      <div style={{ background: '#FFFFFF', color: '#0F172A', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.4)' }}>

        {/* Document Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #2563EB', paddingBottom: '16px', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              ISO COMPLIANCE AUDIT REPORT
            </div>
            <div style={{ fontSize: '0.9rem', color: '#475569', marginTop: '4px' }}>
              Official Surveillance & Assessment Certificate
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#2563EB' }}>Ref: {auditData.audit_id}</div>
            <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '2px' }}>
              Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>

        {/* Executive Summary Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Audited Document</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', marginTop: '3px' }}>{auditData.filename}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Overall Compliance Score</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: scoreColor, marginTop: '3px' }}>
              {score}% — {auditData.risk_rating} RISK
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Standards Applied</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155', marginTop: '3px' }}>{auditData.standards?.join(", ")}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Clause Metrics</div>
            <div style={{ fontSize: '0.88rem', color: '#334155', marginTop: '3px' }}>
              ✅ Pass: <strong>{auditData.compliant_count}</strong> &nbsp;|&nbsp;
              🟡 Minor NC: <strong>{auditData.minor_nc_count}</strong> &nbsp;|&nbsp;
              🔴 Major NC: <strong>{auditData.major_nc_count}</strong>
            </div>
          </div>
          {/* Dept module summary if available */}
          {auditData._departments && auditData._departments.length > 0 && (
            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Departments Audited</div>
              <div style={{ fontSize: '0.88rem', color: '#334155', marginTop: '3px' }}>
                {auditData._departments.join(" • ")}
              </div>
            </div>
          )}
        </div>

        {/* Executive Summary */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B', marginBottom: '8px' }}>Executive Summary</h4>
          <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.7 }}>{auditData.executive_summary}</p>
        </div>

        {/* Findings Table */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1E293B', marginBottom: '12px' }}>Auditor Clause Assessment Breakdown</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
            <thead>
              <tr style={{ background: '#1E293B', color: '#FFFFFF' }}>
                <th style={{ padding: '9px 10px', textAlign: 'left', width: '14%' }}>Clause & Dept</th>
                <th style={{ padding: '9px 10px', textAlign: 'left', width: '18%' }}>Status</th>
                <th style={{ padding: '9px 10px', textAlign: 'center', width: '14%' }}>Risk (L x S = R)</th>
                <th style={{ padding: '9px 10px', textAlign: 'center', width: '10%' }}>Impact</th>
                <th style={{ padding: '9px 10px', textAlign: 'left' }}>Evidence & Auditor CAR Recommendations</th>
              </tr>
            </thead>
            <tbody>
              {(auditData.findings || []).map((item, i) => {
                const s = item.status || "COMPLIANT";
                const fg = s.includes('COMPLIANT') ? '#166534' : s.includes('MINOR') ? '#92400E' : '#991B1B';
                const bg = s.includes('COMPLIANT') ? '#F0FDF4' : s.includes('MINOR') ? '#FFFBEB' : '#FEF2F2';

                const l_val = item.likelihood || 3;
                const s_val = item.severity || 3;
                const r_val = item.risk_score || (l_val * s_val);
                const impact = item.impact || (r_val >= 12 ? "High" : r_val >= 8 ? "Medium" : "Low");
                const impactFg = impact === "High" ? "#991B1B" : impact === "Medium" ? "#92400E" : "#166534";
                const impactBg = impact === "High" ? "#FEF2F2" : impact === "Medium" ? "#FFFBEB" : "#F0FDF4";

                const dept_name = item.department || item.title || "Operations";

                return (
                  <tr key={i} style={{ borderBottom: '1px solid #E2E8F0', background: i % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                    <td style={{ padding: '10px', fontWeight: 700, color: '#0F172A', verticalAlign: 'top' }}>
                      {item.clause_id}
                      <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: 500 }}>{dept_name}</div>
                    </td>
                    <td style={{ padding: '10px', verticalAlign: 'top' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.74rem', color: fg, background: bg, padding: '3px 8px', borderRadius: '4px' }}>
                        {s.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center', fontWeight: 700, verticalAlign: 'top', color: '#1E293B' }}>
                      <div style={{ fontSize: '0.76rem', color: '#64748B' }}>L:{l_val} × S:{s_val}</div>
                      <div style={{ fontSize: '0.9rem', color: r_val >= 12 ? '#DC2626' : '#2563EB', fontWeight: 800 }}>R = {r_val}</div>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center', verticalAlign: 'top' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.75rem', color: impactFg, background: impactBg, padding: '3px 8px', borderRadius: '4px' }}>
                        {impact}
                      </span>
                    </td>
                    <td style={{ padding: '10px', color: '#334155', verticalAlign: 'top' }}>
                      <div style={{ marginBottom: '4px' }}><strong>Evidence:</strong> {item.evidence_found}</div>
                      <div><strong>Action:</strong> {item.recommendations}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>

        {/* Sign-off */}
        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #CBD5E1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Lead Auditor Signature</div>
            <div style={{ borderBottom: '1px solid #94A3B8', width: '200px', marginBottom: '6px' }}></div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Certified ISO Lead Auditor</div>
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quality Director Approval</div>
            <div style={{ borderBottom: '1px solid #94A3B8', width: '200px', marginBottom: '6px' }}></div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Executive Quality Committee</div>
          </div>
        </div>
      </div>
    </div>
  );
}
