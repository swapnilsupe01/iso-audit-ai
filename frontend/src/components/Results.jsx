import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, AlertCircle, FileText, Download, Filter, Search, ChevronDown, ChevronUp } from 'lucide-react';

export default function Results({ auditData, onViewReport }) {
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedClause, setExpandedClause] = useState(null);

  if (!auditData) return null;

  const score = auditData.overall_score || 0;
  const risk = auditData.risk_rating || "MEDIUM";
  const findings = auditData.findings || [];

  const riskColor = risk === "LOW" ? "#10B981" : risk === "MEDIUM" ? "#F59E0B" : "#EF4444";

  const filteredFindings = findings.filter((item) => {
    const matchesStatus = filterStatus === "ALL" || item.status === filterStatus;
    const matchesSearch = 
      item.clause_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clause_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.evidence_found && item.evidence_found.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Top Banner Scorecard */}
      <div className="glass-card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, rgba(18, 26, 44, 0.9) 0%, rgba(26, 37, 63, 0.9) 100%)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', alignItems: 'center' }}>
          
          {/* Radial Score */}
          <div style={{ textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.08)', paddingRight: '20px' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Overall Compliance Score
            </div>
            <div style={{ fontSize: '3.6rem', fontWeight: 800, color: score >= 80 ? '#10B981' : score >= 65 ? '#F59E0B' : '#EF4444', lineHeight: 1 }}>
              {score}%
            </div>
            <div style={{ marginTop: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.82rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: riskColor }}></span>
              Risk Level: <strong style={{ color: riskColor }}>{risk}</strong>
            </div>
          </div>

          {/* Audit Specs */}
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px' }}>
              {auditData.filename}
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Standards Audited: <strong style={{ color: '#3B82F6' }}>{auditData.standards.join(", ")}</strong>
            </div>
            {/* Department Badges */}
            {auditData._departments && auditData._departments.length > 0 && (
              <div style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '0.74rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                  Modules Audited ({auditData._departments.length})
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {auditData._departments.map(deptId => {
                    const fc = (auditData._dept_file_counts || {})[deptId] || 0;
                    return (
                      <span key={deptId} style={{
                        fontSize: '0.72rem', fontWeight: 600,
                        padding: '3px 9px', borderRadius: '6px',
                        background: 'rgba(59,130,246,0.12)',
                        color: '#93C5FD',
                        border: '1px solid rgba(59,130,246,0.2)'
                      }}>
                        {deptId.replace(/_/g, " ")}
                        {fc > 0 && <span style={{ color: '#60A5FA', marginLeft: '4px' }}>({fc})</span>}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <span className="status-badge compliant">Compliant: {auditData.compliant_count}</span>
              <span className="status-badge minor_non_conformity">Minor NC: {auditData.minor_nc_count}</span>
              <span className="status-badge major_non_conformity">Major NC: {auditData.major_nc_count}</span>
            </div>
          </div>

          {/* Action Button */}
          <div style={{ textAlign: 'right' }}>
            <button className="btn-primary" onClick={onViewReport} style={{ width: '100%', justifyContent: 'center' }}>
              <FileText size={18} />
              View Official Audit Report
            </button>
          </div>
        </div>
      </div>

      {/* Executive Summary Card */}
      <div className="glass-card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={20} color="#3B82F6" />
          Lead Auditor Executive Summary
        </h3>
        <p style={{ color: 'var(--text-main)', fontSize: '0.94rem', leading: '1.6', color: '#CBD5E1' }}>
          {auditData.executive_summary}
        </p>
      </div>

      {/* Controls: Filter & Search */}
      <div className="glass-card" style={{ marginBottom: '20px', padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {/* Status Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: "ALL", label: `All (${findings.length})` },
              { id: "COMPLIANT", label: `Compliant (${auditData.compliant_count})` },
              { id: "MINOR_NON_CONFORMITY", label: `Minor NC (${auditData.minor_nc_count})` },
              { id: "MAJOR_NON_CONFORMITY", label: `Major NC (${auditData.major_nc_count})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  background: filterStatus === tab.id ? '#3B82F6' : 'rgba(255, 255, 255, 0.05)',
                  color: filterStatus === tab.id ? '#FFFFFF' : 'var(--text-muted)',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '240px' }}>
            <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            <input
              type="text"
              placeholder="Search clause or finding..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                borderRadius: '8px',
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                fontSize: '0.85rem'
              }}
            />
          </div>
        </div>
      </div>

      {/* Audit Clause Breakdown List */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px' }}>
          Detailed ISO Clause Findings ({filteredFindings.length})
        </h3>

        {filteredFindings.map((item, idx) => {
          const isExpanded = expandedClause === idx;
          const statusKey = item.status ? item.status.toLowerCase() : "compliant";

          return (
            <div
              key={idx}
              style={{
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                marginBottom: '12px',
                background: 'rgba(15, 23, 42, 0.4)',
                overflow: 'hidden'
              }}
            >
              <div
                onClick={() => setExpandedClause(isExpanded ? null : idx)}
                style={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  background: isExpanded ? 'rgba(255, 255, 255, 0.03)' : 'transparent'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span className={`status-badge ${statusKey}`}>
                    {item.status.replace("_", " ")}
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      {item.clause_id} - {item.clause_name || item.title}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Compliance Score: <strong>{item.score}%</strong>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {isExpanded ? <ChevronUp size={20} color="#94A3B8" /> : <ChevronDown size={20} color="#94A3B8" />}
                </div>
              </div>

              {/* Accordion Detail Body */}
              {isExpanded && (
                <div style={{ padding: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', background: 'rgba(0, 0, 0, 0.2)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#3B82F6', fontWeight: 700, marginBottom: '4px' }}>
                        Evidence Found in Policy Text
                      </div>
                      <div style={{ fontSize: '0.88rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                        {item.evidence_found}
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#EF4444', fontWeight: 700, marginBottom: '4px' }}>
                        Gaps & Non-Conformities Identified
                      </div>
                      <div style={{ fontSize: '0.88rem', color: '#E2E8F0', lineHeight: 1.5 }}>
                        {item.gaps_identified}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px dashed rgba(255, 255, 255, 0.08)' }}>
                    <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#10B981', fontWeight: 700, marginBottom: '4px' }}>
                      Auditor Recommendation & CAR Action Plan
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#CBD5E1', lineHeight: 1.5 }}>
                      {item.recommendations}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
