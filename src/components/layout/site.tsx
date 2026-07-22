"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, ArrowDown, ArrowRight, Database, Gauge, Menu, Network, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AutomationSection } from "@/components/automation";
import { CoreSection } from "@/components/core";
import { DashboardSection } from "@/components/dashboard";
import { ScrollProgress, VisualLoading } from "@/components/effects";
import { FlowSection } from "@/components/intelligence-flow";

const HeroScene = dynamic(
  () => import("@/components/hero/hero-scene").then((module) => module.HeroScene),
  { ssr: false, loading: () => <VisualLoading label="Loading intelligence field" /> },
);

const navItems = [["Overview", "overview"], ["Flow", "pipeline"], ["Dashboard", "dashboard"], ["Core", "intelligence-core"], ["Automation", "automation"]] as const;

export function Site() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    let frameId = 0;
    const updateActiveSection = () => {
      const readingLine = window.scrollY + Math.min(window.innerHeight * 0.34, 320);
      const sections = navItems.map(([, id]) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
      const current = sections.find((section) => readingLine >= section.offsetTop && readingLine < section.offsetTop + section.offsetHeight);
      const nearest = current ?? sections.reduce<HTMLElement | null>((closest, section) => !closest || Math.abs(section.offsetTop - readingLine) < Math.abs(closest.offsetTop - readingLine) ? section : closest, null);
      if (nearest) setActiveSection(nearest.id);
    };
    const scheduleUpdate = () => { window.cancelAnimationFrame(frameId); frameId = window.requestAnimationFrame(updateActiveSection); };
    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => { window.cancelAnimationFrame(frameId); window.removeEventListener("scroll", scheduleUpdate); window.removeEventListener("resize", scheduleUpdate); };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <ScrollProgress />
      <header className="site-header">
        <div className="shell header-inner">
          <a href="#overview" className="brand" aria-label="Xai Intelligence Workspace home"><span className="brand-mark" aria-hidden="true">X</span><span><strong>Xai</strong><small>Intelligence Workspace</small></span></a>
          <nav className="desktop-nav" aria-label="Primary navigation">{navItems.map(([label, id]) => <a key={id} href={`#${id}`} className={activeSection === id ? "active" : ""} aria-current={activeSection === id ? "page" : undefined}>{label}</a>)}</nav>
          <div className="header-actions"><span className="live-status"><span /> System live</span><button className="icon-button mobile-menu-button" aria-expanded={mobileMenu} aria-label="Toggle navigation" onClick={() => setMobileMenu((value) => !value)}>{mobileMenu ? <X size={19} /> : <Menu size={19} />}</button></div>
        </div>
        <AnimatePresence>{mobileMenu && <motion.nav className="mobile-nav shell" aria-label="Mobile navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>{navItems.map(([label, id]) => <a key={id} href={`#${id}`} className={activeSection === id ? "active" : ""} aria-current={activeSection === id ? "page" : undefined} onClick={() => setMobileMenu(false)}>{label}<ArrowRight size={15} /></a>)}</motion.nav>}</AnimatePresence>
      </header>

      <main id="main">
        <section id="overview" className="hero-section grid-background">
          <div className="hero-orb hero-orb-one" aria-hidden="true" /><div className="hero-orb hero-orb-two" aria-hidden="true" />
          <div className="shell hero-grid">
            <motion.div className="hero-copy" initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <div className="eyebrow-row"><span className="eyebrow-dot" /><p className="eyebrow">AI Decision Intelligence</p></div>
              <h1 className="hero-title">Turn complex data into <span>clear decisions.</span></h1>
              <p className="hero-description">Xai connects fragmented business data, detects the signals that matter, and transforms intelligence into coordinated action.</p>
              <div className="hero-actions"><a className="button button-primary" href="#pipeline">Explore intelligence flow <ArrowDown size={16} /></a><a className="button button-secondary" href="#dashboard">View workspace <ArrowRight size={16} /></a></div>
              <div className="hero-proof"><div className="avatar-stack" aria-hidden="true"><span>NS</span><span>AC</span><span>OP</span></div><p>Trusted signal coverage across <strong>12 business systems</strong></p></div>
            </motion.div>
            <motion.div className="hero-visual card-surface" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }}>
              <div className="visual-header"><div><span className="visual-kicker">Live intelligence field</span><strong>Raw signals organizing</strong></div><span className="visual-status"><span /> 94% confidence</span></div>
              <div className="hero-canvas"><HeroScene /></div>
              <div className="visual-footer"><span><Database size={13} /> 2.4M records</span><span><Network size={13} /> 34 patterns</span><span><Sparkles size={13} /> 4 insights</span></div>
            </motion.div>
          </div>
          <div className="shell hero-metrics">{[
            { value: "12", label: "Connected sources", Icon: Database }, { value: "94%", label: "Model confidence", Icon: Gauge }, { value: "4", label: "Priority insights", Icon: Sparkles }, { value: "Live", label: "Continuous analysis", Icon: Activity },
          ].map(({ value, label, Icon }) => <div className="hero-metric" key={label}><Icon size={17} /><div><strong>{value}</strong><span>{label}</span></div></div>)}</div>
        </section>
        <FlowSection />
        <DashboardSection />
        <CoreSection />
        <AutomationSection />
      </main>
      <footer className="site-footer"><div className="shell footer-inner"><div className="brand"><span className="brand-mark mini">X</span><span><strong>Xai</strong><small>Intelligence Workspace</small></span></div><span>Designed and developed by Sayma Siddiqua Simu</span><span>Frontend Product Experience · 2026</span></div></footer>
    </>
  );
}
