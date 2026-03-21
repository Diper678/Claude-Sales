---
name: leads-prospecting
description: >
  B2B Lead Prospecting Pipeline — LinkedIn Search (gratuito) via PhantomBuster,
  AI scoring con Gemini, outreach personalizado con Claude. Arquitectura simplificada
  de un solo source (LinkedIn = mejor fuente B2B). Usar cuando se trabaje en workflows
  de leads, scoring, outreach, PhantomBuster, o prospección B2B en general.
  NOTA: Usamos LinkedIn Search gratuito (no Sales Navigator) hasta tener clientes pagando.
triggers:
  - leads
  - prospeccion
  - prospecting
  - phantombuster
  - linkedin
  - linkedin search
  - scoring leads
  - outreach
  - SDR
  - cold email
  - b2b leads
  - lead generation
  - pipeline ventas
---

# B2B Lead Prospecting Pipeline — SAAN Leads Agent

> Pipeline simplificado: LinkedIn Search gratuito (PhantomBuster) -> Enrich (Firecrawl) -> Score (Gemini) -> Outreach (Claude)
> Una sola fuente principal (LinkedIn), maximo valor con minimo costo.
> **Estrategia:** LinkedIn Search gratuito ahora → Sales Navigator cuando tengamos clientes pagando.

---

## 1. Arquitectura

```
LinkedIn Search gratuito (PhantomBuster)    <-- UNA fuente, la mejor para B2B
         |
    Convex (dedup + CRUD)                   <-- leads + icpProfiles tables
         |
    Enrich (Firecrawl Scrape)               <-- Solo si tiene website
         |
    Score (Gemini 2.5 Flash Lite vs ICP)    <-- Barato, bulk, ICP dinamico
         |
    Outreach (Claude Sonnet)                <-- Secuencias personalizadas multi-canal
         |
    CEO Review (Discord)                    <-- HOT leads = notificacion inmediata
```

### Por que LinkedIn Search (gratuito, no Sales Navigator)

- LinkedIn es la fuente B2B mas actualizada y completa del mundo
- La busqueda gratuita cubre filtros basicos: cargo, ubicacion, empresa, industria
- PhantomBuster "LinkedIn Search Export" extrae perfiles de busquedas regulares
- SIN costo de suscripcion Sales Navigator ($99/mo ahorrados)
- Suficiente para MVP: validar pipeline antes de invertir en Sales Nav

### Upgrade futuro a Sales Navigator

Cuando tengamos clientes pagando, upgrade a Sales Navigator para:
- Filtros avanzados: seniority, tamano empresa exacto, anos en cargo
- Busquedas guardadas con alertas
- InMail directo a prospectos
- Mayor volumen de extraccion
- **Trigger de upgrade:** 3+ clientes pagando O tasa de conversion < 2%

### Por que NO multi-fuente (por ahora)

- Firecrawl Search = resultados genericos de web abierta, baja calidad para leads
- ScrapingBee directorios = datos desactualizados, formatos inconsistentes
- Multi-fuente agrega complejidad sin agregar calidad proporcional
- LinkedIn cubre >90% de las necesidades B2B para Chile

---

## 2. PhantomBuster — LinkedIn Search (gratuito)

### Setup requerido

1. **Cuenta PhantomBuster** — Plan Starter ($69/mo, ~3000 leads/mo)
2. **Cuenta LinkedIn** — Gratuita (NO requiere Sales Navigator)
3. **Cookie de LinkedIn** — PhantomBuster necesita la session cookie (li_at)
4. **Phantom a usar:** "LinkedIn Search Export" (ID: 510547627503326)

### Credenciales actuales

```
PHANTOMBUSTER_API_KEY=4g2SqzX1xS45348lUTaaRYhF87uLc8o64HObs4QhJRA
PB_LINKEDIN_AGENT_ID=510547627503326
```

### Variables de entorno (n8n)

```
PHANTOMBUSTER_API_KEY=<api_key>
PB_LINKEDIN_AGENT_ID=<phantom_agent_id>
LINKEDIN_COOKIE=<li_at_cookie>
```

