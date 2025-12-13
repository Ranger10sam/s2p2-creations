# S2P2 Creations - AI Coding Instructions

## Project Overview
S2P2 Creations is a premium, interactive, conversion-focused agency website. It is NOT a standard job portfolio but a client-acquisition product.
The goal is "Awwwards / CSS Design Awards quality" with a focus on high-performance frontend engineering and modern motion-driven UI.

## Tech Stack & Conventions
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion (Core dependency - use for all interactions)
- **Language**: TypeScript
- **UI Components**: Custom components only. NO generic UI kits (MUI, Bootstrap, etc.).

## Architecture & Patterns
- **Directory Structure**: Standard Next.js App Router (`app/`, `components/`, `lib/`).
- **Components**:
  - Atomic design principles where applicable.
  - `components/ui`: Reusable base components (Buttons, Cards, Inputs).
  - `components/sections`: Page-specific sections (Hero, BentoGrid, FeaturedWork).
  - **Interactivity**: Every interactive element must have micro-interactions (hover, tap, focus).
- **Routing**:
  - `/`: Home (Hero, Bento Grid, Featured Work)
  - `/work`: Project gallery with filters
  - `/work/[slug]`: Detailed project case studies
  - `/services`: Service offerings
  - `/about`: Philosophy & approach
  - `/contact`: Lead generation form

## Design Philosophy
- **Aesthetic**: Minimal but bold. Dark base with vibrant accent colors (blue/cyan/violet).
- **Layout**: High whitespace, large typography, bento grids.
- **Motion**:
  - "The entire website must feel alive."
  - Use `framer-motion` for:
    - Magnetic buttons
    - Scroll-based reveals (viewport entry)
    - Page transitions
    - Hover effects (scale, glow, border)
  - **Constraint**: Animations must feel premium and intentional, never gimmicky or laggy.

## Critical Workflows
- **Development**: `npm run dev`
- **Build**: `npm run build` (Must be error-free)
- **Linting**: `npm run lint`

## Specific Implementation Rules
1. **Images**: Use `next/image` for all raster assets.
2. **Fonts**: Use `next/font` (Inter/Sans-serif + Mono for tech specs).
3. **SEO**: Metadata must be defined in `layout.tsx` and `page.tsx` files.
4. **Performance**: 
   - Lazy load heavy components.
   - Optimize animations (use `layoutId` for shared element transitions).

## Content References
- **Live Products**: Formabit, ChefBit.
- **Client Work**: Deployed Store, Declutter.
