"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Bell,
  Bot,
  Check,
  ChevronDown,
  Layers3,
  Search,
  ShieldAlert,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  dashboardMetrics,
  dashboardRanges,
  dashboardSignals,
  dashboardTabs,
  dashboardWorkspaces,
} from "./dashboard-data";

export function DashboardSection() {
  const [tab, setTab] = useState<(typeof dashboardTabs)[number]>("Overview");
  const [range, setRange] = useState<(typeof dashboardRanges)[number]>("30D");
  const [query, setQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState<number | null>(0);
  const [expandedInsight, setExpandedInsight] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [workspace, setWorkspace] = useState<(typeof dashboardWorkspaces)[number]>("Northstar Enterprise");

  const filtered = useMemo(
    () => dashboardSignals.filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const navIcons = [Layers3, Sparkles, ShieldAlert, TrendingUp, Bot] as const;

  return (
    <section id="dashboard" className="section dashboard-section">
      <div className="shell">
        <DashboardIntro />

        <motion.div className="dashboard-shell" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }}>
          <aside className="dashboard-sidebar">
            <div className="sidebar-brand"><span className="brand-mark mini">X</span><strong>Workspace</strong></div>
            <nav aria-label="Dashboard navigation">
              {dashboardTabs.map((label, index) => {
                const Icon = navIcons[index];
                return (
                  <button key={label} className={tab === label ? "active" : ""} onClick={() => setTab(label)}>
                    <Icon size={16} /><span>{label}</span>
                    {label === "Risks" && <small>3</small>}
                  </button>
                );
              })}
            </nav>
            <div className="sidebar-health">
              <span className="health-icon"><Activity size={15} /></span>
              <div><strong>Data health</strong><small>12 of 12 sources live</small></div>
            </div>
          </aside>

          <div className="dashboard-main">
            <header className="dashboard-header">
              <div className="workspace-selector-wrap">
                <button className="workspace-selector" onClick={() => setWorkspaceOpen((value) => !value)} aria-expanded={workspaceOpen}>
                  <span className="workspace-avatar">N</span>
                  <span><small>Workspace</small><strong>{workspace}</strong></span>
                  <ChevronDown size={15} />
                </button>
                <AnimatePresence>
                  {workspaceOpen && (
                    <motion.div className="workspace-menu" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>
                      {dashboardWorkspaces.map((item) => (
                        <button key={item} onClick={() => { setWorkspace(item); setWorkspaceOpen(false); }}>{item}{workspace === item && <Check size={14} />}</button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="dashboard-header-actions">
                <label className="dashboard-search"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search intelligence" aria-label="Search intelligence" /></label>
                <button className="icon-button" aria-label="Notifications"><Bell size={16} /><span className="notification-dot" /></button>
                <span className="profile-avatar">ST</span>
              </div>
            </header>

            <div className="dashboard-toolbar">
              <div><p className="dashboard-overline">{tab} / {range}</p><h3>Good morning. Here is what changed.</h3></div>
              <div className="range-selector" aria-label="Date range">
                {dashboardRanges.map((item) => <button key={item} className={range === item ? "active" : ""} onClick={() => setRange(item)}>{item}</button>)}
              </div>
            </div>

            <div className="metric-grid">
              {dashboardMetrics.map((metric) => (
                <article className="metric-card" key={metric.label}>
                  <div className={`metric-icon tone-${metric.tone}`}><TrendingUp size={16} /></div>
                  <p>{metric.label}</p>
                  <div className="metric-value"><strong>{metric.value}</strong><span className={`tone-text-${metric.tone}`}>{metric.delta}</span></div>
                  <MiniSparkline tone={metric.tone} />
                </article>
              ))}
            </div>

            <div className="dashboard-content-grid">
              <article className="chart-card dashboard-card">
                <div className="dashboard-card-header"><div><span>Performance and forecast</span><strong>Revenue health trend</strong></div><span className="forecast-badge">AI forecast</span></div>
                <RevenueChart range={range} />
                <div className="chart-legend"><span><i className="actual" /> Actual</span><span><i className="forecast" /> AI forecast</span><span><i className="baseline" /> Baseline</span></div>
              </article>

              <article className="priority-card dashboard-card">
                <div className="priority-top"><span className="risk-icon"><ShieldAlert size={17} /></span><span className="risk-badge">Priority risk</span></div>
                <h4>Enterprise renewal risk increased by 18%.</h4>
                <p>Fourteen accounts show correlated declines in usage, engagement and support satisfaction.</p>
                <div className="priority-stats"><div><span>Exposure</span><strong>$420K</strong></div><div><span>Confidence</span><strong>94%</strong></div></div>
                <button className="insight-toggle" onClick={() => setExpandedInsight((value) => !value)} aria-expanded={expandedInsight}>
                  Why Xai detected this <ChevronDown size={15} />
                </button>
                <AnimatePresence>
                  {expandedInsight && (
                    <motion.ul className="evidence-list" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                      <li>Product usage declined 12%</li><li>Support response time increased 22%</li><li>Executive engagement declined 16%</li>
                    </motion.ul>
                  )}
                </AnimatePresence>
                <a href="#automation" className="button button-primary button-full">Review recommended workflow <ArrowRight size={15} /></a>
              </article>
            </div>

            <article className="opportunity-table dashboard-card">
              <div className="table-header"><div><span>Prioritized intelligence</span><strong>{filtered.length} signals requiring attention</strong></div><button className="text-button">View all <ArrowRight size={14} /></button></div>
              <div className="table-scroll">
                <table>
                  <thead><tr>{["Signal", "Segment", "Impact", "Confidence", "Status"].map((heading) => <th key={heading}>{heading}</th>)}</tr></thead>
                  <tbody>
                    {filtered.map((row, index) => (
                      <tr key={row[0]} className={selectedRow === index ? "selected" : ""} onClick={() => setSelectedRow(index)}>
                        <td><span className="signal-dot" />{row[0]}</td><td>{row[1]}</td><td className="impact-cell">{row[2]}</td><td><span className="confidence-bar"><i style={{ width: row[3] }} /></span>{row[3]}</td><td><span className={`status-badge status-${row[4].toLowerCase()}`}>{row[4]}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DashboardIntro() {
  return (
    <div className="section-intro">
      <div className="eyebrow-row"><span className="eyebrow-dot" /><p className="eyebrow">03 / Intelligence Dashboard</p></div>
      <h2>See what changed, why it matters, and what to do next.</h2>
      <p>A decision workspace that prioritizes the most important signals instead of adding more dashboard noise.</p>
    </div>
  );
}

function MiniSparkline({ tone }: { tone: string }) {
  const stroke = tone === "danger" ? "#ed727b" : tone === "success" ? "#62d49b" : tone === "cyan" ? "#54d8ed" : "#7b7cff";
  return <svg className="mini-sparkline" viewBox="0 0 120 34" aria-hidden="true"><path d="M3 28 C18 24 22 14 37 18 S58 8 72 14 S91 7 117 4" fill="none" stroke={stroke} strokeWidth="2.4" /><path d="M3 28 C18 24 22 14 37 18 S58 8 72 14 S91 7 117 4 L117 34 L3 34 Z" fill={stroke} opacity=".08" /></svg>;
}

function RevenueChart({ range }: { range: (typeof dashboardRanges)[number] }) {
  const actual = range === "7D" ? "M15 160 C85 150 110 104 175 120 S285 75 350 88 S465 45 560 64" : range === "90D" ? "M15 175 C90 160 125 90 205 112 S330 54 410 78 S500 35 560 42" : range === "12M" ? "M15 188 C90 174 145 132 212 150 S340 72 420 90 S510 42 560 30" : "M15 172 C90 157 125 106 205 128 S335 70 418 88 S510 43 560 52";
  return <div className="chart-wrap"><svg viewBox="0 0 580 240" role="img" aria-label={`Revenue health chart for ${range}`}><defs><linearGradient id="dashboardChartArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#54d8ed" stopOpacity=".22" /><stop offset="1" stopColor="#54d8ed" stopOpacity="0" /></linearGradient></defs>{[40, 90, 140, 190].map((y) => <line key={y} x1="15" y1={y} x2="560" y2={y} className="chart-grid-line" />)}<path d={`${actual} L560 220 L15 220 Z`} fill="url(#dashboardChartArea)" /><path d={actual} className="chart-actual" /><path d="M15 185 C95 174 170 142 235 116 S385 60 560 24" className="chart-forecast" /><line x1="15" y1="153" x2="560" y2="153" className="chart-baseline" />{[[15, 172], [205, 128], [418, 88], [560, 52]].map(([x, y], index) => <g key={index}><circle cx={x} cy={y} r="8" className="chart-point-hit" /><circle cx={x} cy={y} r="3.5" className="chart-point" /></g>)}</svg><div className="chart-labels"><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span></div></div>;
}