### API PhantomBuster

```
# Lanzar phantom
POST https://api.phantombuster.com/api/v2/agents/launch
Headers: { "X-Phantombuster-Key": "<PB_API_KEY>" }
Body: {
  "id": "<agent_id>",
  "argument": {
    "searchUrl": "<linkedin_search_url>",
    "numberOfProfiles": 25,
    "extractDefaultUrl": true
  }
}

# Obtener resultados
GET https://api.phantombuster.com/api/v2/agents/fetch-output?id=<agent_id>
Headers: { "X-Phantombuster-Key": "<PB_API_KEY>" }
Response: { "status": "finished", "resultObject": "[{...profiles}]" }
```

### URL de busqueda LinkedIn (ICP Sisteco)

La busqueda gratuita de LinkedIn usa URLs como:
```
https://www.linkedin.com/search/results/people/?keywords=Director%20Comercial&geoUrn=%5B%22104621616%22%5D&origin=GLOBAL_SEARCH_HEADER
```

Filtros disponibles en busqueda gratuita:
- **Keywords:** Director Comercial, Gerente de Ventas, VP Sales, CEO, CRO, Head of Sales
- **Ubicacion:** Chile (geoUrn: 104621616)
- **Empresa actual:** Filtrar por empresa si se conoce
- **Industria:** Limitado en busqueda gratuita (complementar con SII enrichment)

> **Limitacion vs Sales Nav:** No hay filtro directo de tamano empresa ni seniority.
> Se compensa con scoring IA (Gemini) post-extraccion.

### Output esperado por perfil

```json
{
  "firstName": "Juan",
  "lastName": "Perez",
  "title": "Director Comercial",
  "companyName": "Empresa SaaS Chile",
  "companyUrl": "https://linkedin.com/company/...",
  "linkedinUrl": "https://linkedin.com/in/juan-perez",
  "location": "Santiago, Chile",
  "industry": "Technology",
  "email": "juan@empresa.cl",
  "headline": "Director Comercial | B2B Sales | SaaS"
}
```

### Frecuencia y costos

- **Ejecucion:** 3x/semana (L/Mi/Vi, 07:00 Chile)
- **Perfiles por run:** 25
- **Leads/semana:** ~75
- **Costo:** ~$1.50/semana (PhantomBuster credits)
- **Costo LinkedIn:** $0 (busqueda gratuita, sin Sales Navigator)

---

## 3. Workflow n8n: saan-leads-discover-phantombuster

### Flujo de nodos

```
Cron (L/Mi/Vi 07:00) -> Set Config -> Agent State Active
  -> Launch PhantomBuster -> Poll Status (max 10x, wait 30s)
  -> Parse LinkedIn Results -> Batch Upsert Convex
  -> Save Memory -> Agent State Idle
  [Error Handler -> Agent State Error]
```

### Nodo critico: Parse LinkedIn Results

```javascript
const output = $json.resultObject;
let profiles = [];
try {
  profiles = typeof output === 'string' ? JSON.parse(output) : output;
} catch(e) { profiles = []; }

const leads = profiles.map(p => ({
  empresa: (p.companyName || p.company || '').substring(0, 200),
  contacto: `${p.firstName || ''} ${p.lastName || ''}`.trim(),
  cargo: (p.title || p.jobTitle || '').substring(0, 200),
  email: p.email || null,
  linkedinUrl: p.linkedinUrl || p.profileUrl || null,
  websiteUrl: p.companyUrl || p.website || null,
  ubicacion: p.location || "Chile",
  industria: (p.industry || '').toLowerCase() || null,
  source: "phantombuster_linkedin",
  sourceUrl: p.linkedinUrl || null,
  score: 0,
  scoreCategory: "SKIP",
  status: "new",
})).filter(l => l.empresa && l.empresa.length >= 3);

return [{ json: { leads: leads.slice(0, 50) } }];
```

---

## 4. Enrichment — Firecrawl Scrape

