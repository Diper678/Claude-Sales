---
name: sales-pipeline
description: >
  Build, operate, and debug the Sisteco B2B lead generation pipeline.
  PhantomBuster (LinkedIn Search/Sales Nav) + Firecrawl enrichment + SII RUT enrichment (SimpleAPI)
  + Gemini AI Scoring (HOT/WARM/NURTURE/SKIP) + Discord HOT alerts + Claude outreach.
  Definitive reference for all pipeline operations.
triggers:
  - leads
  - pipeline
  - phantombuster
  - linkedin scraping
  - lead scoring
  - enrichment
  - prospecting
  - sales funnel
  - prospeccion
  - scoring leads
  - outreach
  - SDR
  - cold email
  - b2b leads
  - lead generation
  - pipeline ventas
  - firecrawl enrich
  - sii rut
  - discord hot
---

# Sisteco Sales Pipeline — Definitive Reference

> Pipeline B2B completo: LinkedIn (PhantomBuster) -> Enrich (Firecrawl + SII) -> Score (Gemini) -> Notify (Discord) -> Outreach (Claude)
> Estrategia: LinkedIn Search gratuito ahora. Sales Navigator cuando haya 3+ clientes pagando.

---

## 1. Pipeline Architecture

```
                    ┌─────────────────────────────────────┐
                    │  PhantomBuster                       │
                    │  "LinkedIn Search Export"             │
                    │  Cron: Lun/Mie/Vie 07:00 Chile       │
                    │  (0 11 * * 1,3,5 UTC)               │
                    └──────────────┬──────────────────────┘
                                   │
                            n8n Parse Results
                                   │
                    ┌──────────────▼──────────────────────┐
                    │  Convex — leads table                │
                    │  status: "new"                       │
                    │  Dedup by linkedinUrl + empresa      │
                    └──────────────┬──────────────────────┘
                                   │
                 ┌─────────────────┼─────────────────┐
                 │                                   │
    ┌────────────▼──────────┐          ┌────────────▼──────────┐
    │  Firecrawl Enrichment │          │  SII RUT Enrichment   │
    │  Scrape company site  │          │  SimpleAPI.cl          │
    │  Cron: cada 2h        │          │  Cron: cada 4h         │
    │  status: new → enriched│         │  10/month free tier    │
    └────────────┬──────────┘          └────────────┬──────────┘
                 │                                   │
                 └─────────────────┬─────────────────┘
                                   │
                    ┌──────────────▼──────────────────────┐
                    │  Gemini AI Scoring                    │
                    │  gemini-2.5-flash-lite                │
                    │  Cron: cada 3h                        │
                    │  status: enriched → scored            │
                    │  Output: HOT/WARM/NURTURE/SKIP       │
                    └──────────────┬──────────────────────┘
                                   │
                    ┌──────────────▼──────────────────────┐
                    │  Discord Webhook                      │
                    │  HOT leads → alerta inmediata         │
                    │  Cron: cada 30 min                    │
                    └──────────────┬──────────────────────┘
                                   │
                    ┌──────────────▼──────────────────────┐
                    │  Claude Outreach (futuro)             │
                    │  Secuencias personalizadas            │
                    │  LinkedIn + Email + Telefono          │
                    └──────────────────────────────────────┘
```

### Data Flow Summary

1. **Discover** — PhantomBuster extrae perfiles de LinkedIn Search (25/run, 3x/semana = ~75/semana)
2. **Store** — n8n parsea y upserta en Convex (dedup por linkedinUrl + empresa)
3. **Enrich** — Firecrawl scrape del website + SimpleAPI consulta RUT/SII
4. **Score** — Gemini evalua fit con ICP (0-100, categorias HOT/WARM/NURTURE/SKIP)
5. **Notify** — Leads HOT generan alerta Discord inmediata para el CEO
6. **Outreach** — (Futuro) Claude genera secuencias personalizadas multi-canal

---

## 2. PhantomBuster — LinkedIn Search (gratuito)

### Credenciales

