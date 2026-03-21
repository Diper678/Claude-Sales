---
paths:
  - "workflows/**"
  - "scripts/**"
  - "docs/plans/**"
---

# Reglas de Workflows — Sisteco

## n8n (Producto Central)
- Sisteco = automatización como servicio. Workflows son el PRODUCTO.
- Dashboard es SECUNDARIO — foco en workflows vendibles

## Convex-n8n Integration
- HTTP actions SIEMPRE usan `.convex.site`
- NUNCA usar `/api/*` para HTTP actions desde n8n

## Lead Scoring Pipeline
- Score AI con Gemini 2.5 Flash Lite — FUNCIONAL

## Catálogo de Templates
- Ver `docs/WORKFLOW-TEMPLATES.md` (T1-T11 por plan)
- Base ($397): LinkedIn + ICP Score + SII
- Crecimiento ($797): + Sales Navigator + CRM directo
- Enterprise ($1,800): + omnicanal + data enrichment avanzado

## PhantomBuster
- LinkedIn Search ($69/mo)
- Variable: `PB_LINKEDIN_AGENT_ID`

## Reglas de Automatización
- SII enrichment en TODOS los planes
- Cliente nunca toca herramientas — solo recibe resultados
- Entregables: Sheet scored + CRM sync + alertas
