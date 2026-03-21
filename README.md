# — Sisteco Sales Documentation Project

> Generado desde `sisteco-project-template`. Framework de documentación jerárquica.

## Quick Start

1. Crear repo desde este template: "Use this template" en GitHub
2. Clonar el nuevo repo
3. Ejecutar: `node scripts/init-project.js`
4. El script personaliza CLAUDE.md, AGENTS.md y configura el proyecto

## Estructura de Documentación (3-Tier Progressive Disclosure)

### Tier 1 — Siempre Cargado (auto-load al inicio de sesión)
- `CLAUDE.md` — Índice + reglas críticas (<100 líneas)
- `AGENTS.md` — Cross-tool universal (Codex, Cursor, Copilot)
- `.claude/rules/` — Reglas path-specific

### Tier 2 — Bajo Demanda
- `.claude/skills/` — Skills invocados por trigger o request
- `.claude/agents/` — Subagentes especializados
- `.claude/commands/` — Comandos CLI custom

### Tier 3 — Referencia Profunda
- `docs/` — Documentación operativa volátil
- `sisteco-knowledge/` — Conocimiento estable de empresa

## Skills Incluidos

### Operativos Sisteco
- `sisteco-finance.md` — Contabilidad, facturación, SII
- `sisteco-legal.md` — Compliance, Ley 21.719, contratos
- `sisteco-ops.md` — Operaciones, procesos, SOPs
- `sisteco-propuesta.md` — Propuestas comerciales

### Framework
- `auto-doc.md` — Protocolo auto-documentación + Obsidian sync
- `doc-framework.md` — Gestión y validación de estructura de docs

### Herramientas
- `posthog.md`, `n8n/`, `security/`, `scalability/`, `playwright-cli/`, etc.

## Comandos GSD
- `/gsd:new-project` — Iniciar proyecto
- `/gsd:progress` — Ver estado
- `/gsd:plan-phase` — Planificar fase
- `/gsd:execute-phase` — Ejecutar fase

## Contacto
Sisteco — contacto@sisteco.cl · +56 9 40065566 · Santiago, Chile