```
PHANTOMBUSTER_API_KEY = 4g2SqzX1xS45348lUTaaRYhF87uLc8o64HObs4QhJRA
PB_LINKEDIN_AGENT_ID = 510547627503326
```

### Phantom Config

- **Phantom:** "LinkedIn Search Export" (script: LinkedIn Search Export.js)
- **searchType:** linkedInSearchUrl
- **category:** People
- **Chile geoUrn:** 104621616
- **connectionDegreesToScrape:** 2nd y 3rd+
- **numberOfResultsPerLaunch:** 25

### LinkedIn Search URL Format

```
https://www.linkedin.com/search/results/people/?keywords=KEYWORDS&origin=FACETED_SEARCH&geoUrn=%5B%22104621616%22%5D
```

Keywords para ICP Sisteco:
- `Director Comercial`
- `Gerente de Ventas`
- `VP Sales`
- `CEO`
- `CRO`
- `Head of Sales`
- `Gerente General`

### Safe Daily Limits

- Profile views: 150-300/day (established account)
- Searches: ~300/month (free LinkedIn)
- Profiles per run: 25 (conservative)
- Schedule: Mon/Wed/Fri during business hours
- Warm-up: Start 25% of target, increase 10-20%/week over 2-3 weeks

### API: Launch Phantom (simple — use stored config)

```bash
curl -X POST "https://api.phantombuster.com/api/v2/agents/launch" \
  -H "X-Phantombuster-Key: 4g2SqzX1xS45348lUTaaRYhF87uLc8o64HObs4QhJRA" \
  -H "Content-Type: application/json" \
  -d '{"id": "510547627503326"}'
```

**CRITICAL:** Send only `{"id": "agentId"}` to use stored config. If you override `argument`, you MUST include the full `identities` array with `identityId`, `sessionCookie`, and `userAgent`, otherwise PhantomBuster returns "sessionCookie required".

### API: Launch Phantom (with argument override — MUST include identities)

```json
{
  "id": "510547627503326",
  "argument": "{\"searchType\": \"linkedInSearchUrl\", \"linkedInSearchUrl\": \"URL_HERE\", \"numberOfResultsPerSearch\": 25, \"category\": \"People\", \"identities\": [{\"identityId\": \"ID\", \"sessionCookie\": \"LI_AT_COOKIE\", \"userAgent\": \"UA_STRING\"}]}"
}
```

### API: Fetch Results

```bash
curl "https://api.phantombuster.com/api/v2/agents/fetch-output?id=510547627503326" \
  -H "X-Phantombuster-Key: 4g2SqzX1xS45348lUTaaRYhF87uLc8o64HObs4QhJRA"
```

Response:
```json
{
  "status": "finished",
  "resultObject": "[{\"firstName\":\"Juan\",\"lastName\":\"Perez\",...}]"
}
```

### Output per Profile

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

### Cookie Refresh (most common fix)

When PhantomBuster returns "No results found":
1. Go to phantom > Setup > click **"Re-connect"**
2. Ensure you are logged into LinkedIn in the same browser with the PhantomBuster extension
3. Save. Cookie refreshes automatically.

If "Re-connect" doesn't work:
- Do manual warm-up: search, visit profiles, normal activity for 2-3 days
- Then reconnect again

### Deduplication

PhantomBuster deduplicates internally. If it says "Already retrieved all results":
- Change keywords or search URL
- Or reset phantom database (in phantom settings > Advanced > Reset)

---

## 3. Sales Navigator — Upgrade Path

**Trigger:** 3+ paying customers OR conversion rate < 2%

### Free Trial Strategy (30 days)

1. **Days 1-3:** Configure Sales Nav Search Export phantom + warm-up (50/day)
2. **Days 4-14:** Ramp to 200-500 results/day, run all key searches
3. **Days 15-25:** Enrich with Profile Scraper (80-100/day)
4. **Days 26-28:** Export all data, backup in Convex
5. **Day 29:** Cancel trial
6. **Day 30+:** Return to LinkedIn Search Export for incremental leads

