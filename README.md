````markdown
# Xai — Intelligence Workspace

A high-fidelity frontend product experience that transforms fragmented business data into structured intelligence, actionable insights, and coordinated AI automation.

## Project Links

- **GitHub Repository:** https://github.com/ssimuni/xa
- **Figma Design:** https://www.figma.com/design/yqJ8L3HoZRu4GTbmVijW8R/XAI-Figma?node-id=0-1&p=f&t=T8ChUZRjP1rRWqjN-0
- **Live Website:** https://xa-simu1.vercel.app/
- **Demo Video:** 

## Project Overview

Xai is an interactive intelligence workspace designed to communicate a complete AI decision-making journey:

1. Ingest fragmented business data
2. Analyze signals with AI
3. Generate prioritized insights
4. Explore the evidence behind decisions
5. Review recommended actions
6. Approve and monitor AI-powered workflows

The project combines product storytelling, enterprise dashboard design, motion, 3D visualization, and interactive workflow states.

## Product Narrative

The experience follows one clear transformation:

> Raw data → structured intelligence → actionable insight → AI automation

Each section represents a step in that journey and helps users understand how Xai turns complex information into confident business decisions.

## Key Features

- Scroll-responsive product narrative
- Interactive 3D intelligence visualization
- Animated particle and orbit system
- Data ingestion, analysis, and insight-generation flow
- Enterprise intelligence dashboard
- Revenue-risk and opportunity indicators
- Interactive Intelligence Core
- Evidence, confidence, and impact exploration
- Reviewable AI automation workflow
- Workflow progress and audit trail
- Responsive desktop and mobile layouts
- Keyboard-accessible controls
- Reduced-motion support

## Technology Stack

- Next.js
- React
- TypeScript
- Framer Motion
- GSAP
- Three.js
- React Three Fiber
- Lucide React
- CSS design tokens

## Project Structure

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── automation/
│   │   ├── automation-section.tsx
│   │   └── index.ts
│   │
│   ├── core/
│   │   ├── core-section.tsx
│   │   └── index.ts
│   │
│   ├── dashboard/
│   │   ├── dashboard-data.ts
│   │   ├── dashboard-section.tsx
│   │   └── index.ts
│   │
│   ├── effects/
│   │   ├── scroll-progress.tsx
│   │   ├── visual-loading.tsx
│   │   └── index.ts
│   │
│   ├── hero/
│   │   └── hero-scene.tsx
│   │
│   ├── intelligence-core/
│   │   └── core-scene.tsx
│   │
│   ├── intelligence-flow/
│   │   ├── flow-section.tsx
│   │   └── index.ts
│   │
│   └── layout/
│       └── site.tsx
│
└── styles/
    └── tokens.css
````

## Getting Started

### Requirements

* Node.js 20 or later
* npm 10 or later

### Clone the Repository

```bash
git clone https://github.com/ssimuni/xa
```

### Open the Project

```bash
cd xai-intelligence-workspace
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open the project at:

```text
http://localhost:3000
```

## Available Commands

Start the local development server:

```bash
npm run dev
```

Run the TypeScript check:

```bash
npm run typecheck
```

Run ESLint:

```bash
npm run lint
```

Create an optimized production build:

```bash
npm run build
```

Run the production build locally:

```bash
npm run start
```

## Experience Sections

### 1. Overview

The hero introduces the core product message:

> Turn complex data into clear decisions.

The 3D intelligence field represents disconnected signals organizing into a structured decision model.

### 2. Intelligence Flow

The product transformation is communicated through three stages:

* Ingest Data
* Analyze with AI
* Generate Insight

Each stage includes a clear explanation and a measurable product outcome.

### 3. Intelligence Dashboard

The dashboard presents decision-ready business information, including:

* Revenue at risk
* Opportunity value
* Model confidence
* Active automations
* Forecast performance
* Priority intelligence
* Recommended workflows

The dashboard uses static demonstration data, which is appropriate for this frontend challenge.

### 4. Intelligence Core

The Intelligence Core allows users to explore correlated signal clusters.

Users can inspect:

* Supporting evidence
* Model confidence
* Estimated business impact
* Recommended actions

Selecting a cluster changes the displayed intelligence and visually emphasizes the active signal group.

### 5. AI Automation

The automation experience transforms an insight into a controlled workflow.

Users can:

* Review the detected condition
* Inspect workflow steps
* Approve execution
* Start the automation
* Pause and resume progress
* Monitor completion
* Review the audit history

## Motion and Interaction Decisions

Motion is used to communicate product state rather than being purely decorative.

### Hero Motion

The hero includes:

* Floating data particles
* Three orbiting intelligence rings
* A pulsing inner core
* Ambient glow animation
* Pointer-responsive movement
* Scroll-linked transitions

The 3D scene represents fragmented signals becoming structured intelligence.

### Intelligence Flow Motion

The flow cards appear progressively as the user scrolls through the transformation process.

### Dashboard Motion

Dashboard transitions remain restrained to preserve clarity and maintain an enterprise-product feel.

### Intelligence Core Motion

The Intelligence Core reacts to pointer movement and cluster selection. Selecting a cluster emphasizes relevant evidence while reducing the prominence of unrelated signals.

### Automation Motion

The automation section communicates changing workflow states through progress bars, step statuses, audit entries, and completion feedback.

## Accessibility

The interface includes:

* Semantic HTML
* Keyboard-accessible controls
* Visible focus states
* Descriptive button labels
* Sufficient text contrast
* Reduced-motion support
* Responsive layouts
* Text alternatives for visual experiences

Users who prefer reduced motion receive a simplified experience without unnecessary continuous animation.

## Performance Decisions

The project uses:

* Dynamically loaded 3D components
* Limited device pixel ratio
* Lightweight geometry
* Deterministic particle generation
* Minimal post-processing
* Modular reusable components
* Optimized production builds
* No unnecessary backend requests

## Design System

The design system uses:

* Dark enterprise surfaces
* Violet and cyan intelligence accents
* Consistent spacing tokens
* Reusable card patterns
* Standardized border radii
* Clear typography hierarchy
* Semantic success, warning, and risk states

## Figma Deliverable

The Figma file contains:

* Cover and visual foundations
* Color palette
* Typography system
* Spacing and radius references
* Reusable component examples
* Product journey
* Desktop screens
* Responsive mobile screens
* Motion specifications
* Interaction map
* Developer handoff notes

Figma:

[https://www.figma.com/design/yqJ8L3HoZRu4GTbmVijW8R/Untitled](https://www.figma.com/design/yqJ8L3HoZRu4GTbmVijW8R/Untitled)

## Author

**Sayma Siddiqua Simu**


## License

This project was created as a frontend product-design challenge and portfolio demonstration.

````