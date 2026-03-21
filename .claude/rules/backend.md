---
paths:
  - "convex/**"
  - "scripts/**"
  - "api/**"
---

# Reglas Backend — Sisteco

## Convex (DB principal)
- Base de datos reactiva en la nube — NO Supabase, NO Firebase
- Regla n8n-Convex: HTTP actions usan `.convex.site`, NUNCA `/api/*`
- Schema definido en `convex/schema.ts`
- Functions: queries (read), mutations (write), actions (side effects)

## Auth
- Clerk con JWT template "convex" (aud: "convex", org_id)
- Email + Google OAuth configurados
- Credenciales en `.env` (ver `.env.example`)

## Scripts
- SIEMPRE Node.js (NO Python)
- Extensión `.cjs` para CommonJS cuando necesario

## APIs y Servicios
- n8n instance: Railway self-hosted
- PhantomBuster: LinkedIn Search ($69/mo)
- Firecrawl: web scraping
- Resend: email transaccional
- Gemini 2.5 Flash Lite: lead scoring

## Variables de Entorno
- Centralizado en `.env` por categorías: INFRA/AUTH/AI/WORKFLOWS/LEADS/EMAIL/PAGOS
- NUNCA hardcodear keys — siempre `process.env.VARIABLE`
- Template: `.env.example`
