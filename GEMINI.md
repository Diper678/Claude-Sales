# GEMINI.md — [EMPRESA] Content Engine

## Proyecto
Generación y automatización de contenido para [EMPRESA].
Carruseles (Canva), videos (Remotion), posts, respuestas multicanal.
Publicación calendarizada con n8n workflows.

## Stack
Runtime: Node.js (NO Python)
Video: Remotion · Diseño: Canva API
DB: Convex (reactiva) · Workflows: n8n (Railway)
AI: Claude Sonnet (contenido) · Gemini 2.5 Flash Lite (research/scoring)
Sources: Reddit API, YouTube Data API, Firecrawl, RSS feeds
Social: LinkedIn, Instagram, Twitter/X, TikTok, YouTube
Email: Resend · Deploy: `npx vercel --prod`

## Reglas Críticas
- NUNCA inventar métricas o estadísticas
- NUNCA mencionar Claude/Gemini en contenido público
- SIEMPRE "Ley 21.719" en contexto Chile
- Sin Python — Node.js para scripts
- Content first — cada pieza genera audiencia o leads

## Módulos
1. Research: Reddit, YouTube, changelogs, Google Labs, competencia
2. Planning: calendario editorial, trend detection, scoring
3. Creation: carruseles Canva API, videos Remotion, copy
4. Distribution: n8n scheduling, multi-platform posting
5. Community: respuestas multicanal, engagement
