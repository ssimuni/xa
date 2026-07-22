# Xai - Intelligence Workspace

A complete high-fidelity frontend product prototype that transforms fragmented business data into structured intelligence, actionable insight, and coordinated AI automation.

## Product journey

Raw Data -> Structured Intelligence -> Actionable Insight -> AI Automation

## Included

- Interactive React Three Fiber hero
- Three-stage intelligence pipeline
- Functional dashboard with tabs, search, date controls, metrics, chart, and table
- Selectable 3D Intelligence Core
- User-reviewed and approved automation workflow
- Responsive layout
- Reduced-motion support
- Error/loading states
- Playwright test starter
- Submission templates and documentation

## Stack

Next.js, React, TypeScript, Tailwind CSS, Framer Motion, GSAP, Three.js, React Three Fiber, Drei, Lucide React.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Validate

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
npm run test:e2e
```

## Deployment

Recommended: Vercel. Import the GitHub repository and deploy with the default Next.js settings.

## Final links

Replace placeholders inside `submission/links/Submission-Links.txt` before submitting.

## Author

Sadia Siddiqua Tisa

## Component architecture

The interface is split into feature-owned modules rather than one oversized page component:

- `components/intelligence-flow` — pipeline cards and data-to-insight visuals
- `components/dashboard` — dashboard data, metrics, charts, evidence, and table interactions
- `components/core` — Intelligence Core section and cluster selection state
- `components/intelligence-core` — WebGL/Three.js core scene
- `components/automation` — workflow review, approval, execution, pause, reset, and audit trail
- `components/effects` — shared scroll progress and visual loading states
- `components/ui` — shared section-heading primitives
- `components/layout` — navigation, hero composition, and page assembly
