export const dashboardTabs = [
  "Overview",
  "Intelligence",
  "Risks",
  "Opportunities",
  "Automations",
] as const;

export type DashboardTab = (typeof dashboardTabs)[number];

export const dashboardRanges = ["7D", "30D", "90D", "12M"] as const;

export const dashboardWorkspaces = [
  "Northstar Enterprise",
  "Revenue Operations",
  "Customer Success",
] as const;

export type DashboardTone =
  | "danger"
  | "success"
  | "primary"
  | "cyan";

export type DashboardStatus =
  | "New"
  | "Reviewing"
  | "Approved"
  | "Active";

export type DashboardMetric = {
  value: string;
  label: string;
  delta: string;
  tone: DashboardTone;
};

export type DashboardSignal = readonly [
  signal: string,
  segment: string,
  impact: string,
  confidence: string,
  status: DashboardStatus,
];

export type DashboardView = {
  overline: string;
  title: string;
  chartEyebrow: string;
  chartTitle: string;
  chartBadge: string;
  chartType:
  | "overview"
  | "intelligence"
  | "risks"
  | "opportunities"
  | "automations";
  metrics: readonly DashboardMetric[];
  priority: {
    tone: "risk" | "success" | "primary" | "cyan";
    badge: string;
    title: string;
    description: string;
    firstLabel: string;
    firstValue: string;
    secondLabel: string;
    secondValue: string;
    evidenceTitle: string;
    evidence: readonly string[];
    actionLabel: string;
    actionHref: string;
  };
  tableTitle: string;
  tableSubtitle: string;
  signals: readonly DashboardSignal[];
};

