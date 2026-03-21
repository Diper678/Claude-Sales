# CLAUDE.md — {{PROJECT_NAME}}

## Proyecto
{{PROJECT_NAME}}: [DESCRIPCIÓN DEL PROYECTO].
Sisteco: plataforma B2B SaaS de automatización de ventas para empresas medianas chilenas.
Contacto: contacto@sisteco.cl · +56 9 40065566 · Las Condes, Santiago

## Stack
Frontend: HTML/CSS/JS (vanilla) + GSAP 3.12.7 + Lucide 0.468.0
Backend: Vercel Serverless Functions
DB: Convex (reactiva) — NO Supabase, NO Firebase
Auth: Clerk (Email + Google OAuth)
Email: Resend · Pagos: dLocal Go / Reveniu
Workflows: n8n self-hosted (Railway)
AI: Gemini 2.5 Flash Lite (scoring) · Claude Sonnet (dev)
Deploy: `npx vercel --prod`

## Reglas Críticas
- NUNCA inventar testimonios, métricas o estadísticas
- NUNCA mencionar Claude/Gemini/Kimi en frontend público
- SIEMPRE "Ley 21.719" en contexto Chile (no solo GDPR)
- Respuestas en español (es-CL)
- Sin Python — usar Node.js para scripts

## GSD
Comandos: /gsd:progress, /gsd:plan-phase, /gsd:execute-phase, /gsd:resume-work

## Reglas por Contexto
@.claude/rules/general.md
@.claude/rules/frontend.md
@.claude/rules/backend.md
@.claude/rules/compliance.md
@.claude/rules/content.md
@.claude/rules/workflows.md

## Referencia
| Área | Ubicación |
|------|-----------|
| Brand/Identidad | sisteco-knowledge/empresa/ |
| Estrategia | sisteco-knowledge/estrategia/ |
| Tech stack | sisteco-knowledge/tech-stack/ |
| Guías operativas | docs/guides/ |
| Specs/Plans | docs/specs/, docs/impl-plans/ |
| Legal | docs/legal/ |
| Design System | .claude/skills/app-design.md |
