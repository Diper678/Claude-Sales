---
name: cli-tooling
description: >
  Skill maestra de herramientas CLI en Sisteco. Cubre las 3 capas:
  (1) sisteco-cli.js — control de n8n, leads, PhantomBuster desde terminal;
  (2) Bruno CLI (bru) — testing de APIs HTTP con colecciones .bru;
  (3) CLI-Anything — harnesses Python+Click para software sin API HTTP.
  Usar cuando el usuario quiera correr workflows, testear APIs, prospectar leads,
  o controlar cualquier herramienta desde la terminal sin abrir la UI.
triggers:
  - terminal
  - cli
  - workflow
  - correr workflow
  - n8n desde terminal
  - sisteco cli
  - prospectar desde terminal
  - testar api
  - verificar api
  - bruno
  - bru run
  - cli-anything
---

# CLI Tooling de Sisteco — Guía Maestra

> **Tres herramientas, una sola fuente de verdad.**
> Este documento es LA referencia para controlar Sisteco desde la terminal.

---

## MAPA DE DECISIÓN — ¿Qué herramienta usar?

```
¿Qué quieres hacer?
│
├── Controlar workflows n8n / prospección / leads?
│   └── → sisteco-cli.js  (Node.js, sin deps, usa API n8n + PB)
│
├── Testear / verificar que una API HTTP funciona?
│   └── → Bruno CLI (bru run)  (colecciones .bru en bruno-collections/)
│
└── Automatizar software de escritorio sin API (GIMP, Blender, LibreOffice...)?
    └── → CLI-Anything  (genera harness Python+Click para cualquier software)
```

| Criterio | `sisteco` CLI | Bruno `bru` | CLI-Anything |
|----------|--------------|-------------|--------------|
| **APIs REST de Sisteco** | ✅ vía webhooks | ✅ colecciones .bru | No aplica |
| **n8n workflows** | ✅ nativo | Solo verificar endpoints | No aplica |
| **Output JSON para agentes** | ✅ `--json` | Parcial | ✅ nativo |
| **Tests con assertions** | No (usar Bruno) | ✅ Chai assertions | ✅ pytest |
| **Software de escritorio** | No | No | ✅ nativo |
| **Git-friendly** | ✅ scripts/ | ✅ .bru files | ✅ Python modules |
| **Requiere configurar** | Solo .env | Solo .env + bru CLI | Python 3.10+ |

---

## 1. SISTECO CLI — Control de n8n y prospección

### Instalación

Ya incluido. Invocar con:
```bash
# Forma larga
node scripts/sisteco-cli.js <grupo> <accion> [flags]

# Via npm
npm run sisteco -- <grupo> <accion>
```

### Comandos principales

#### LEADS

```bash
# Ver estado del pipeline completo
node scripts/sisteco-cli.js leads status

# Lanzar prospección LinkedIn (default: ICP Chile)
node scripts/sisteco-cli.js leads prospect
node scripts/sisteco-cli.js leads prospect --url "https://linkedin.com/search/..." --count 50

# Ver estado del phantom (si terminó, cuántos perfiles, etc.)
node scripts/sisteco-cli.js leads prospect-status

# Encolar HOT leads para email sequences (dry-run para preview)
node scripts/sisteco-cli.js leads enqueue --dry-run
node scripts/sisteco-cli.js leads enqueue --min-score 75 --limit 30
node scripts/sisteco-cli.js leads enqueue --all-emails  # incluye guessed emails
```

#### WORKFLOW (n8n)

```bash
# Listar todos los workflows (con estado activo/inactivo)
node scripts/sisteco-cli.js workflow list

# Ver ejecuciones recientes
node scripts/sisteco-cli.js workflow status

# Ver ejecuciones de un workflow específico
node scripts/sisteco-cli.js workflow status <workflow-id>

# Disparar workflow por nombre corto
node scripts/sisteco-cli.js workflow run prospect      # LinkedIn scrape PB
node scripts/sisteco-cli.js workflow run enrich        # Firecrawl enrichment
node scripts/sisteco-cli.js workflow run score         # Gemini scoring
node scripts/sisteco-cli.js workflow run hot-lead      # Email sequence
node scripts/sisteco-cli.js workflow run email-sequence

# Ver logs de una ejecución específica
node scripts/sisteco-cli.js workflow logs <execution-id>
node scripts/sisteco-cli.js workflow logs <execution-id> --verbose  # detalles por nodo
```

#### WEBHOOK (disparo manual)

