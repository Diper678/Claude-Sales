# Reglas Generales — Sisteco

## Idioma y Comunicación
- Respuestas SIEMPRE en español (es-CL)
- Variables y código en inglés, comentarios en español cuando necesario
- Sin Python en este entorno — usar Node.js para scripts

## Git y Workflow
- Sistema de planificación: GSD (Get Shit Done)
- Deploy: `npx vercel --prod` (sin git remote en proyectos de landing)
- Commits descriptivos en español

## Preferencias de Trabajo
- Herramienta de diseño visual: Gemini 3 en Antigravity IDE
- Claude Code: lógica, APIs, CSS, HTML, arquitectura de sistemas
- Revenue first — cada acción debe acercar a un cliente pagando
- AUTONOMÍA TOTAL — no pedir permiso en tareas rutinarias, ejecutar
- NO construir agentes custom desde cero — usar plataformas existentes (n8n, Convex)

## Stack (resumen rápido)
- Frontend: HTML/CSS/JS vanilla + GSAP 3.12.7 + Lucide 0.468.0
- Backend: Vercel Serverless Functions
- DB: Convex (NO Supabase, NO Firebase)
- Auth: Clerk (Email + Google OAuth)
- Email: Resend
- Pagos: dLocal Go (API) / Reveniu
- Workflows: n8n self-hosted (Railway)
- AI: Gemini 2.5 Flash Lite (scoring) · Claude Sonnet (dev)
