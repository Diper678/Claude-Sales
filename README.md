# Claude-Sales — Framework de Ventas B2B para Claude Code

> Plantilla pública del framework de ventas y automatización que usamos en
> **Sisteco** ([sisteco.cl](https://sisteco.cl)) sobre Claude Code.
> Clónalo, rellena los placeholders y tienes un proyecto listo con skills,
> reglas y agentes para prospectar, enriquecer, calificar y contactar leads.

## Qué es esto

Un repo-plantilla que define, sobre Claude Code:

- **Skills** (`.claude/skills/`) — instrucciones reutilizables que Claude
  dispara por lenguaje natural ("prospectar", "enviar outreach", etc.)
- **Rules** (`.claude/rules/`) — reglas por contexto (general, frontend,
  backend, content, compliance, workflows)
- **Agents** (`.claude/agents/`) — agentes especializados (researcher,
  content-creator, code-reviewer, doc-auditor)
- **CLAUDE.md / AGENTS.md / GEMINI.md** — contexto del proyecto que leen
  Claude Code, Codex/GPT y Gemini CLI respectivamente
- **docs/** — estructura de documentación operativa (specs, research,
  guías, legal, audits)
- **sisteco-knowledge/** — plantilla para tu base de conocimiento de empresa

Está pensado para cualquier operación B2B que quiera correr su stack de
ventas (prospección + enrichment + scoring + outreach + content engine)
con Claude Code como cerebro.

## Capacidades cubiertas

### Ventas B2B
- Prospección LinkedIn vía PhantomBuster (`prospect`)
- Enriquecimiento de emails multi-capa (`enrich-leads`)
- Dashboard de leads y pipeline (`lead-status`)
- Outreach personalizado por tier de score (`send-outreach`)
- Operaciones, onboarding y compliance Chile (Ley 21.719)

### Content Engine
- Carruseles Canva + videos Remotion programáticos
- Research automático: Reddit, YouTube, Claude Code, Google Labs
- Calendario editorial + publicación n8n multi-plataforma
- Respuestas multicanal RRSS/email con AutoResearch

### Ingeniería con Claude Code
- 3-tier doc framework (Tier 1 siempre cargado, Tier 2 on demand, Tier 3 deep ref)
- Skills de n8n, Trigger.dev, Composio, Playwright, PostHog, NotebookLM
- Plantillas de seguridad, escalabilidad, reducción de costos
- Protocolo de auto-documentación post-tarea

## Quick start

```bash
git clone https://github.com/Diper678/Claude-Sales.git mi-proyecto
cd mi-proyecto

# 1. Instala dependencias del CLI
npm install

# 2. Copia el template de env y llena los servicios que vayas a usar
cp .env.example .env

# 3. Rellena los placeholders del template:
#    [EMPRESA], [TU_EMAIL], [TU_TELEFONO], [TU_CIUDAD],
#    [TU_DIRECCION], [TU_DOMINIO], [TU_NOMBRE], [TU_FONT_LOGO]
#    (busca en todo el repo: grep -r "\[EMPRESA\]" .)

# 4. Abre Claude Code en la carpeta y prueba
node scripts/content-cli.js status
```

Con Claude Code abierto puedes decir cosas como:

- "investigar" / "research scan" → `content-research`
- "calendario" / "planificar" → `content-plan`
- "crear carrusel" → `create-carousel`
- "publicar" / "agendar" → `publish-content`
- "prospectar" / "pipeline status" → `prospect`
- "enviar outreach top 10" → `send-outreach`
- "enriquecer emails" → `enrich-leads`

## Scripts incluidos vs placeholders

| Script | Estado | Qué hace |
|--------|--------|----------|
| `scripts/content-cli.js` | ✅ Incluido | CLI del Content Engine (research, plan, create, distribute, community) |
| `scripts/sisteco-cli.js` | ⚠️ Placeholder | CLI de ventas (leads, workflow, webhook, api) — implementar contra tu n8n + PhantomBuster + Convex |
| `scripts/enrich-emails.js` | ⚠️ Placeholder | Pipeline propio de resolución de dominios + MX |
| `scripts/pb-email-finder.js` | ⚠️ Placeholder | Wrapper sobre PhantomBuster Email Finder |
| `scripts/personalize-messages.js` | ⚠️ Placeholder | Generación de mensajes en tiers (Claude/Gemini/templates) |

Las skills en `.claude/skills/` (prospect, lead-status, enrich-leads,
send-outreach) describen el **contrato** que estos scripts deben cumplir.
Son plantillas — tú los implementas contra tu propia infraestructura.

## Estructura del repo

```
.claude/
  skills/     — Skills invocables en lenguaje natural
  rules/      — Reglas por contexto (general, frontend, backend, ...)
  agents/     — Agentes especializados (researcher, code-reviewer, ...)
  settings.json

docs/
  specs/      — Especificaciones de features
  research/   — Output de investigación
  guides/     — Guías operativas
  legal/      — Plantillas legales (RAT, EIPD, DPA, ...)
  audits/     — Auditorías
  impl-plans/ — Planes de implementación

sisteco-knowledge/   — Base de conocimiento (rellena según tu empresa)
  empresa/, estrategia/, financiero/, integraciones/,
  mcps/, operaciones/, roadmap/, tech-stack/

scripts/             — CLI (content-cli.js incluido)
src/remotion/        — Composiciones de video

CLAUDE.md   — Contexto maestro para Claude Code
AGENTS.md   — Contexto para Codex / GPT
GEMINI.md   — Contexto para Gemini CLI
.env.example
```

## Stack recomendado

| Capa | Herramienta |
|------|-------------|
| Runtime | Node.js (NO Python) |
| Video | Remotion (React programático) |
| Diseño | Canva API |
| DB | Convex (reactiva) |
| Auth | Clerk (Email + Google OAuth) |
| Workflows | n8n self-hosted |
| AI | Claude Sonnet (contenido) + Gemini 2.5 Flash Lite (scoring) |
| Sources | Reddit API, YouTube Data API, Firecrawl, RSS |
| Email | Resend |
| Deploy | `npx vercel --prod` |

## Filosofía

- **Content/sales first:** cada skill genera audiencia, leads o cierres
- **Sin agentes custom desde cero:** usar plataformas existentes (n8n, Convex)
- **Autonomía total** en tareas rutinarias
- **Nunca inventar** métricas, testimonios o estadísticas
- **Nunca exponer** nombres de herramientas AI en el frontend público
- **Siempre** referir Ley 21.719 en contexto Chile

## Licencia

MIT — úsalo, forkéalo, adáptalo. Atribución a Sisteco es bienvenida pero no
obligatoria.

## Créditos

Framework mantenido por **[Sisteco](https://sisteco.cl)** — plataforma B2B
de automatización de ventas para empresas medianas chilenas.

Contribuciones y issues: https://github.com/Diper678/Claude-Sales/issues
