"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, CircleDot, Zap } from "lucide-react";
import { useState } from "react";
import { VisualLoading } from "@/components/effects";
import { SectionIntro } from "@/components/ui";

const CoreScene = dynamic(
  () => import("@/components/intelligence-core/core-scene").then((module) => module.CoreScene),
  { ssr: false, loading: () => <VisualLoading label="Loading Intelligence Core" /> },
);

const clusterCopy = {
  renewal: { label: "Renewal risk", eyebrow: "Risk intelligence", title: "Enterprise renewal risk increased by 18%.", value: "$420K", confidence: "94%", text: "Fourteen accounts show declining usage, slower support response and lower executive engagement.", evidence: ["Usage declined 12%", "Support delay increased 22%", "Renewal window averages 47 days"], action: "Launch a targeted retention workflow.", tone: "danger" },
  expansion: { label: "Expansion", eyebrow: "Opportunity intelligence", title: "Six accounts are ready for expansion.", value: "$280K", confidence: "91%", text: "High seat utilization, feature adoption and team growth indicate strong expansion readiness.", evidence: ["Seat utilization above 90%", "Advanced feature adoption +28%", "Team size increased 14%"], action: "Prepare account-specific expansion proposals.", tone: "success" },
  support: { label: "Support forecast", eyebrow: "Forecast intelligence", title: "Support demand may increase by 24%.", value: "+24%", confidence: "87%", text: "Upcoming enterprise launches and release activity are likely to increase ticket volume.", evidence: ["Three enterprise launches scheduled", "Release activity increased", "Capacity is 12% below forecast"], action: "Increase support coverage for the predicted window.", tone: "cyan" },
} as const;

type ClusterId = keyof typeof clusterCopy;

export function CoreSection() {
  const [cluster, setCluster] = useState<ClusterId>("renewal");
  const selected = clusterCopy[cluster];

  return (
    <section id="intelligence-core" className="section section-dark core-section">
      <div className="shell core-grid">
        <div className="core-visual card-surface">
          <div className="visual-header"><div><span className="visual-kicker">Interactive intelligence map</span><strong>Explore correlated signals</strong></div><span className="visual-status"><span /> Select a cluster</span></div>
          <div className="core-canvas"><CoreScene selected={cluster} onSelect={(value) => setCluster(value as ClusterId)} /></div>
          <div className="core-stage-row"><span className="active"><i /> Raw signals</span><span className="active"><i /> Pattern detection</span><span className="active"><i /> Structured intelligence</span></div>
        </div>
        <aside className="core-panel">
          <SectionIntro eyebrow="04 / Intelligence Core" title="Explore the signals behind every decision." description="Select a cluster to inspect its evidence, estimated impact, confidence and recommended action." />
          <div className="cluster-list">
            {(Object.entries(clusterCopy) as [ClusterId, (typeof clusterCopy)[ClusterId]][]).map(([id, copy]) => (
              <button key={id} className={cluster === id ? "active" : ""} onClick={() => setCluster(id)}>
                <span className={`cluster-dot tone-${copy.tone}`} /><span><strong>{copy.label}</strong><small>{copy.confidence} confidence</small></span><ChevronRight size={15} />
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.article className="selected-insight" key={cluster} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className={`insight-accent tone-bg-${selected.tone}`} />
              <div className="selected-insight-body">
                <p className="eyebrow">{selected.eyebrow}</p><h3>{selected.title}</h3><p>{selected.text}</p>
                <div className="selected-insight-stats"><div><span>Estimated value</span><strong>{selected.value}</strong></div><div><span>Confidence</span><strong>{selected.confidence}</strong></div></div>
                <div className="selected-evidence"><span>Supporting evidence</span><ul>{selected.evidence.map((item) => <li key={item}><CircleDot size={12} /> {item}</li>)}</ul></div>
                <div className="recommended-action"><Zap size={16} /><div><span>Recommended action</span><p>{selected.action}</p></div></div>
              </div>
            </motion.article>
          </AnimatePresence>
        </aside>
      </div>
    </section>
  );
}