After trial:
- Cancel to avoid $99/month charge
- LinkedIn warns 7 days before auto-renewal
- Account and connections unaffected
- Saved leads/lists in Sales Nav will be deleted

### Upgrade Steps (permanent)

1. Activate Sales Nav trial/subscription on LinkedIn (30-day free trial, requires credit card)
2. Install PhantomBuster **"Sales Navigator Search Export"** phantom (NEW phantom, different ID)
3. Update n8n variable `PB_LINKEDIN_AGENT_ID` to new phantom's Agent ID
4. Update `PB_LINKEDIN_SEARCH_URL` to Sales Nav URL format
5. Test the new phantom manually before activating the workflow

### Sales Nav URL Format

```
https://www.linkedin.com/sales/search/people?query=(filters:List(
  (type:REGION,values:List((id:104621616,text:Chile))),
  (type:SENIORITY_LEVEL,values:List((id:8,text:Director),(id:9,text:VP),(id:10,text:CXO))),
  (type:COMPANY_HEADCOUNT,values:List((id:D,text:51-200),(id:E,text:201-500))),
  (type:FUNCTION,values:List((id:25,text:Sales)))
))
```

### Filter Comparison

| Filter | Free LinkedIn | Sales Navigator |
|--------|---------------|-----------------|
| Keywords | Yes | Yes |
| Location/geoUrn | Yes | Yes |
| Industry | Limited | Full list |
| Company headcount | No | Yes (exact ranges) |
| Seniority level | No | Yes |
| Function | No | Yes |
| Years in position | No | Yes |
| Saved searches + alerts | No | Yes |
| InMail | No | Yes |

---

## 4. n8n Workflows

### n8n Instance

- **URL:** `sistecotest.app.n8n.cloud`

### Workflow Files

Located at: `C:/Users/Dell 5520/Documents/AgenticWorkflows/SAAN/n8n-workflows/`

| File | Function | Schedule |
|------|----------|----------|
| `saan-leads-discover-phantombuster.json` | LinkedIn discovery via PhantomBuster | Lun/Mie/Vie 07:00 Chile (cron `0 11 * * 1,3,5` UTC) |
| `saan-leads-discover-firecrawl.json` | Web discovery via Firecrawl | Diario 06:00 Chile |
| `saan-leads-enrich.json` | Firecrawl web enrichment | Cada 2 horas |
| `saan-leads-enrich-sii.json` | SII RUT enrichment (SimpleAPI) | Cada 4 horas |
| `saan-leads-score-ai.json` | Gemini AI scoring | Cada 3 horas |
| `saan-leads-notify-hot.json` | Discord HOT lead notifications | Cada 30 minutos |
| `saan-leads-sdr-outreach.json` | Claude outreach sequences (futuro) | Cada 6 horas |
| `PIPELINE-ACTIVATION.md` | Complete activation checklist | — |

Other workflows in the folder (not core pipeline):
- `saan-leads-b2b-prospecting.json` — General B2B prospecting
- `saan-leads-linkedin-scoring.json` — LinkedIn-specific scoring
- `saan-leads-skill-metacognition.json` — Weekly pipeline analysis
- `saan-orchestrator.json` — Agent orchestrator
- `saan-skill-runner.json` — Skill runner

### Activation Order

**CRITICAL:** Activate in this order to prevent unprocessed leads entering the pipeline:

1. **Enrichment first:** `saan-leads-enrich.json` + `saan-leads-enrich-sii.json` — wait 1 cycle, verify no errors
2. **Scoring:** `saan-leads-score-ai.json` — wait 1 cycle, verify no errors
3. **Notifications:** `saan-leads-notify-hot.json`
4. **Discovery last:** `saan-leads-discover-firecrawl.json`, then `saan-leads-discover-phantombuster.json`

### PhantomBuster Discovery Workflow Flow

```
Cron (L/Mi/Vi 07:00 Chile)
  → Set Config (read n8n variables)
  → Agent State Active
  → Launch PhantomBuster API
  → Poll Status (max 10x, wait 30s each)
  → Parse LinkedIn Results (JS node)
  → Batch Upsert to Convex
  → Save Memory
  → Agent State Idle
  [Error Handler → Agent State Error]
```

