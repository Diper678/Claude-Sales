# AGENTS.md — [EMPRESA] Content Engine

## Overview
Content generation and automation platform for [EMPRESA].
Creates carousels (Canva), videos (Remotion), social posts, and multi-channel responses.
Absorbs data from Reddit, YouTube, project docs, Claude Code, and Google Labs.

## Architecture
- Runtime: Node.js (no Python)
- Video: Remotion (React-based programmatic video)
- Design: Canva API (daily scheduled carousels)
- DB: Convex (reactive, real-time)
- Workflows: n8n self-hosted on Railway
- AI: Claude Sonnet (content), Gemini Flash Lite (research scoring)
- Sources: Reddit API, YouTube Data API, Firecrawl, RSS
- Distribution: LinkedIn, Instagram, X, TikTok, YouTube, Email (Resend)

## Conventions
- Language: Spanish (es-CL) for all communication and content
- Code: English variable names, Spanish comments when needed
- Git: GSD system manages phases via .planning/
- Scripts: Node.js only (`.cjs` for CommonJS)
- DB: Convex only — never suggest Supabase or Firebase

## Key Rules
- Privacy law is "Ley 21.719" — not just GDPR
- Never fabricate metrics or testimonials
- Never expose AI tool names in public-facing content
- Content voice follows brand guidelines defined in rules/content.md
- All content must be original — never plagiarize
- AutoResearch enabled for content creation and responses

## Modules
1. **Content Research** — Reddit, YouTube, Claude Code, Google Labs, competitors
2. **Content Planning** — Editorial calendar, trend detection, content scoring
3. **Content Creation** — Carousels (Canva), videos (Remotion), posts, articles
4. **Content Distribution** — Scheduled multi-platform publishing via n8n
5. **Community Management** — Multi-channel responses (social + email)

## Documentation Structure (3-Tier Progressive Disclosure)
### Tier 1 — Always Loaded
- CLAUDE.md, AGENTS.md, .claude/rules/
### Tier 2 — On Demand
- .claude/skills/, .claude/agents/
### Tier 3 — Deep Reference
- docs/, content-templates/, calendar/
