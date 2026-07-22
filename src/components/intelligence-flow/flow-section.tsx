"use client";

import { useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Lightbulb,
  Network,
  Sparkles,
} from "lucide-react";
import { SectionIntro } from "@/components/ui";

const flowStages = [
  {
    Icon: Database,
    number: "01",
    title: "Ingest Data",
    description:
      "Connect CRM, product, support, finance and contract signals into one live intelligence layer.",
    metric: "2.4M",
    metricLabel: "records synchronized",
    details: [
      "12 connected sources",
      "99.8% field coverage",
      "Live schema validation",
    ],
  },
  {
    Icon: Network,
    number: "02",
    title: "Analyze with AI",
    description:
      "Detect correlations, anomalies and patterns across the complete business context.",
    metric: "34",
    metricLabel: "patterns found",
    details: [
      "Cross-source correlation",
      "Risk scoring",
      "Anomaly detection",
    ],
  },
  {
    Icon: Lightbulb,
    number: "03",
    title: "Generate Insight",
    description:
      "Convert analysis into confidence, business impact and a clear recommended action.",
    metric: "$420K",
    metricLabel: "exposure identified",
    details: [
      "94% confidence",
      "14 affected accounts",
      "One recommended workflow",
    ],
  },
] as const;

export function FlowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const [scrollStage, setScrollStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 78%", "end 22%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.5,
  });

  const railProgress = useTransform(
    smoothProgress,
    [0.04, 0.92],
    [0, 1],
    { clamp: true },
  );

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const stage = Math.min(2, Math.max(0, Math.floor(latest * 3)));
    setScrollStage(stage);
  });

  const activeStage = hoveredStage ?? scrollStage;

  const moveToStage = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="pipeline"
      className="section section-dark flow-section"
      aria-labelledby="flow-heading"
    >
      <div className="shell">
        <div id="flow-heading">
          <SectionIntro
            eyebrow="02 / Intelligence Pipeline"
            title="From fragmented inputs to structured understanding."
            description="Follow the signal from disconnected systems to a decision-ready recommendation."
          />
        </div>

        <div className="flow-stage-navigation" aria-label="Intelligence stages">
          {flowStages.map((stage, index) => (
            <button
              key={stage.title}
              type="button"
              className={activeStage === index ? "active" : ""}
              aria-current={activeStage === index ? "step" : undefined}
              onClick={() => moveToStage(index)}
            >
              <span>{stage.number}</span>
              {stage.title}
            </button>
          ))}
        </div>

        <div className="flow-experience">
          <div className="flow-rail" aria-hidden="true">
            <motion.span style={{ scaleX: railProgress }} />
            {flowStages.map((stage, index) => (
              <motion.i
                key={stage.number}
                className={activeStage >= index ? "active" : ""}
                animate={{
                  scale: activeStage === index ? 1.35 : 1,
                  opacity: activeStage >= index ? 1 : 0.35,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          <div className="flow-grid">
            {flowStages.map((stage, index) => (
              <FlowCard
                key={stage.title}
                stage={stage}
                index={index}
                progress={smoothProgress}
                active={activeStage === index}
                setRef={(node) => {
                  cardRefs.current[index] = node;
                }}
                onActivate={() => setHoveredStage(index)}
                onDeactivate={() => setHoveredStage(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type FlowStage = (typeof flowStages)[number];

type FlowCardProps = {
  stage: FlowStage;
  index: number;
  progress: MotionValue<number>;
  active: boolean;
  setRef: (node: HTMLElement | null) => void;
  onActivate: () => void;
  onDeactivate: () => void;
};

function FlowCard({
  stage,
  index,
  progress,
  active,
  setRef,
  onActivate,
  onDeactivate,
}: FlowCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const center = (index + 0.5) / flowStages.length;

  const cardProgress = useSpring(progress, {
    stiffness: 70,
    damping: 28,
    mass: 0.9,
  });

  const opacity = useTransform(
    cardProgress,
    [center - 0.48, center - 0.24, center + 0.24, center + 0.48],
    [0.62, 1, 1, 0.62],
  );

  const translateY = useTransform(
    cardProgress,
    [center - 0.48, center - 0.24, center + 0.24, center + 0.48],
    [20, 0, 0, -20],
  );

  const scale = useTransform(
    cardProgress,
    [center - 0.48, center - 0.24, center + 0.24, center + 0.48],
    [0.985, 1, 1, 0.985],
  );

  const reveal = useTransform(
    progress,
    [center - 0.27, center - 0.08, center + 0.2],
    [0, 1, 1],
    { clamp: true },
  );

  const visualMask = useTransform(
    reveal,
    [0, 1],
    ["inset(0 100% 0 0 round 18px)", "inset(0 0% 0 0 round 18px)"],
  );

  const { Icon, number, title, description, metric, metricLabel, details } =
    stage;

  return (
    <motion.article
      ref={setRef}
      tabIndex={0}
      className={`flow-card card-surface ${active ? "active" : ""}`}
      aria-label={`${number}. ${title}`}
      aria-current={active ? "step" : undefined}
      style={
        shouldReduceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : {
            opacity,
            y: translateY,
            scale,
          }
      }
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      whileHover={shouldReduceMotion ? undefined : { y: -10 }}
      whileFocus={shouldReduceMotion ? undefined : { y: -6 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 24,
      }}
    >
      <div className="flow-card-glow" aria-hidden="true" />

      <div className="flow-card-top">
        <motion.span
          className={`flow-icon flow-icon-${index}`}
          animate={{
            rotate: active ? 0 : -8,
            scale: active ? 1.08 : 1,
          }}
          transition={{ duration: 0.35 }}
        >
          <Icon size={20} />
        </motion.span>

        <span className="flow-number">{number}</span>
      </div>

      <h3>{title}</h3>
      <p>{description}</p>

      <motion.div
        className={`flow-visual flow-visual-${index}`}
        style={
          shouldReduceMotion
            ? { clipPath: "inset(0 0% 0 0 round 18px)" }
            : { clipPath: visualMask }
        }
      >
        {index === 0 && <DataIngestVisual reveal={reveal} active={active} />}
        {index === 1 && <AnalysisVisual reveal={reveal} active={active} />}
        {index === 2 && <InsightVisual reveal={reveal} active={active} />}
      </motion.div>

      <div className="flow-metric">
        <motion.strong
          animate={{ color: active ? "#ffffff" : "#d8dce6" }}
        >
          {metric}
        </motion.strong>
        <span>{metricLabel}</span>
      </div>

      <ul>
        {details.map((item, detailIndex) => (
          <motion.li
            key={item}
            animate={{
              x: active ? 4 : 0,
              opacity: active ? 1 : 0.72,
            }}
            transition={{
              delay: active ? detailIndex * 0.06 : 0,
              duration: 0.25,
            }}
          >
            <CheckCircle2 size={14} />
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}

type VisualProps = {
  reveal: MotionValue<number>;
  active: boolean;
};

function DataIngestVisual({ reveal, active }: VisualProps) {
  const sourceMask = useTransform(
    reveal,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );

  return (
    <div className="ingest-visual">
      <motion.div className="source-column" style={{ clipPath: sourceMask }}>
        <span>CRM</span>
        <span>Product</span>
        <span>Support</span>
      </motion.div>

      <svg
        className="ingest-paths"
        viewBox="0 0 150 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M0 22 C55 22 70 60 150 60"
          style={{ pathLength: reveal }}
        />
        <motion.path
          d="M0 60 C55 60 85 60 150 60"
          style={{ pathLength: reveal }}
        />
        <motion.path
          d="M0 98 C55 98 70 60 150 60"
          style={{ pathLength: reveal }}
        />
      </svg>

      <motion.div
        className="ingest-core"
        animate={{
          scale: active ? [1, 1.08, 1] : 1,
          boxShadow: active
            ? [
              "0 0 20px rgba(84,216,237,.15)",
              "0 0 42px rgba(84,216,237,.36)",
              "0 0 20px rgba(84,216,237,.15)",
            ]
            : "0 0 20px rgba(84,216,237,.15)",
        }}
        transition={{
          duration: 1.8,
          repeat: active ? Infinity : 0,
        }}
      >
        <Database size={22} />
      </motion.div>
    </div>
  );
}

function AnalysisVisual({ reveal, active }: VisualProps) {
  const nodeScale = useTransform(reveal, [0.25, 0.75], [0, 1]);

  return (
    <div className="analysis-visual">
      <svg viewBox="0 0 220 120" aria-hidden="true">
        <motion.path
          d="M30 75 L90 35 L140 72 L190 28 M90 35 L100 95 L140 72 M100 95 L190 28"
          style={{
            pathLength: reveal,
            opacity: reveal,
          }}
        />
      </svg>

      {["n1", "n2", "n3", "n4", "n5"].map((nodeClass, index) => (
        <motion.span
          key={nodeClass}
          className={`analysis-node ${nodeClass}`}
          style={{ scale: nodeScale }}
          animate={
            active
              ? {
                opacity: [0.55, 1, 0.55],
              }
              : { opacity: 0.6 }
          }
          transition={{
            duration: 1.6,
            repeat: active ? Infinity : 0,
            delay: index * 0.12,
          }}
        />
      ))}

      <motion.span
        className="analysis-center"
        animate={{
          rotate: active ? 360 : 0,
          scale: active ? 1.08 : 1,
        }}
        transition={{
          rotate: {
            duration: 7,
            repeat: active ? Infinity : 0,
            ease: "linear",
          },
          scale: { duration: 0.3 },
        }}
      >
        <Sparkles size={18} />
      </motion.span>
    </div>
  );
}

function InsightVisual({ reveal, active }: VisualProps) {
  const barScale = useTransform(reveal, [0.25, 0.9], [0, 1]);
  const cardY = useTransform(reveal, [0, 1], [24, 0]);
  const cardOpacity = useTransform(reveal, [0.1, 0.75], [0, 1]);

  return (
    <motion.div
      className="insight-visual"
      style={{
        y: cardY,
        opacity: cardOpacity,
      }}
    >
      <div className="insight-mini-head">
        <span>Priority insight</span>
        <motion.strong
          animate={{
            opacity: active ? [0.6, 1, 0.6] : 1,
          }}
          transition={{
            duration: 1.6,
            repeat: active ? Infinity : 0,
          }}
        >
          94%
        </motion.strong>
      </div>

      <h4>Renewal risk +18%</h4>

      <div className="insight-mini-bars">
        <motion.i style={{ width: "82%", scaleX: barScale }} />
        <motion.i style={{ width: "65%", scaleX: barScale }} />
        <motion.i style={{ width: "48%", scaleX: barScale }} />
      </div>

      <motion.span
        className="insight-mini-action"
        animate={{ x: active ? 4 : 0 }}
      >
        Recommended workflow ready
        <ArrowRight size={12} />
      </motion.span>
    </motion.div>
  );
}