### Parse LinkedIn Results — JS Node

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

## 5. n8n Variables Required

Configure in **n8n > Settings > Variables**:

| Variable | Value | Description |
|----------|-------|-------------|
| `SAAN_CONVEX_SITE_URL` | `https://animated-pika-122.convex.cloud` | Convex deployment URL (no trailing slash, no `/api/call`) |
| `SAAN_API_SECRET` | *(from Convex Dashboard > Environment Variables)* | Shared secret with Convex |
| `PHANTOMBUSTER_API_KEY` | `4g2SqzX1xS45348lUTaaRYhF87uLc8o64HObs4QhJRA` | PhantomBuster API key |
| `PB_LINKEDIN_AGENT_ID` | `510547627503326` | Current phantom Agent ID |
| `PB_LINKEDIN_SEARCH_URL` | *(optional)* | Override search URL for phantom |
| `FIRECRAWL_API_KEY` | `fc-d37d27c98bfa47f7bb37911bb223b684` | Firecrawl API key |
| `SIMPLE_API_KEY` | *(from SimpleAPI.cl)* | SimpleAPI for SII RUT lookup |
| `DISCORD_WEBHOOK_URL` | *(webhook URL)* | Discord channel webhook |
| `GEMINI_API_KEY` | *(from Google AI Studio)* | Gemini API for scoring |

---

## 6. Convex Integration

### Connection Details

- **Site URL:** `https://animated-pika-122.convex.cloud`
- **Auth header:** `X-SAAN-Secret: <SAAN_API_SECRET>` (also accepts `Authorization: Bearer <token>`)
- **Endpoint pattern:** `{SITE_URL}/api/call`

### Key Functions

| Function | Type | Purpose |
|----------|------|---------|
| `leads:batchUpsertLeads` | Mutation | Insert or update multiple leads (dedup) |
| `leads:enrichLead` | Mutation | Update lead with enrichment data |
| `leads:updateLeadScore` | Mutation | Set score, scoreCategory, scoreReasoning |
| `leads:updateLeadStatus` | Mutation | Transition lead status |
| `leads:getLeadsToEnrich` | Query | Leads with status "new" (limit param) |
| `leads:getLeadsToScore` | Query | Leads with status "enriched" (limit param) |
| `leads:getLeadsByStatus` | Query | Filter leads by status |
| `leads:getLeadsStats` | Query | Pipeline statistics |
| `icpProfiles:getIcpForScoring` | Query | Get active ICP profile for Gemini |

### HTTP Call Pattern (from n8n)

```
POST https://animated-pika-122.convex.cloud/api/call
Headers:
  Content-Type: application/json
  X-SAAN-Secret: {SAAN_API_SECRET}
Body:
  {
    "path": "leads:batchUpsertLeads",
    "args": { "leads": [...] }
  }
```

**IMPORTANT:** Functions must be listed in Convex `http.ts` allowlist. If you get 403, the function is not exposed via HTTP.

---

## 7. Lead Data Schema

```typescript
// Convex leads table
{
  // Identification
  empresa: string,                    // Company name (required, min 3 chars)
  contacto: string,                   // Full name
  cargo: string,                      // Job title
  email: string | null,               // Business email
  telefono: string | null,            // Phone
  linkedinUrl: string | null,         // LinkedIn profile URL
  websiteUrl: string | null,          // Company website

  // Classification
  ubicacion: string,                  // Default "Chile"
  industria: string | null,           // Lowercase industry
  tamano: string | null,              // Company size range

  // Source
  source: "phantombuster_linkedin" | "firecrawl" | "scrapingbee",
  sourceUrl: string | null,

  // Scoring
  score: number,                      // 0-100
  scoreCategory: "HOT" | "WARM" | "NURTURE" | "SKIP",
  scoreReasoning: string | null,
  scoredAt: number | null,            // Timestamp

  // Enrichment
  enrichedData: {                     // Firecrawl + SII data blob
    // Firecrawl fields
    descripcion: string | null,       // Meta description
    productos: string | null,         // Detected products/services
    stack_detectado: string | null,   // Technologies (hubspot, salesforce, etc.)
    tamano_detectado: string | null,  // Employee range if mentioned
    industria_detectada: string | null,
    has_contact_form: boolean,
    has_pricing_page: boolean,
    // SII fields
    sii_rut: string | null,
    sii_razon_social: string | null,
    sii_giro: string | null,
    sii_domicilio: string | null,
  } | null,
  enrichedAt: number | null,

  // Pipeline / SDR
  status: "new" | "enriched" | "scored" | "outreach_queued" | "contacted",
  outreachStage: number | null,       // 1-4 sequence step
  lastContactedAt: number | null,
  nextFollowUpAt: number | null,

  // Timestamps
  discoveredAt: number,
  lastUpdatedAt: number,
}
```

