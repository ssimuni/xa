export function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="section-intro">
      <div className="eyebrow-row"><span className="eyebrow-dot" /><p className="eyebrow">{eyebrow}</p></div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
