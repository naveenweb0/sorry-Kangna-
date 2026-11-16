# Repository Guidelines

## Overview
This repository contains "For Kangna", an interactive sincere apology and personal letter web experience built using React 19, TanStack Start, Framer Motion, and Tailwind CSS v4.

## Core Rules & Architecture
- **Routing**: TanStack Start file-based routing in `src/routes/`. The root layout is `src/routes/__root.tsx`.
- **Styling**: Tailwind CSS v4 entry in `src/styles.css`. Semantic OKLCH tokens define the color system.
- **Animations**: Framer Motion for smooth motion choreographies, transitions, and gesture responses. Always support reduced-motion users (`prefers-reduced-motion`).
- **Clean Code**: Keep components modular, maintain strict TypeScript typing, and ensure no external proprietary lock-ins or hardcoded branding.
- **Quality**: Run `npm test` before committing changes to ensure no routing or UI regressions occur.
