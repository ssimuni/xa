export const dashboardMetrics = [
  { value: "$420K", label: "Revenue at risk", delta: "+18%", tone: "danger" },
  { value: "$680K", label: "Opportunity value", delta: "+12%", tone: "success" },
  { value: "94%", label: "Model confidence", delta: "+4 pts", tone: "primary" },
  { value: "3", label: "Active automations", delta: "Live", tone: "cyan" },
] as const;

export const dashboardSignals = [
  ["Renewal-risk recovery", "Enterprise", "$420K", "94%", "New"],
  ["Expansion readiness", "Mid-market", "$280K", "91%", "Reviewing"],
  ["Support optimization", "Enterprise", "$84K", "87%", "Approved"],
  ["Pricing conversion", "Growth", "$116K", "83%", "Active"],
] as const;

export const dashboardTabs = ["Overview", "Intelligence", "Risks", "Opportunities", "Automations"] as const;
export const dashboardRanges = ["7D", "30D", "90D", "12M"] as const;
export const dashboardWorkspaces = ["Northstar Enterprise", "Revenue Operations", "Customer Success"] as const;
