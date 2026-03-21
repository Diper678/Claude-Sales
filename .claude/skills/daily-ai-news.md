---
name: daily-ai-news
description: Search and summarize the top AI developments from the last 24 hours, focused on B2B sales pipeline, sales tools, AI commerce, and major AI company announcements. Use when the user says "noticias AI", "AI news", "daily AI", "/daily-ai-news", or asks about recent AI developments.
---

# Daily AI News Briefing — B2B Sales & Major AI

## Purpose
Deliver a prioritized daily briefing of the 5 most important AI developments, optimized for a B2B sales automation company (Sisteco).

## Execution Protocol

### Step 1: Run 3 parallel web searches

Search 1: `"AI news today [current month] [current year] OpenAI Anthropic Google Mistral ElevenLabs new model release announcement"`
Search 2: `"AI B2B sales tools pipeline CRM automation new release [current year] [current month]"`
Search 3: `"AI sales intelligence prospecting tool funding round launch [current month] [current year]"`

If any search fails (quota, timeout), fall back to WebSearch tool.

### Step 2: Run 2 follow-up searches for specifics

Search 4: Target the biggest headline from Search 1 (e.g., specific model name + details)
Search 5: `"AI startup funding round B2B sales [current month] [current year] Series seed"`

### Step 3: Synthesize into Top 5

Prioritize by this hierarchy:
1. **New model releases** (OpenAI, Anthropic, Google, Mistral, Meta, ElevenLabs)
2. **B2B sales AI tools** (CRM, prospecting, outreach, scoring, pipeline)
3. **Major funding rounds** (>$10M in sales/AI space)
4. **Platform updates** (features relevant to sales automation)
5. **Breaking announcements** (partnerships, acquisitions, policy changes)

### Step 4: Output format

```markdown
# AI Daily Briefing — [fecha en espanol]

> Enfoque: B2B Sales Pipeline + Major AI Players

## Top 5 Desarrollos

### 1. [Titulo] — [Empresa]
**Categoria:** [Model Release | Sales Tool | Funding | Platform Update | Breaking]
**Resumen:** [2-3 oraciones concisas]
**Impacto Sisteco:** [1 oracion: como afecta o se puede aprovechar para Sisteco/SAAN]
**Fuente:** [link markdown]

### 2. [Titulo] — [Empresa]
...

### 3-5. [igual formato]

---

## Radar B2B Sales AI
> Herramientas y movimientos relevantes para pipeline de ventas

| Herramienta | Novedad | Relevancia |
|-------------|---------|------------|
| [nombre]    | [que paso] | Alta/Media/Baja |

---

## Fuentes
- [Titulo](URL)
- ...
```

### Step 5: Language
Output ALWAYS in Spanish (es-CL), except for proper nouns and technical terms.

## Companies to Always Track
- **Tier 1 (always include if news):** OpenAI, Anthropic, Google/DeepMind, Meta AI, Mistral AI
- **Tier 2 (include if relevant):** ElevenLabs, Perplexity, Cohere, xAI, Stability AI
- **B2B Sales (always scan):** Apollo.io, ZoomInfo, Gong, Outreach, SalesLoft, Reply.io, Instantly.ai, Clay, Seamless.AI, HubSpot AI, Salesforce Einstein
- **Emerging (watch):** Monaco, Nooks, B2B Rocket, Persana AI, Aisdr

## Fallback
If Perplexity API is down, use WebSearch. If WebSearch fails, report what was found and suggest user check manually.