### Indices

`by_email`, `by_empresa`, `by_status`, `by_score_category`, `by_score`, `by_source`

### Status Flow

```
new → enriched → scored → outreach_queued → contacted
```

---

## 8. Enrichment — Firecrawl Scrape

### Workflow: saan-leads-enrich

```
Cron (cada 2h)
  → Get Leads to Enrich (status=new, limit 10)
  → IF empty: skip
  → Loop leads → Check websiteUrl
    → IF has URL: Firecrawl Scrape → Parse enrichment
    → ELSE: mark enriched with minimal data
  → Update lead in Convex (status → enriched)
  → Summary + Memory
```

### Data Extracted

- `descripcion` — meta description del sitio
- `productos` — servicios/productos detectados
- `stack_detectado` — tecnologias (hubspot, salesforce, sap, etc.)
- `tamano_detectado` — rango de empleados si se menciona
- `industria_detectada` — clasificacion automatica
- `has_contact_form` — boolean, senal de madurez
- `has_pricing_page` — boolean, senal de madurez

### Firecrawl API Call

```bash
curl -X POST "https://api.firecrawl.dev/v1/scrape" \
  -H "Authorization: Bearer fc-d37d27c98bfa47f7bb37911bb223b684" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com", "formats": ["markdown"]}'
```

### Cost

- Free tier: 500 credits
- ~$0.12/day if exceeding (120 credits)
- ~$3.60/month at full pipeline volume

---

## 9. Enrichment — SII RUT (SimpleAPI)

### Workflow: saan-leads-enrich-sii

Uses SimpleAPI.cl to look up Chilean company data from the SII (Servicio de Impuestos Internos).

### API Call

```bash
curl "https://api.simpleapi.cl/api/sii/rut/<RUT>" \
  -H "Authorization: Bearer <SIMPLE_API_KEY>"
```

### Data Retrieved

- RUT de la empresa
- Razon social
- Actividad economica (giro)
- Fecha de inicio de actividades
- Domicilio
- Tamano (micro/pequena/mediana/grande)

### Limitations

- **Free tier:** 10 queries/month
- Workflow has built-in rate limiting via staticData
- If quota exhausted, logs error but does not fail the workflow
- **Upgrade when:** > 10 leads/month need SII data

---

## 10. AI Scoring — Gemini 2.5 Flash Lite

### Why Gemini (not Claude) for Scoring

- **Cost:** ~$0.0002/lead (vs $0.01+ with Claude)
- **Speed:** Flash Lite is fast for bulk processing
- **Quality:** Sufficient for structured scoring tasks
- **Free tier:** 30 RPM gratis, enough for our volume

### Workflow: saan-leads-score-ai

```
Cron (cada 3h)
  → Get ICP Profile (Convex icpProfiles table)
  → Get Previous Insights (memory)
  → Get Leads to Score (status=enriched, limit 10)
  → Loop leads → Build Scoring Prompt → Call Gemini API
  → Parse Response → Update Lead Score in Convex
  → IF HOT: Create Task for CEO
  → Save Scoring Memory → Agent State Idle
```