### Proposito
Enriquecer leads de LinkedIn con datos del website de la empresa (descripcion, productos, stack tecnologico, tamano).

### Workflow: saan-leads-enrich

```
Cron (cada 2h) -> Get Leads to Enrich (status=new, limit 10)
  -> IF empty: skip
  -> Loop leads -> Check websiteUrl
    -> IF has URL: Firecrawl Scrape -> Parse enrichment
    -> ELSE: mark enriched with minimal data
  -> Update lead in Convex -> Summary + Memory
```

### Datos que extrae

- `descripcion` — meta description del sitio
- `productos` — servicios/productos detectados
- `stack_detectado` — tecnologias (hubspot, salesforce, sap, etc.)
- `tamano_detectado` — rango de empleados si se menciona
- `industria_detectada` — clasificacion automatica
- `has_contact_form` / `has_pricing_page` — senales de madurez

### Costo
~$0.12/dia (120 Firecrawl credits)

---

## 5. AI Scoring — Gemini 2.5 Flash Lite

### Por que Gemini para scoring (no Claude)

- **Costo:** ~$0.0002/lead (practicamente gratis vs $0.01+ con Claude)
- **Velocidad:** Flash Lite es rapido para bulk processing
- **Suficiente calidad:** scoring es una tarea estructurada, no necesita creatividad
- **Free tier:** 30 RPM gratis, suficiente para nuestro volumen

### Workflow: saan-leads-score-ai

```
Cron (cada 3h) -> Get ICP Profile (Convex) -> Get Previous Insights (memory)
  -> Get Leads to Score (status=enriched, limit 10)
  -> Loop -> Build Scoring Prompt -> Call Gemini API
  -> Parse Response -> Update Lead Score
  -> IF HOT: Create Task for CEO
  -> Save Scoring Memory -> Agent State Idle
```

### Scoring output

```json
{
  "score": 85,
  "category": "HOT",
  "reasoning": "Empresa SaaS B2B en Santiago con 120 empleados...",
  "signals": ["industria_fit", "tamano_adecuado", "decision_maker"],
  "risks": ["no_se_detecta_presupuesto"],
  "suggested_approach": "Contactar via LinkedIn con propuesta...",
  "suggested_channel": "linkedin",
  "confidence": 0.82
}
```

### Categorias

| Categoria | Score | Accion |
|-----------|-------|--------|
| HOT | 80-100 | Tarea CEO + outreach inmediato |
| WARM | 50-79 | Outreach automatico |
| NURTURE | 20-49 | Drip campaign futuro |
| SKIP | 0-19 | No contactar |

---

## 6. SDR Outreach — Claude Sonnet

### Por que Claude para outreach (no Gemini)

- **Creatividad:** outreach personalizado necesita calidad de escritura alta
- **Tono chileno:** Claude entiende mejor el tono B2B chileno
- **Multi-canal:** genera secuencias coherentes email + LinkedIn + telefono
- **Justificado:** $0.01/outreach se paga con 1 reunion agendada

### Workflow: saan-leads-sdr-outreach

```
Cron (cada 6h) -> Get Leads for Outreach (HOT/WARM, status=scored)
  -> Get ICP context -> Loop leads
  -> Build Outreach Prompt -> Call Claude API
  -> Parse Sequence -> Update Lead Status -> Create Task CEO
  -> Save Memory -> Agent State Idle
```

### Output: secuencia de 4 pasos

```json
{
  "sequence": [
    { "step": 1, "channel": "linkedin_connect", "delay_days": 0, "body": "..." },
    { "step": 2, "channel": "email", "delay_days": 2, "subject": "...", "body": "..." },
    { "step": 3, "channel": "linkedin_message", "delay_days": 5, "body": "..." },
    { "step": 4, "channel": "email", "delay_days": 8, "subject": "...", "body": "..." }
  ],
  "personalization_notes": "...",
  "estimated_response_rate": "15-20%"
}
```

---

## 7. Convex Schema

### Tabla: leads