```bash
# POST a cualquier webhook de n8n
node scripts/sisteco-cli.js webhook fire hot-lead-enqueue
node scripts/sisteco-cli.js webhook fire lead-scoring '{"leadId":"abc123"}'
node scripts/sisteco-cli.js webhook fire saan-orchestrator '{"action":"start"}'
```

#### API (testing Bruno desde CLI)

```bash
node scripts/sisteco-cli.js api test gemini        # Test Gemini
node scripts/sisteco-cli.js api test convex        # Test Convex DB
node scripts/sisteco-cli.js api test firecrawl     # Test Firecrawl
node scripts/sisteco-cli.js api test all           # Todas las colecciones
```

### Flags globales

```
--dry-run     Mostrar qué haría sin ejecutar (safe mode)
--json        Output en JSON para scripting/pipelines
--verbose     Detalles internos (URLs, respuestas crudas)
```

### Nombres de workflow conocidos (shortcuts)

| Nombre corto | Workflow n8n | ID |
|---|---|---|
| `prospect` | SAAN Leads Discover — PhantomBuster LinkedIn | iuB6QGc885kyOfUG |
| `prospect-fc` | SAAN Leads Discover — Firecrawl Search | ZSNrDM6HrxuQoXfC |
| `enrich` | SAAN Leads Enrich — Firecrawl Scrape | ILENhV4q5NWeXNhq |
| `enrich-sii` | SAAN Leads Enrich — SII SimpleAPI | IU9b7jYbqbKS0tNn |
| `score` | SAAN Leads Score AI (Gemini) | w362fELZQEKJZ885 |
| `outreach` | SAAN Leads SDR Outreach Generator | 0GupYny80oeyAD34 |
| `hot-lead` | B2B Prospecting - Secuencia 5 Emails | AIi6a0ICfXCQnhaY |
| `lead-scoring` | Sisteco — Lead Scoring Pipeline | dLrpslRLhoIjMh6Y |
| `orchestrator` | SAAN — Orchestrator | 7HN6rtIuoktEYh0w |
| `intel` | Sisteco — Inteligencia Competitiva FireCrawl | PXKP9mIPphfY80RI |

### PREREQUISITO: Activar workflows para trigger via webhook

Los workflows están **inactivos** (`⚪`) en n8n. Para que `workflow run` funcione via webhook,
el workflow debe:
1. Tener un nodo **Webhook** (no solo Cron/Schedule)
2. Estar **activo** en n8n (`🟢`)
3. Tener el webhook path que espera el CLI

Si el workflow solo tiene nodo Cron: activarlo en n8n y correrlo manualmente desde la UI.
El CLI `workflow list` mostrará `🟢` cuando estén activos.

---

## 2. BRUNO CLI — Testing de APIs HTTP

### Referencia rápida

```bash
# Wrapper recomendado (carga .env automáticamente)
bash scripts/bru-run.sh gemini-api/
bash scripts/bru-run.sh convex-api/ development --bail
bash scripts/bru-run.sh "" development          # toda la colección

# Manual con clave explícita
GEMINI_KEY=$(grep "^GEMINI_API_KEY=" .env | head -1 | cut -d= -f2)
cd bruno-collections && bru run gemini-api/ --env development --env-var "gemini_api_key=${GEMINI_KEY}"

# Solo tests que tengan assertions
bru run --env development --tests-only

# Con reporte HTML (pre-demo checklist)
bru run --env production --reporter-html /tmp/report.html
```

### Colecciones disponibles

| Colección | Qué testea | Estado |
|-----------|-----------|--------|
| `gemini-api/` | score-lead (7 tests), enrich-company (3 tests) | ✅ 10/10 OK |
| `convex-api/` | list-leads, update-lead-score | ⚠️ Requiere JWT Clerk |
| `firecrawl-api/` | scrape-website, map-domain | ⚠️ Requiere API key activa |
| `phantombuster-api/` | launch-agent, get-results | ⚠️ Requiere PB key activa |

### Triggers para Claude (cuándo correr Bruno automáticamente)

| Situación | Acción |
|-----------|--------|
| Se modifica `api/gemini-query.js` | `bash scripts/bru-run.sh gemini-api/` |
| Se modifica endpoint Convex | `bash scripts/bru-run.sh convex-api/` |
| Se agrega nueva serverless function en `api/` | Crear `.bru` para esa función |
| Se pide "prueba este endpoint" | Usar Bruno, no curl |
| Antes de deploy a producción | `bash scripts/bru-run.sh "" production --tests-only` |

### Trampas conocidas de Bruno

