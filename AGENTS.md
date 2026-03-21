# AGENTS.md — {{PROJECT_NAME}}

## Overview
B2B sales automation platform for Chilean mid-market companies.
Stack: Vanilla JS + Convex + Clerk + n8n + Vercel.

## Architecture
- Frontend: Vanilla HTML/CSS/JS, GSAP animations, Lucide icons
- Backend: Convex (reactive DB + serverless functions)
- Workflows: n8n self-hosted on Railway
- Auth: Clerk with JWT template "convex"
- Deploy: Vercel (npx vercel --prod)

## Conventions
- Language: Spanish (es-CL) for all communication
- Code: English variable names, Spanish comments when needed
- Git: GSD system manages phases via .planning/
- Tests: Node.js based, no Python
- DB: Convex only — never suggest Supabase or Firebase

## Key Rules
- Privacy law is "Ley 21.719" — not just GDPR
- Never fabricate metrics or testimonials
- Never expose AI tool names in public-facing UI

## Documentation Structure (3-Tier Progressive Disclosure)
### Tier 1 — Always Loaded
- CLAUDE.md, AGENTS.md, .claude/rules/
### Tier 2 — On Demand
- .claude/skills/, .claude/agents/, .claude/commands/
### Tier 3 — Deep Reference
- docs/ (volatile), sisteco-knowledge/ (stable)