export const dashboardViews: Record<DashboardTab, DashboardView> = {
  Overview: {
    overline: "Overview",
    title: "Good morning. Here is what changed.",
    chartEyebrow: "Performance and forecast",
    chartTitle: "Revenue health trend",
    chartBadge: "AI forecast",
    chartType: "overview",
    metrics: [
      {
        value: "$420K",
        label: "Revenue at risk",
        delta: "+18%",
        tone: "danger",
      },
      {
        value: "$680K",
        label: "Opportunity value",
        delta: "+12%",
        tone: "success",
      },
      {
        value: "94%",
        label: "Model confidence",
        delta: "+4 pts",
        tone: "primary",
      },
      {
        value: "3",
        label: "Active automations",
        delta: "Live",
        tone: "cyan",
      },
    ],
    priority: {
      tone: "risk",
      badge: "Priority risk",
      title: "Enterprise renewal risk increased by 18%.",
      description:
        "Fourteen accounts show correlated declines in usage, engagement and support satisfaction.",
      firstLabel: "Exposure",
      firstValue: "$420K",
      secondLabel: "Confidence",
      secondValue: "94%",
      evidenceTitle: "Why Xai detected this",
      evidence: [
        "Product usage declined 12%",
        "Support response time increased 22%",
        "Executive engagement declined 16%",
      ],
      actionLabel: "Review recommended workflow",
      actionHref: "#automation",
    },
    tableTitle: "Prioritized intelligence",
    tableSubtitle: "signals requiring attention",
    signals: [
      ["Renewal-risk recovery", "Enterprise", "$420K", "94%", "New"],
      ["Expansion readiness", "Mid-market", "$280K", "91%", "Reviewing"],
      ["Support optimization", "Enterprise", "$84K", "87%", "Approved"],
      ["Pricing conversion", "Growth", "$116K", "83%", "Active"],
    ],
  },

  Intelligence: {
    overline: "Intelligence",
    title: "Explore the signals driving business decisions.",
    chartEyebrow: "Intelligence activity",
    chartTitle: "Signals analyzed over time",
    chartBadge: "34 patterns",
    chartType: "intelligence",
    metrics: [
      {
        value: "2.4M",
        label: "Records analyzed",
        delta: "+8.4%",
        tone: "primary",
      },
      {
        value: "34",
        label: "Patterns detected",
        delta: "+7",
        tone: "cyan",
      },
      {
        value: "91%",
        label: "Average confidence",
        delta: "+3 pts",
        tone: "success",
      },
      {
        value: "12",
        label: "Connected sources",
        delta: "Healthy",
        tone: "cyan",
      },
    ],
    priority: {
      tone: "primary",
      badge: "High-confidence insight",
      title: "Usage decline is strongly correlated with renewal risk.",
      description:
        "Xai connected product activity, support sentiment and executive engagement across fourteen enterprise accounts.",
      firstLabel: "Signals",
      firstValue: "8",
      secondLabel: "Confidence",
      secondValue: "94%",
      evidenceTitle: "Evidence included",
      evidence: [
        "Weekly active usage declined across key teams",
        "Negative support sentiment increased",
        "Executive meeting attendance decreased",
      ],
      actionLabel: "Explore Intelligence Core",
      actionHref: "#intelligence-core",
    },
    tableTitle: "Detected intelligence",
    tableSubtitle: "AI-generated patterns",
    signals: [
      ["Usage and renewal correlation", "Enterprise", "$420K", "94%", "New"],
      ["Expansion readiness cluster", "Mid-market", "$280K", "91%", "Reviewing"],
      ["Support volume forecast", "Enterprise", "$84K", "87%", "Approved"],
      ["Pricing sensitivity pattern", "Growth", "$116K", "83%", "Active"],
    ],
  },

  Risks: {
    overline: "Risks",
    title: "Prioritize exposure before it becomes revenue loss.",
    chartEyebrow: "Risk movement",
    chartTitle: "Revenue exposure trend",
    chartBadge: "3 critical",
    chartType: "risks",
    metrics: [
      {
        value: "$420K",
        label: "Critical exposure",
        delta: "+18%",
        tone: "danger",
      },
      {
        value: "14",
        label: "Accounts at risk",
        delta: "+5",
        tone: "danger",
      },
      {
        value: "3",
        label: "Critical risks",
        delta: "Review",
        tone: "danger",
      },
      {
        value: "94%",
        label: "Risk confidence",
        delta: "+4 pts",
        tone: "primary",
      },
    ],
    priority: {
      tone: "risk",
      badge: "Critical risk",
      title: "Fourteen enterprise renewals require immediate attention.",
      description:
        "The affected accounts represent significant exposure and share declining engagement across multiple business signals.",
      firstLabel: "Exposure",
      firstValue: "$420K",
      secondLabel: "Accounts",
      secondValue: "14",
      evidenceTitle: "Risk indicators",
      evidence: [
        "Renewal dates are within the next 90 days",
        "Product engagement declined across three weeks",
        "Support satisfaction fell below target",
      ],
      actionLabel: "Launch retention workflow",
      actionHref: "#automation",
    },
    tableTitle: "Risk register",
    tableSubtitle: "risks requiring action",
    signals: [
      ["Enterprise renewal exposure", "Enterprise", "$420K", "94%", "New"],
      ["Support escalation risk", "Enterprise", "$142K", "90%", "Reviewing"],
      ["Adoption decline", "Mid-market", "$96K", "86%", "Approved"],
      ["Contract downgrade risk", "Growth", "$68K", "82%", "Active"],
    ],
  },

  Opportunities: {
    overline: "Opportunities",
    title: "Focus teams on the highest-value growth signals.",
    chartEyebrow: "Opportunity movement",
    chartTitle: "Expansion value forecast",
    chartBadge: "$680K identified",
    chartType: "opportunities",
    metrics: [
      {
        value: "$680K",
        label: "Opportunity value",
        delta: "+12%",
        tone: "success",
      },
      {
        value: "26",
        label: "Expansion accounts",
        delta: "+8",
        tone: "success",
      },
      {
        value: "91%",
        label: "Opportunity confidence",
        delta: "+5 pts",
        tone: "primary",
      },
      {
        value: "7",
        label: "Ready for outreach",
        delta: "Today",
        tone: "cyan",
      },
    ],
    priority: {
      tone: "success",
      badge: "Priority opportunity",
      title: "Seven accounts show strong expansion readiness.",
      description:
        "Increased adoption, multi-team usage and positive support sentiment indicate high potential for additional product adoption.",
      firstLabel: "Potential",
      firstValue: "$280K",
      secondLabel: "Confidence",
      secondValue: "91%",
      evidenceTitle: "Growth indicators",
      evidence: [
        "Seat utilization reached 92%",
        "Multiple teams adopted advanced features",
        "Customer health score increased 14 points",
      ],
      actionLabel: "Review expansion workflow",
      actionHref: "#automation",
    },
    tableTitle: "Growth opportunities",
    tableSubtitle: "opportunities ranked by value",
    signals: [
      ["Enterprise seat expansion", "Enterprise", "$280K", "91%", "New"],
      ["Advanced feature adoption", "Mid-market", "$168K", "89%", "Reviewing"],
      ["Cross-team rollout", "Enterprise", "$142K", "86%", "Approved"],
      ["Annual plan conversion", "Growth", "$90K", "82%", "Active"],
    ],
  },

  Automations: {
    overline: "Automations",
    title: "Monitor coordinated actions from trigger to completion.",
    chartEyebrow: "Workflow performance",
    chartTitle: "Automation execution trend",
    chartBadge: "3 workflows live",
    chartType: "automations",
    metrics: [
      {
        value: "3",
        label: "Active workflows",
        delta: "Live",
        tone: "cyan",
      },
      {
        value: "18",
        label: "Actions completed",
        delta: "+6",
        tone: "success",
      },
      {
        value: "96%",
        label: "Success rate",
        delta: "+2 pts",
        tone: "primary",
      },
      {
        value: "4.2h",
        label: "Time saved",
        delta: "Today",
        tone: "success",
      },
    ],
    priority: {
      tone: "cyan",
      badge: "Workflow in progress",
      title: "Enterprise Retention Workflow is running.",
      description:
        "Account owners have been notified and personalized intelligence is currently being prepared for the affected accounts.",
      firstLabel: "Progress",
      firstValue: "56%",
      secondLabel: "Completed",
      secondValue: "2 / 5",
      evidenceTitle: "Workflow activity",
      evidence: [
        "Account owners notified",
        "Account intelligence generated",
        "Personalized outreach in progress",
      ],
      actionLabel: "Open automation workspace",
      actionHref: "#automation",
    },
    tableTitle: "Automation activity",
    tableSubtitle: "workflow actions and statuses",
    signals: [
      ["Enterprise retention workflow", "Customer Success", "14 accounts", "96%", "Active"],
      ["Expansion outreach", "Revenue", "7 accounts", "91%", "Reviewing"],
      ["Support escalation routing", "Support", "18 cases", "94%", "Approved"],
      ["Pricing follow-up", "Growth", "9 leads", "86%", "Active"],
    ],
  },
};