```
⚠️ process.env NO fluye al CLI — siempre pasar via --env-var o usar bru-run.sh
⚠️ gemini-2.5-flash = thinking model → MAX_TOKENS con budgets pequeños
   → Usar gemini-2.5-flash-lite en colecciones Bruno
⚠️ Comentarios // entre secciones .bru = parse error en Bruno v2
   → Usar bloque docs { ... } para documentar requests
⚠️ source .env falla si el .env tiene valores con espacios (FROM_EMAIL=Sisteco <hola@>)
   → Usar grep "^KEY=" .env | head -1 | cut -d= -f2-
```

### Formato .bru (estructura estándar)

```bru
meta {
  name: Nombre descriptivo
  type: http
  seq: 1
}

post {
  url: {{base_url}}/api/endpoint
  body: json
  auth: none
}

docs {
  Documentación aquí — NO usar // entre bloques raíz
}

headers {
  Content-Type: application/json
}

body:json {
  { "campo": "{{variable}}" }
}

tests {
  test("Status 200", function() {
    expect(res.getStatus()).to.equal(200);
  });
}
```

---

## 3. CLI-ANYTHING — Harnesses para software sin API HTTP

### Cuándo usar CLI-Anything (no Bruno, no sisteco CLI)

- Software de escritorio que no tiene API REST (GIMP, Blender, Inkscape, LibreOffice)
- Herramientas de línea de comando que necesitan ser "agent-native"
- Casos donde se necesita REPL mode, undo/redo, output JSON consistente

### Plugin instalado en

```
~/.claude/plugins/cli-anything/
```

### Comandos disponibles

```bash
# Generar harness completo (7 fases automáticas)
/cli-anything <nombre>
/cli-anything /path/to/software

# Refinar harness existente
/cli-anything:refine /path/to/software
/cli-anything:refine /path/to/software "área específica"

# Correr tests del harness
/cli-anything:test <software>

# Validar calidad
/cli-anything:validate <software>
```

### Caso de uso Sisteco — LibreOffice para propuestas PDF

Si necesitáramos generar PDFs de propuestas automáticamente:
```bash
/cli-anything libreoffice
# → Genera cli-anything-libreoffice con:
#   libreoffice-cli document convert --input template.odt --output propuesta.pdf
#   libreoffice-cli document batch --input-dir templates/ --output-dir output/
```

### Stack en Sisteco: ¿cuándo aplica CLI-Anything?

**Actualmente: NO** — todas las integraciones son APIs HTTP (n8n, Convex, Gemini, PB, Firecrawl).
**Futuro:** Si integramos LibreOffice (propuestas), GIMP (assets visuales), o cualquier
software local sin API → CLI-Anything es la herramienta correcta.

---

## 4. SCRIPTS OPERACIONALES — Scripts Node.js directos

Para operaciones que no pasan por n8n, los scripts en `scripts/` son el fallback:

| Script | Uso | Cuando usar |
|--------|-----|-------------|
| `enqueue-hot-leads.js` | Encolar leads a n8n | `sisteco leads enqueue` lo llama |
| `score-leads.js` | Scoring local con Gemini | Sin n8n (offline) |
| `pb-multi-extract.js` | Extraer leads de PB output | Post-phantom manual |
| `n8n-backup.js` | Backup de workflows | `npm run n8n:backup` |
| `sheets-manager.js` | Sync con Google Sheets | Manual |
| `icp-engine.js` | Engine de scoring ICP | Base del score-leads.js |

---

## 5. FLUJO COMPLETO DE PROSPECCIÓN DESDE TERMINAL

```bash
# 1. Ver estado actual
node scripts/sisteco-cli.js leads status

# 2. Lanzar scrape LinkedIn (si hay menos de 50 leads nuevos)
node scripts/sisteco-cli.js leads prospect --count 30

# 3. Esperar ~5 min, ver si terminó
node scripts/sisteco-cli.js leads prospect-status

# 4. Ver ejecuciones recientes de n8n (enrich + score se ejecutan solos si activos)
node scripts/sisteco-cli.js workflow status

# 5. Encolar HOT leads (preview primero)
node scripts/sisteco-cli.js leads enqueue --dry-run
node scripts/sisteco-cli.js leads enqueue --min-score 70

# 6. Verificar que las APIs siguen funcionando
node scripts/sisteco-cli.js api test gemini
```

---

## 6. COLECCIONES PENDIENTES DE CREAR (Bruno)

| API | Estado | Prioridad |
|-----|--------|-----------|
| Reveniu webhooks | ❌ Pendiente | ALTA — pagos activos |
| Convex mutations (onboarding) | ❌ Pendiente | ALTA — Fase 5 |
| n8n webhooks activos | ❌ Pendiente | MEDIA |

---

*Skill actualizada: 2026-03-19 | sisteco-cli v1.0 | Bruno CLI 3.x*
