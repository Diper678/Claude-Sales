# CLAUDE.md — [EMPRESA] Content Engine

## Proyecto
[EMPRESA] Content Engine: generación y automatización de contenido para [EMPRESA].
Carruseles (Canva), videos (Remotion), posts, respuestas multicanal.
Data de Reddit, YouTube, Claude Code, Google Labs, competencia.
Publicación calendarizada con n8n workflows coordinados.
Contacto: [TU_EMAIL] · [TU_TELEFONO] · [TU_CIUDAD]

## Stack
Runtime: Node.js (NO Python)
Video: Remotion (React para video programático)
Diseño: Canva API (carruseles agendados diariamente)
DB: Convex (reactiva) — NO Supabase, NO Firebase
Workflows: n8n self-hosted (Railway)
AI: Claude Sonnet (contenido) · Gemini 2.5 Flash Lite (research/scoring)
Sources: Reddit API, YouTube Data API, Firecrawl, RSS feeds
Social: LinkedIn, Instagram, Twitter/X, TikTok, YouTube
Email: Resend (newsletter + respuestas multicanal)
Deploy: `npx vercel --prod`

## Reglas Críticas
- NUNCA inventar métricas o estadísticas
- NUNCA mencionar Claude/Gemini en contenido público
- SIEMPRE "Ley 21.719" en contexto Chile
- Respuestas en español (es-CL)
- Sin Python — usar Node.js para scripts
- Content first — cada pieza genera audiencia o leads
- AutoResearch ACTIVADO para creación de contenido

## GSD
Comandos: /gsd:progress, /gsd:plan-phase, /gsd:execute-phase, /gsd:resume-work

## Módulos

### 1. Research (absorción de data)
Reddit, YouTube, Claude Code changelogs, Google Labs, competencia

### 2. Planning (calendario editorial)
Estudio de mercado manual, pilares de contenido, trend detection, scoring

### 3. Creation (producción)
Carruseles Canva (diarios), videos Remotion, posts, artículos, scripts

### 4. Distribution (publicación)
n8n cron workflows, multi-plataforma, email newsletter

### 5. Community (respuestas)
Multicanal RRSS + email, AutoResearch para respuestas informadas

## Skills — Lenguaje Natural → CLI

| Tú dices... | Skill | Qué hace |
|-------------|-------|----------|
| "investigar" / "research" | content-research | Absorbe data de fuentes |
| "calendario" / "planificar" | content-plan | Genera calendario editorial |
| "crear carrusel" / "canva" | create-carousel | Genera carrusel Canva |
| "crear video" / "remotion" | create-video | Genera video Remotion |
| "publicar" / "agendar" | publish-content | Agenda/publica contenido |
| "responder" / "community" | community-respond | Responde RRSS/email |
| "estado" / "status" | content-status | Dashboard contenido |
| "tendencias" / "trends" | trend-scan | Escanea tendencias |

CLI: `node scripts/content-cli.js <modulo> <accion> [flags]`

## Reglas por Contexto
@.claude/rules/general.md
@.claude/rules/frontend.md
@.claude/rules/backend.md
@.claude/rules/content.md
@.claude/rules/content-engine.md
@.claude/rules/workflows.md
@.claude/rules/compliance.md

## Referencia
| Área | Ubicación |
|------|-----------|
| Skills | .claude/skills/ |
| Agentes | .claude/agents/ |
| Specs | docs/specs/ |
| Research | docs/research/ |
| Guías | docs/guides/ |
| Templates contenido | content-templates/ |
| Calendario editorial | calendar/ |
| Remotion compositions | src/remotion/ |