### Gemini API Call

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${GEMINI_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{"parts": [{"text": "Score this lead against our ICP..."}]}],
    "generationConfig": {"responseMimeType": "application/json"}
  }'
```

### ICP Criteria (Sisteco default)

- **Location:** Chile
- **Company size:** 50-500 employees
- **Industries:** SaaS, Fintech, Professional Services, Manufacturing, Logistics
- **Roles:** Director Comercial, Gerente de Ventas, VP Sales, CEO, CRO, Head of Sales
- **Buying signals:** CRM usage, sales team > 5, growth stage
- **Tech stack positive:** HubSpot, Salesforce, Pipedrive (indicates CRM maturity)
- **Tech stack negative:** Custom CRM (hard to displace)

### Scoring Output

```json
{
  "score": 85,
  "category": "HOT",
  "reasoning": "Empresa SaaS B2B en Santiago con 120 empleados, Director Comercial...",
  "signals": ["industria_fit", "tamano_adecuado", "decision_maker"],
  "risks": ["no_se_detecta_presupuesto"],
  "suggested_approach": "Contactar via LinkedIn con propuesta...",
  "suggested_channel": "linkedin",
  "confidence": 0.82
}
```

### Score Categories

| Category | Score Range | Action |
|----------|------------|--------|
| **HOT** | 80-100 | Discord alert + CEO task + immediate outreach |
| **WARM** | 50-79 | Automatic outreach sequence |
| **NURTURE** | 20-49 | Drip campaign (futuro) |
| **SKIP** | 0-19 | Do not contact |

### ICP Weights

```json
{
  "industryFit": 0.25,
  "companySize": 0.20,
  "buyingIntent": 0.25,
  "contactQuality": 0.15,
  "techFit": 0.15
}
```

---

## 11. Discord HOT Lead Alerts

### Workflow: saan-leads-notify-hot

Runs every 30 minutes. Checks for leads with `scoreCategory: "HOT"` and `status: "scored"`.

### Message Format

```
🔥 HOT LEAD — {contacto}
📋 {cargo} @ {empresa}
🏢 {industria} · {ubicacion}
📊 Score: {score}/100
💡 {scoreReasoning}
🔗 {linkedinUrl}
```

### Test Discord Webhook

```bash
curl -X POST "${DISCORD_WEBHOOK_URL}" \
  -H "Content-Type: application/json" \
  -d '{"content": "🔥 **HOT LEAD** — Juan Perez, Director Comercial @ Empresa SaaS Chile (Score: 92)"}'
```

---

## 12. SDR Outreach — Claude Sonnet (futuro)

### Why Claude (not Gemini) for Outreach

- **Creativity:** Personalized outreach needs high writing quality
- **Chilean tone:** Claude understands B2B Chilean tone better
- **Multi-channel:** Generates coherent sequences across email + LinkedIn + phone
- **Cost justified:** $0.01/outreach pays for itself with 1 meeting booked

### Workflow: saan-leads-sdr-outreach

```
Cron (cada 6h)
  → Get Leads for Outreach (HOT/WARM, status=scored)
  → Get ICP context
  → Loop leads → Build Outreach Prompt → Call Claude API
  → Parse Sequence → Update Lead Status (→ outreach_queued)
  → Create Task CEO
  → Save Memory → Agent State Idle