Campos esenciales:
- Identificacion: empresa, contacto, cargo, email, telefono, linkedinUrl, websiteUrl
- Clasificacion: industria, tamano, ubicacion
- Scoring: score (0-100), scoreCategory, scoreReasoning, scoredAt
- Enrichment: enrichedData (any), enrichedAt
- Source: source ("phantombuster_linkedin"), sourceUrl
- Pipeline SDR: status, outreachStage, lastContactedAt, nextFollowUpAt
- Timestamps: discoveredAt, lastUpdatedAt

Indices: by_email, by_empresa, by_status, by_score_category, by_score, by_source

### Tabla: icpProfiles

Perfil de Cliente Ideal configurable:
- industries, minEmployees, maxEmployees, locations, companyTypes
- buyingSignals, techStackPositive, techStackNegative
- weights (industryFit, companySize, buyingIntent, contactQuality, techFit)
- targetRoles

Default ICP Sisteco: B2B Chile, 50-500 empleados, SaaS/Fintech/Servicios/Manufactura/Logistica

---

## 8. Costos operativos

| Componente | Frecuencia | Costo/mes |
|------------|-----------|-----------|
| PhantomBuster (Starter) | 3x/semana | $69 (plan) |
| LinkedIn | Continuo | $0 (busqueda gratuita) |
| Firecrawl (enrich) | Cada 2h | ~$3.60 |
| Gemini Flash Lite (score) | Cada 3h | ~$0.50 |
| Claude Sonnet (outreach) | Cada 6h | ~$6.00 |
| **Total** | | **~$79/mes** |

> Nota: Sin Sales Navigator ahorramos $99/mo. El costo fijo es solo PhantomBuster ($69).
> El costo variable AI es ~$10/mes. Con 1 cliente cerrado (~$149/mes plan Enterprise), el sistema se paga solo.
> **Upgrade:** Agregar Sales Nav ($99/mo) cuando tengamos 3+ clientes pagando.

---

## 9. Metacognicion (futuro — v2 app)

> NOTA: La metacognicion NO esta en los workflows v1. Se documenta aqui como referencia
> para el desarrollo futuro de la aplicacion Sisteco.

### Concepto

Un workflow semanal (domingos) que analiza rendimiento del pipeline:
- Cual fuente genera mas HOT leads
- Accuracy del scoring (leads HOT que realmente responden vs no)
- Costo por lead calificado por fuente
- Propuestas de mejora automaticas (ajustar queries, filtros, ICP)

### Implementacion futura

Cuando la app Sisteco tenga clientes usando el pipeline:
1. Cada cliente tendra su propio ICP configurable
2. La metacognicion analizara rendimiento por cliente
3. El sistema aprendera que industrias/cargos/tamanos convierten mejor
4. Auto-ajustara filtros de LinkedIn Sales Nav por cliente

### Por que postergar a v2

- Necesita datos reales de conversion para ser util
- Sin datos, la metacognicion "inventa" mejoras sin base
- Mejor lanzar el pipeline simple, juntar datos 2-3 meses, luego activar

---

## 10. APIs necesarias

```
# PhantomBuster
PHANTOMBUSTER_API_KEY=<key>
PB_LINKEDIN_AGENT_ID=<phantom_id>

# Firecrawl (enrichment)
FIRECRAWL_API_KEY=<key>

# Gemini (scoring)
GEMINI_API_KEY=<key>

# Claude (outreach)
ANTHROPIC_API_KEY=<key>

# Convex (data layer)
CONVEX_SITE_URL=<url>
SAAN_API_SECRET=<secret>
```

---

## 11. Compliance

- **Ley 19.628** (Proteccion datos personales Chile)
- **Ley 21.719** (nueva ley de datos Chile)
- Solo datos empresariales publicos
- LinkedIn: PhantomBuster respeta rate limits, busqueda gratuita (no Sales Nav)
- Leads pueden solicitar eliminacion (CRUD: delete lead)
- No almacenar datos sensibles (solo nombre, cargo, email empresarial)
