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
  DashboardTab,
  dashboardRanges,
  dashboardTabs,
  dashboardViews,
  dashboardWorkspaces,
} from "./dashboard-data";

export function DashboardSection() {
  const [tab, setTab] = useState<DashboardTab>("Overview");
  const [range, setRange] =
    useState<(typeof dashboardRanges)[number]>("30D");
  const [query, setQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState<number | null>(0);
  const [expandedInsight, setExpandedInsight] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [workspace, setWorkspace] =
    useState<(typeof dashboardWorkspaces)[number]>(
      "Northstar Enterprise",
    );

  const view = dashboardViews[tab];

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return view.signals;
    }

    return view.signals.filter((row) =>
      row.join(" ").toLowerCase().includes(normalizedQuery),
    );
  }, [query, view.signals]);

  const navIcons = [
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
    <section
      id="dashboard"
      className="section dashboard-section"
    >
      <div className="shell">
        <DashboardIntro />

        <motion.div
          className="dashboard-shell"
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
        >
          <aside className="dashboard-sidebar">
            <div className="sidebar-brand">
              <span className="brand-mark mini">X</span>
              <strong>Workspace</strong>
            </div>

            <nav aria-label="Dashboard navigation">
              {dashboardTabs.map((label, index) => {
                const Icon = navIcons[index];

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
                  onClick={() =>
                    setWorkspaceOpen((value) => !value)
                  }
                  aria-expanded={workspaceOpen}
                >
                  <span className="workspace-avatar">N</span>

                  <span>
                    <small>Workspace</small>
                    <strong>{workspace}</strong>
                  </span>

                  <ChevronDown size={15} />
                </button>

                <AnimatePresence>
                  {workspaceOpen && (
                    <motion.div
                      className="workspace-menu"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                    >
                      {dashboardWorkspaces.map((item) => (
                        <button
                          type="button"
                          key={item}
                          onClick={() => {
                            setWorkspace(item);
                            setWorkspaceOpen(false);
                          }}
                        >
                          {item}

                          {workspace === item && (
                            <Check size={14} />
                          )}
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
                    onChange={(event) =>
                      setQuery(event.target.value)
                    }
                    placeholder={`Search ${tab.toLowerCase()}`}
                    aria-label={`Search ${tab.toLowerCase()}`}
                  />
                </label>

                <button
                  type="button"
                  className="icon-button"
                  aria-label="Notifications"
                >
                  <Bell size={16} />
                  <span className="notification-dot" />
                </button>

                <span className="profile-avatar">ST</span>
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
                    aria-label="Date range"
                  >
                    {dashboardRanges.map((item) => (
                      <button
                        type="button"
                        key={item}
                        className={
                          range === item ? "active" : ""
                        }
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
                      setExpandedInsight((value) => !value)
                    }
                  />
                </div>

                <article className="opportunity-table dashboard-card">
                  <div className="table-header">
                    <div>
                      <span>{view.tableTitle}</span>

                      <strong>
                        {filtered.length} {view.tableSubtitle}
                      </strong>
                    </div>

                    <button
                      type="button"
                      className="text-button"
                    >
                      View all
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  <div className="table-scroll">
                    <table>
                      <thead>
                        <tr>
                          {[
                            "Signal",
                            "Segment",
                            "Impact",
                            "Confidence",
                            "Status",
                          ].map((heading) => (
                            <th key={heading}>{heading}</th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {filtered.map((row, index) => (
                          <tr
                            key={row[0]}
                            className={
                              selectedRow === index
                                ? "selected"
                                : ""
                            }
                            onClick={() =>
                              setSelectedRow(index)
                            }
                          >
                            <td>
                              <span className="signal-dot" />
                              {row[0]}
                            </td>

                            <td>{row[1]}</td>

                            <td className="impact-cell">
                              {row[2]}
                            </td>

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

type Priority = ReturnType<
  typeof getPriorityType
>;

function getPriorityType() {
  return dashboardViews.Overview.priority;
}

function PriorityCard({
  priority,
  expanded,
  onToggle,
}: {
  priority: Priority;
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

        <span className="risk-badge">
          {priority.badge}
        </span>
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
        {priority.evidenceTitle}

        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
        >
          <ChevronDown size={15} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            className="evidence-list"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{ opacity: 0, height: 0 }}
          >
            {priority.evidence.map((item) => (
              <li key={item}>{item}</li>
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

        <p className="eyebrow">
          03 / Intelligence Dashboard
        </p>
      </div>

      <h2>
        See what changed, why it matters, and what to do
        next.
      </h2>

      <p>
        A decision workspace that prioritizes the most
        important signals instead of adding more dashboard
        noise.
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
  range: (typeof dashboardRanges)[number];
  type:
    | "overview"
    | "intelligence"
    | "risks"
    | "opportunities"
    | "automations";
}) {
  const chartPaths = {
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

  const rangeAdjustment = {
    "7D": 8,
    "30D": 0,
    "90D": -5,
    "12M": -10,
  };

  const path = chartPaths[type];
  const offset = rangeAdjustment[range];

  return (
    <div className="chart-wrap">
      <svg
        viewBox="0 0 580 240"
        role="img"
        aria-label={`${type} chart for ${range}`}
      >
        <defs>
          <linearGradient
            id={`dashboardChartArea-${type}`}
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

        {[40, 90, 140, 190].map((y) => (
          <line
            key={y}
            x1="15"
            y1={y}
            x2="560"
            y2={y}
            className="chart-grid-line"
          />
        ))}

        <motion.path
          key={`${type}-${range}-area`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          d={`${path} L560 220 L15 220 Z`}
          fill={`url(#dashboardChartArea-${type})`}
        />

        <motion.path
          key={`${type}-${range}-line`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          d={path}
          className="chart-actual"
          transform={`translate(0 ${offset})`}
        />

        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.12,
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