```

### Outreach Sequence (4 steps)

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

## 13. Convex Schema — icpProfiles Table

```typescript
{
  name: string,                       // "Sisteco Default ICP"
  industries: string[],               // ["saas", "fintech", "professional_services", ...]
  minEmployees: number,               // 50
  maxEmployees: number,               // 500
  locations: string[],                // ["Chile"]
  companyTypes: string[],             // ["B2B"]
  buyingSignals: string[],            // ["crm_usage", "sales_team_5plus", "growth_stage"]
  techStackPositive: string[],        // ["hubspot", "salesforce", "pipedrive"]
  techStackNegative: string[],        // ["custom_crm"]
  targetRoles: string[],             // ["Director Comercial", "Gerente Ventas", "VP Sales", "CEO", "CRO"]
  weights: {
    industryFit: number,              // 0.25
    companySize: number,              // 0.20
    buyingIntent: number,             // 0.25
    contactQuality: number,           // 0.15
    techFit: number,                  // 0.15
  }
}
```

---

## 14. Common Issues & Fixes

### PhantomBuster

| Problem | Cause | Fix |
|---------|-------|-----|
| "No results found" | Cookie `li_at` expired | Go to phantom > Setup > **Re-connect** |
| "Already retrieved all results" | Search fully scraped | Change keywords/URL or reset phantom database |
| "sessionCookie required" | API launch overrides arguments without identities | Send only `{"id": "agentId"}` without argument override |
| Phantom runs but 0 profiles | LinkedIn blocking or bad URL | Verify URL manually in browser; warm-up account 2-3 days |
| Rate limited | Too many launches | Reduce frequency; use random delays |

### Convex

| Problem | Cause | Fix |
|---------|-------|-----|
| 403 Forbidden | Function not in `http.ts` allowlist | Add function to HTTP router in Convex |
| 401 Unauthorized | Wrong auth header | Check `X-SAAN-Secret` matches Convex env var exactly |
| 400 Bad Request | Wrong argument format | Check `args` matches function schema |
| "No document found" | Lead ID doesn't exist | Verify ID; may have been deleted |

### n8n

| Problem | Cause | Fix |
|---------|-------|-----|
| Variable undefined | Not configured | n8n > Settings > Variables — configure all 9 |
| Workflow not firing | Inactive or wrong cron | Check workflow is Active; verify cron expression |
| Timeout on PhantomBuster poll | Phantom taking too long | Increase poll attempts or wait time |
| Memory issues | Large result sets | Add `.slice(0, 50)` limits to arrays |

### Firecrawl

| Problem | Cause | Fix |
|---------|-------|-----|
| 402 Payment Required | Credits exhausted | Check balance; free tier = 500 credits |
| Timeout | Site too slow | Add timeout param; skip site |
| Empty response | Site blocks scraping | Mark lead as enriched with minimal data |

### SimpleAPI (SII)

| Problem | Cause | Fix |
|---------|-------|-----|
| 429 Rate limit | 10/month free tier exceeded | Wait for reset; upgrade plan |
| No results | Invalid RUT or company not in SII | Skip; not all companies are registered |

### Discord

| Problem | Cause | Fix |
|---------|-------|-----|
| 404 Not Found | Webhook deleted | Create new webhook in Discord channel |
| 400 Bad Request | Malformed JSON | Check Content-Type header and body format |
| No message received | Wrong webhook URL | Test with curl command (see section 11) |

---

## 15. Testing Pipeline

### Test 1: Manual End-to-End

1. Go to Convex Dashboard > Data > leads
2. Insert test lead: `{status: "new", empresa: "Test Corp", websiteUrl: "https://example.com", contacto: "Test User", cargo: "CEO", source: "phantombuster_linkedin"}`
3. Wait for enrichment cycle (2h max) — verify status changes to "enriched"
4. Wait for scoring cycle (3h max) — verify score and scoreCategory appear
5. If HOT, verify Discord notification arrives

### Test 2: PhantomBuster Isolated

1. Run phantom manually from PhantomBuster Dashboard
2. Verify CSV/JSON output with LinkedIn profiles
3. Run `saan-leads-discover-phantombuster` manually in n8n
4. Verify leads appear in Convex with `source: "phantombuster_linkedin"`

### Test 3: Discord Webhook

```bash
curl -X POST "${DISCORD_WEBHOOK_URL}" \
  -H "Content-Type: application/json" \
  -d '{"content": "Pipeline test message — ignore"}'
