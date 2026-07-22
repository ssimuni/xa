"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Database, Lightbulb, Network, Sparkles } from "lucide-react";
import { SectionIntro } from "@/components/ui";

const flowStages = [
  { Icon: Database, number: "01", title: "Ingest Data", description: "Connect CRM, product, support, finance and contract signals into one live intelligence layer.", metric: "2.4M", metricLabel: "records synchronized", details: ["12 connected sources", "99.8% field coverage", "Live schema validation"] },
  { Icon: Network, number: "02", title: "Analyze with AI", description: "Detect correlations, anomalies and patterns across the complete business context.", metric: "34", metricLabel: "patterns found", details: ["Cross-source correlation", "Risk scoring", "Anomaly detection"] },
  { Icon: Lightbulb, number: "03", title: "Generate Insight", description: "Convert analysis into confidence, business impact and a clear recommended action.", metric: "$420K", metricLabel: "exposure identified", details: ["94% confidence", "14 affected accounts", "One recommended workflow"] },
] as const;

export function FlowSection() {
  return (
    <section id="pipeline" className="section section-dark">
      <div className="shell">
        <SectionIntro eyebrow="02 / Intelligence Pipeline" title="From fragmented inputs to structured understanding." description="Follow the signal from disconnected systems to a decision-ready recommendation." />
        <div className="flow-rail" aria-hidden="true"><span /></div>
        <div className="flow-grid">
          {flowStages.map(({ Icon, number, title, description, metric, metricLabel, details }, index) => (
            <motion.article className="flow-card card-surface" key={title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ delay: index * 0.12 }} whileHover={{ y: -8 }}>
              <div className="flow-card-top"><span className={`flow-icon flow-icon-${index}`}><Icon size={20} /></span><span className="flow-number">{number}</span></div>
              <h3>{title}</h3><p>{description}</p>
              <div className={`flow-visual flow-visual-${index}`}>{index === 0 ? <DataIngestVisual /> : index === 1 ? <AnalysisVisual /> : <InsightVisual />}</div>
              <div className="flow-metric"><strong>{metric}</strong><span>{metricLabel}</span></div>
              <ul>{details.map((item) => <li key={item}><CheckCircle2 size={14} /> {item}</li>)}</ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DataIngestVisual() { return <div className="ingest-visual"><div className="source-column"><span>CRM</span><span>Product</span><span>Support</span></div><div className="flow-lines"><i /><i /><i /></div><div className="ingest-core"><Database size={22} /></div></div>; }
function AnalysisVisual() { return <div className="analysis-visual"><span className="analysis-node n1" /><span className="analysis-node n2" /><span className="analysis-node n3" /><span className="analysis-node n4" /><span className="analysis-node n5" /><svg viewBox="0 0 220 120" aria-hidden="true"><path d="M30 75 L90 35 L140 72 L190 28 M90 35 L100 95 L140 72 M100 95 L190 28" /></svg><span className="analysis-center"><Sparkles size={18} /></span></div>; }
function InsightVisual() { return <div className="insight-visual"><div className="insight-mini-head"><span>Priority insight</span><strong>94%</strong></div><h4>Renewal risk +18%</h4><div className="insight-mini-bars"><i style={{ width: "82%" }} /><i style={{ width: "65%" }} /><i style={{ width: "48%" }} /></div><span className="insight-mini-action">Recommended workflow ready <ArrowRight size={12} /></span></div>; }
