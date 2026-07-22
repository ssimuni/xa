"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, Check, CheckCircle2, FileSearch, Pause, Play, ShieldAlert, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionIntro } from "@/components/ui";

const workflowSteps = ["Notify account owners", "Generate account intelligence", "Prepare personalized outreach", "Create follow-up tasks", "Monitor account response"];
const workflowDescriptions = ["Send the detected risk summary to each assigned account owner.", "Create a concise brief with history, risk factors and recent activity.", "Draft context-aware retention outreach for every affected account.", "Assign prioritized follow-up tasks with recommended due dates.", "Track engagement, usage and risk changes for seven days."];
type AutomationState = "suggested" | "reviewing" | "approved" | "running" | "paused" | "completed";

export function AutomationSection() {
  const [auto, setAuto] = useState<AutomationState>("suggested");
  const [step, setStep] = useState(-1);
  const timers = useRef<number[]>([]);
  const clearTimers = () => { timers.current.forEach((timer) => window.clearTimeout(timer)); timers.current = []; };
  useEffect(() => () => clearTimers(), []);

  const runAutomation = () => {
    clearTimers(); setAuto("running");
    const start = Math.max(0, step + 1);
    workflowSteps.slice(start).forEach((_, index) => timers.current.push(window.setTimeout(() => setStep(start + index), index * 720)));
    timers.current.push(window.setTimeout(() => { setStep(workflowSteps.length - 1); setAuto("completed"); }, workflowSteps.slice(start).length * 720 + 500));
  };
  const resetAutomation = () => { clearTimers(); setAuto("suggested"); setStep(-1); };

  return (
    <section id="automation" className="section automation-section grid-background">
      <div className="shell">
        <SectionIntro eyebrow="05 / AI Automation" title="Move from recommendation to coordinated action." description="Review the trigger, approve the proposed workflow, and monitor every step through a transparent audit trail." />
        <div className="automation-grid">
          <div className="automation-left">
            <article className="trigger-card card-surface">
              <div className="trigger-top"><span className="risk-icon large"><ShieldAlert size={20} /></span><span className="trigger-live"><i /> Trigger active</span></div>
              <p className="eyebrow">Detected condition</p><h3>Renewal risk exceeds 70%</h3><p>Fourteen enterprise accounts share a decline in usage, engagement and support satisfaction.</p>
              <div className="trigger-stats">{[["94%", "Confidence"], ["14", "Accounts"], ["$420K", "Exposure"]].map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
              <div className="monitoring-state"><Activity size={16} /><div><strong>Continuous monitoring enabled</strong><span>Xai keeps evaluating the trigger during execution.</span></div></div>
            </article>
            <article className="audit-card card-surface">
              <div className="card-heading"><span>Workflow audit history</span><small>Transparent execution record</small></div>
              <div className="audit-list">{[
                ["Risk trigger detected", "Renewal-risk threshold exceeded across 14 enterprise accounts.", "warning"],
                ["Workflow recommendation generated", "Xai prepared a retention workflow based on the detected evidence.", "info"],
                ...(auto !== "suggested" ? [["Workflow reviewed", "Planned actions and account impact were opened for review.", "info"]] : []),
                ...(["approved", "running", "paused", "completed"].includes(auto) ? [["Workflow approved", "The retention workflow received explicit user approval.", "success"]] : []),
                ...(auto === "completed" ? [["Workflow completed", "All approved actions finished and monitoring is active.", "success"]] : []),
              ].map(([title, text, tone], index) => <div className="audit-item" key={`${title}-${index}`}><span className={`audit-icon audit-${tone}`}>{tone === "success" ? <Check size={13} /> : tone === "warning" ? <ShieldAlert size={13} /> : <Activity size={13} />}</span><div><strong>{title}</strong><p>{text}</p></div><time>{index < 2 ? `10:4${2 + index}` : "Now"}</time></div>)}</div>
            </article>
          </div>
          <article className="workflow-card card-surface">
            <div className="workflow-header"><div><p className="eyebrow">Recommended workflow</p><h3>Enterprise Retention Workflow</h3><p>Convert the detected renewal-risk insight into a controlled, reviewable response.</p></div><span className={`workflow-status workflow-${auto}`}>{auto}</span></div>
            <div className="workflow-summary">{[[Users, "Owner", "Customer Success"], [CheckCircle2, "Approval", "Required"], [Activity, "Monitoring", "7 days"]].map(([Icon, label, value]) => <div key={label as string}><Icon size={16} /><span>{label as string}</span><strong>{value as string}</strong></div>)}</div>
            {auto !== "suggested" && <div className="workflow-progress-wrap"><div className="workflow-progress-label"><span>Workflow progress</span><strong>{auto === "completed" ? 100 : Math.max(0, Math.round(((step + (auto === "running" ? 0.5 : 0)) / workflowSteps.length) * 100))}%</strong></div><div className="workflow-progress"><motion.i animate={{ width: `${auto === "completed" ? 100 : Math.max(0, ((step + 1) / workflowSteps.length) * 100)}%` }} /></div></div>}
            {auto !== "suggested" && <div className="workflow-steps">{workflowSteps.map((item, index) => { const complete = auto === "completed" || index < step; const active = auto === "running" && index === step; return <div key={item} className={`workflow-step ${complete ? "complete" : ""} ${active ? "active" : ""}`}><span className="step-index">{complete ? <Check size={14} /> : active ? <span className="step-spinner" /> : index + 1}</span><div><strong>{item}</strong><p>{workflowDescriptions[index]}</p></div><small>{complete ? "Completed" : active ? "Running" : "Pending"}</small></div>; })}</div>}
            <div className="workflow-actions">
              {auto === "suggested" && <button className="button button-primary" onClick={() => setAuto("reviewing")}><FileSearch size={15} /> Review workflow</button>}
              {auto === "reviewing" && <><button className="button button-primary" onClick={() => setAuto("approved")}><Check size={15} /> Approve workflow</button><button className="button button-secondary" onClick={resetAutomation}>Cancel</button></>}
              {auto === "approved" && <button className="button button-primary" onClick={runAutomation}><Play size={15} /> Start automation</button>}
              {auto === "running" && <button className="button button-secondary" onClick={() => { clearTimers(); setAuto("paused"); }}><Pause size={15} /> Pause workflow</button>}
              {auto === "paused" && <><button className="button button-primary" onClick={runAutomation}><Play size={15} /> Resume workflow</button><button className="button button-secondary" onClick={resetAutomation}>Reset</button></>}
              {auto === "completed" && <button className="button button-secondary" onClick={resetAutomation}>Run demonstration again</button>}
            </div>
            <AnimatePresence>{auto === "completed" && <motion.div className="completion-card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}><CheckCircle2 size={24} /><div><strong>Retention response successfully coordinated.</strong><p>Owners were notified, intelligence briefs were generated and seven-day monitoring is now active.</p></div></motion.div>}</AnimatePresence>
          </article>
        </div>
        <div className="closing-statement"><p className="eyebrow">Xai Intelligence Workspace</p><h2>From signal to decision.<br />From decision to action.</h2><p>One connected intelligence system for understanding change, prioritizing decisions and coordinating the next response.</p><a href="#overview" className="button button-secondary">Return to beginning</a></div>
      </div>
    </section>
  );
}