```

### Test 4: 24-Hour Monitoring

1. Activate all workflows in correct order (see section 4)
2. Leave running for 24 hours
3. Check n8n > Executions for errors
4. Verify leads table has new entries
5. Confirm no repetitive failed executions

---

## 16. Cost Structure

| Component | Monthly Cost | Notes |
|-----------|-------------|-------|
| PhantomBuster Starter | $69 | ~3000 leads/month capacity |
| LinkedIn (regular) | $0 | Free search |
| LinkedIn Sales Nav | $99 | **Only when upgraded** |
| Firecrawl | $0 — $3.60 | Free 500 credits; ~$3.60 if exceeding |
| SimpleAPI (SII) | $0 | Free 10/month |
| Gemini Flash Lite | ~$0.50 | ~500 leads/month |
| Claude Sonnet (outreach) | ~$6.00 | When outreach is active |
| n8n Cloud | ~$20 | Starter plan |
| **Total (without Sales Nav)** | **~$90/month** | |
| **Total (with Sales Nav)** | **~$189/month** | |

> With 1 closed customer (~$149/month Enterprise plan), the pipeline pays for itself.
> PhantomBuster ($69) is the only hard fixed cost. AI costs are ~$10/month variable.

---

## 17. Schedule Summary

| Workflow | Frequency | Time (Chile) | Cron (UTC) |
|----------|-----------|-------------|------------|
| PhantomBuster Discovery | Mon/Wed/Fri | 07:00 | `0 11 * * 1,3,5` |
| Firecrawl Discovery | Daily | 06:00 | `0 10 * * *` |
| Firecrawl Enrichment | Every 2h | :00 | `0 */2 * * *` |
| SII Enrichment | Every 4h | :00 | `0 */4 * * *` |
| AI Scoring (Gemini) | Every 3h | :00 | `0 */3 * * *` |
| HOT Notifications | Every 30 min | :00, :30 | `*/30 * * * *` |
| SDR Outreach (Claude) | Every 6h | :00 | `0 */6 * * *` |

---

## 18. Compliance

- **Ley 19.628** — Proteccion de datos personales (Chile, vigente)
- **Ley 21.719** — Nueva ley de datos personales (Chile, en implementacion)
- Only public business data is collected (name, title, company, business email)
- LinkedIn: PhantomBuster respects rate limits; free search only (no API abuse)
- Leads can request deletion (Convex CRUD: delete lead mutation)
- No sensitive data stored (no personal IDs, no financial data)
- Data retention: review and purge SKIP leads older than 90 days

---

## 19. Metacognition (futuro — v2)

Weekly workflow (Sundays) that analyzes pipeline performance:
- Which keywords generate most HOT leads
- Scoring accuracy (HOT leads that actually respond vs. those that don't)
- Cost per qualified lead by source
- Auto-suggestions: adjust queries, filters, ICP weights

**Postponed until:** We have 2-3 months of real conversion data. Without data, metacognition "invents" improvements without basis.

---

## 20. Quick Reference — All API Endpoints

```bash
# PhantomBuster — Launch
POST https://api.phantombuster.com/api/v2/agents/launch
Header: X-Phantombuster-Key: <PB_API_KEY>
Body: {"id": "<agent_id>"}

# PhantomBuster — Fetch Output
GET https://api.phantombuster.com/api/v2/agents/fetch-output?id=<agent_id>
Header: X-Phantombuster-Key: <PB_API_KEY>

# Convex — Call Function
POST https://animated-pika-122.convex.cloud/api/call
Header: X-SAAN-Secret: <secret>
Header: Content-Type: application/json
Body: {"path": "leads:batchUpsertLeads", "args": {"leads": [...]}}

# Firecrawl — Scrape
POST https://api.firecrawl.dev/v1/scrape
Header: Authorization: Bearer <FIRECRAWL_KEY>
Body: {"url": "https://example.com", "formats": ["markdown"]}

# Gemini — Generate Content
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=<GEMINI_KEY>
Header: Content-Type: application/json
Body: {"contents": [{"parts": [{"text": "..."}]}], "generationConfig": {"responseMimeType": "application/json"}}

# Discord — Send Message
POST <DISCORD_WEBHOOK_URL>
Header: Content-Type: application/json
Body: {"content": "message text"}

# SimpleAPI — SII Lookup
GET https://api.simpleapi.cl/api/sii/rut/<RUT>
Header: Authorization: Bearer <SIMPLE_API_KEY>
```
