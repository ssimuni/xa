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
  dashboardRanges,
  dashboardTabs,
  dashboardViews,
  dashboardWorkspaces,
} from "./dashboard-data";

type DashboardTab = (typeof dashboardTabs)[number];
type DashboardRange = (typeof dashboardRanges)[number];
type DashboardWorkspace = (typeof dashboardWorkspaces)[number];
type DashboardChartType =
  (typeof dashboardViews)[DashboardTab]["chartType"];
type DashboardPriority =
  (typeof dashboardViews)[DashboardTab]["priority"];

export function DashboardSection() {
  const [tab, setTab] = useState<DashboardTab>("Overview");
  const [range, setRange] = useState<DashboardRange>("30D");
  const [query, setQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState<number | null>(0);
  const [expandedInsight, setExpandedInsight] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);

  const [workspace, setWorkspace] =
    useState<DashboardWorkspace>("Northstar Enterprise");

  const view = dashboardViews[tab];

  const filteredSignals = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return view.signals;
    }

    return view.signals.filter((row) =>
      row.join(" ").toLowerCase().includes(normalizedQuery),
    );
  }, [query, view.signals]);

  const navigationIcons = [
    Layers3,
    Sparkles,
    ShieldAlert,
    TrendingUp,
    Bot,
  ] as const;

  const handleTabChange = (nextTab: DashboardTab) => {
    setTab(nextTab);
    setSelectedRow(0);
    setExpandedInsight(false);
    setQuery("");
  };

  return (
    <section id="dashboard" className="section dashboard-section">
      <div className="shell">
        <DashboardIntro />

        <motion.div
          className="dashboard-shell"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <aside className="dashboard-sidebar">
            <div className="sidebar-brand">
              <span className="brand-mark mini">X</span>
              <strong>Workspace</strong>
            </div>

            <nav aria-label="Dashboard navigation">
              {dashboardTabs.map((label, index) => {
                const Icon = navigationIcons[index];

                return (
                  <button
                    key={label}
                    type="button"
                    className={tab === label ? "active" : ""}
                    aria-current={tab === label ? "page" : undefined}
                    onClick={() => handleTabChange(label)}
                  >
                    <Icon size={16} />

                    <span>{label}</span>

                    {label === "Risks" && <small>3</small>}
                  </button>
                );
              })}
            </nav>

            <div className="sidebar-health">
              <span className="health-icon">
                <Activity size={15} />
              </span>

              <div>
                <strong>Data health</strong>
                <small>12 of 12 sources live</small>
              </div>
            </div>
          </aside>

          <div className="dashboard-main">
            <header className="dashboard-header">
              <div className="workspace-selector-wrap">
                <button
                  type="button"
                  className="workspace-selector"
                  onClick={() => setWorkspaceOpen((current) => !current)}
                  aria-expanded={workspaceOpen}
                  aria-haspopup="menu"
                >
                  <span className="workspace-avatar">
                    {workspace.charAt(0)}
                  </span>

                  <span>
                    <small>Workspace</small>
                    <strong>{workspace}</strong>
                  </span>

                  <motion.span
                    animate={{ rotate: workspaceOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={15} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {workspaceOpen && (
                    <motion.div
                      className="workspace-menu"
                      role="menu"
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{
                        duration: 0.2,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {dashboardWorkspaces.map((item) => (
                        <button
                          type="button"
                          role="menuitem"
                          key={item}
                          onClick={() => {
                            setWorkspace(item);
                            setWorkspaceOpen(false);
                          }}
                        >
                          <span>{item}</span>

                          {workspace === item && <Check size={14} />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="dashboard-header-actions">
                <label className="dashboard-search">
                  <Search size={14} />

                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder={`Search ${tab.toLowerCase()}`}
                    aria-label={`Search ${tab.toLowerCase()}`}
                  />
                </label>

                <button
                  type="button"
                  className="icon-button"
                  aria-label="Open notifications"
                >
                  <Bell size={16} />
                  <span className="notification-dot" />
                </button>

                <span className="profile-avatar" aria-label="User profile">
                  ST
                </span>
              </div>
            </header>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                className="dashboard-view"
                initial={{
                  opacity: 0,
                  x: 18,
                  filter: "blur(5px)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  x: -14,
                  filter: "blur(4px)",
                }}
                transition={{
                  duration: 0.34,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="dashboard-toolbar">
                  <div>
                    <p className="dashboard-overline">
                      {view.overline} / {range}
                    </p>

                    <h3>{view.title}</h3>
                  </div>

                  <div
                    className="range-selector"
                    role="group"
                    aria-label="Dashboard date range"
                  >
                    {dashboardRanges.map((item) => (
                      <button
                        type="button"
                        key={item}
                        className={range === item ? "active" : ""}
                        aria-pressed={range === item}
                        onClick={() => setRange(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="metric-grid">
                  {view.metrics.map((metric, index) => (
                    <motion.article
                      className="metric-card"
                      key={metric.label}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.055,
                        duration: 0.3,
                      }}
                      whileHover={{
                        y: -4,
                        transition: {
                          duration: 0.2,
                        },
                      }}
                    >
                      <div
                        className={`metric-icon tone-${metric.tone}`}
                      >
                        <TrendingUp size={16} />
                      </div>

                      <p>{metric.label}</p>

                      <div className="metric-value">
                        <strong>{metric.value}</strong>

                        <span
                          className={`tone-text-${metric.tone}`}
                        >
                          {metric.delta}
                        </span>
                      </div>

                      <MiniSparkline tone={metric.tone} />
                    </motion.article>
                  ))}
                </div>

                <div className="dashboard-content-grid">
                  <article className="chart-card dashboard-card">
                    <div className="dashboard-card-header">
                      <div>
                        <span>{view.chartEyebrow}</span>
                        <strong>{view.chartTitle}</strong>
                      </div>

                      <span className="forecast-badge">
                        {view.chartBadge}
                      </span>
                    </div>

                    <DashboardChart
                      range={range}
                      type={view.chartType}
                    />

                    <div className="chart-legend">
                      <span>
                        <i className="actual" />
                        Actual
                      </span>

                      <span>
                        <i className="forecast" />
                        AI forecast
                      </span>

                      <span>
                        <i className="baseline" />
                        Baseline
                      </span>
                    </div>
                  </article>

                  <PriorityCard
                    priority={view.priority}
                    expanded={expandedInsight}
                    onToggle={() =>
                      setExpandedInsight((current) => !current)
                    }
                  />
                </div>

                <article className="opportunity-table dashboard-card">
                  <div className="table-header">
                    <div>
                      <span>{view.tableTitle}</span>

                      <strong>
                        {filteredSignals.length} {view.tableSubtitle}
                      </strong>
                    </div>

                    <button type="button" className="text-button">
                      View all
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="table-scroll">
                    <table>
                      <thead>
                        <tr>
                          <th>Signal</th>
                          <th>Segment</th>
                          <th>Impact</th>
                          <th>Confidence</th>
                          <th>Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredSignals.map((row, index) => (
                          <tr
                            key={`${tab}-${row[0]}`}
                            className={
                              selectedRow === index ? "selected" : ""
                            }
                            onClick={() => setSelectedRow(index)}
                          >
                            <td>
                              <span className="signal-dot" />
                              {row[0]}
                            </td>

                            <td>{row[1]}</td>

                            <td className="impact-cell">{row[2]}</td>

                            <td>
                              <span className="confidence-bar">
                                <i
                                  style={{
                                    width: row[3],
                                  }}
                                />
                              </span>

                              {row[3]}
                            </td>

                            <td>
                              <span
                                className={`status-badge status-${row[4].toLowerCase()}`}
                              >
                                {row[4]}
                              </span>
                            </td>
                          </tr>
                        ))}

                        {filteredSignals.length === 0 && (
                          <tr>
                            <td colSpan={5}>
                              <div className="dashboard-empty-state">
                                <Search size={18} />
                                <span>
                                  No results found for “{query}”.
                                </span>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </article>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PriorityCard({
  priority,
  expanded,
  onToggle,
}: {
  priority: DashboardPriority;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      className={`priority-card dashboard-card priority-${priority.tone}`}
    >
      <div className="priority-top">
        <span className="risk-icon">
          {priority.tone === "risk" ? (
            <ShieldAlert size={17} />
          ) : priority.tone === "success" ? (
            <TrendingUp size={17} />
          ) : priority.tone === "cyan" ? (
            <Bot size={17} />
          ) : (
            <Sparkles size={17} />
          )}
        </span>

        <span className="risk-badge">{priority.badge}</span>
      </div>

      <h4>{priority.title}</h4>

      <p>{priority.description}</p>

      <div className="priority-stats">
        <div>
          <span>{priority.firstLabel}</span>
          <strong>{priority.firstValue}</strong>
        </div>

        <div>
          <span>{priority.secondLabel}</span>
          <strong>{priority.secondValue}</strong>
        </div>
      </div>

      <button
        type="button"
        className="insight-toggle"
        onClick={onToggle}
        aria-expanded={expanded}
      >
        <span>{priority.evidenceTitle}</span>

        <motion.span animate={{ rotate: expanded ? 180 : 0 }}>
          <ChevronDown size={15} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            className="evidence-list"
            initial={{
              opacity: 0,
              height: 0,
              marginTop: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              marginTop: 12,
            }}
            exit={{
              opacity: 0,
              height: 0,
              marginTop: 0,
            }}
            transition={{
              duration: 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {priority.evidence.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.05,
                }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <a
        href={priority.actionHref}
        className="button button-primary button-full"
      >
        {priority.actionLabel}
        <ArrowRight size={15} />
      </a>
    </article>
  );
}

function DashboardIntro() {
  return (
    <div className="section-intro">
      <div className="eyebrow-row">
        <span className="eyebrow-dot" />

        <p className="eyebrow">03 / Intelligence Dashboard</p>
      </div>

      <h2>
        See what changed, why it matters, and what to do next.
      </h2>

      <p>
        A decision workspace that prioritizes the most important
        signals instead of adding more dashboard noise.
      </p>
    </div>
  );
}

function MiniSparkline({ tone }: { tone: string }) {
  const stroke =
    tone === "danger"
      ? "#ed727b"
      : tone === "success"
        ? "#62d49b"
        : tone === "cyan"
          ? "#54d8ed"
          : "#7b7cff";

  return (
    <svg
      className="mini-sparkline"
      viewBox="0 0 120 34"
      aria-hidden="true"
    >
      <path
        d="M3 28 C18 24 22 14 37 18 S58 8 72 14 S91 7 117 4"
        fill="none"
        stroke={stroke}
        strokeWidth="2.4"
      />

      <path
        d="M3 28 C18 24 22 14 37 18 S58 8 72 14 S91 7 117 4 L117 34 L3 34 Z"
        fill={stroke}
        opacity=".08"
      />
    </svg>
  );
}

function DashboardChart({
  range,
  type,
}: {
  range: DashboardRange;
  type: DashboardChartType;
}) {
  const chartPaths: Record<DashboardChartType, string> = {
    overview:
      "M15 172 C90 157 125 106 205 128 S335 70 418 88 S510 43 560 52",

    intelligence:
      "M15 184 C70 165 120 172 175 128 S282 132 338 84 S460 92 560 40",

    risks:
      "M15 195 C95 184 140 168 205 142 S326 120 410 78 S504 58 560 36",

    opportunities:
      "M15 190 C88 174 136 148 210 128 S325 92 412 68 S506 35 560 24",

    automations:
      "M15 176 C78 168 128 144 190 152 S310 100 380 108 S490 54 560 62",
  };

  const rangeAdjustment: Record<DashboardRange, number> = {
    "7D": 8,
    "30D": 0,
    "90D": -5,
    "12M": -10,
  };

  const path = chartPaths[type];
  const offset = rangeAdjustment[range];
  const gradientId = `dashboard-chart-area-${type}`;

  return (
    <div className="chart-wrap">
      <svg
        viewBox="0 0 580 240"
        role="img"
        aria-label={`${type} dashboard chart for the ${range} range`}
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0"
              stopColor="#54d8ed"
              stopOpacity=".22"
            />

            <stop
              offset="1"
              stopColor="#54d8ed"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {[40, 90, 140, 190].map((yPosition) => (
          <line
            key={yPosition}
            x1="15"
            y1={yPosition}
            x2="560"
            y2={yPosition}
            className="chart-grid-line"
          />
        ))}

        <motion.path
          key={`${type}-${range}-area`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
          d={`${path} L560 220 L15 220 Z`}
          fill={`url(#${gradientId})`}
          transform={`translate(0 ${offset})`}
        />

        <motion.path
          key={`${type}-${range}-line`}
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={{
            pathLength: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          d={path}
          className="chart-actual"
          transform={`translate(0 ${offset})`}
        />

        <motion.path
          key={`${type}-${range}-forecast`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          d="M15 185 C95 174 170 142 235 116 S385 60 560 24"
          className="chart-forecast"
        />

        <line
          x1="15"
          y1="153"
          x2="560"
          y2="153"
          className="chart-baseline"
        />
      </svg>

      <div className="chart-labels">
        <span>Week 1</span>
        <span>Week 2</span>
        <span>Week 3</span>
        <span>Week 4</span>
      </div>
    </div>
  );
}