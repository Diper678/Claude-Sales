---
paths:
  - "workflows/**"
  - "scripts/**"
  - "n8n-workflows/**"
---

# Reglas de Workflows — Content Engine

## n8n (Motor de Distribución)
- Workflows coordinan TODA la publicación calendarizada
- Cada plataforma tiene su workflow dedicado
- Cron triggers para publicación automática

## Workflows del Content Engine
1. **WF-Research** — Absorción diaria de data (Reddit, YouTube, RSS)
2. **WF-Carousel** — Generación y agendamiento de carruseles Canva
3. **WF-Video** — Render y publicación de videos Remotion
4. **WF-Publish** — Distribución multi-plataforma coordinada
5. **WF-Community** — Monitoreo y respuesta de menciones/comentarios
6. **WF-Newsletter** — Email semanal via Resend

## Convex-n8n Integration
- HTTP actions SIEMPRE usan `.convex.site`
- NUNCA usar `/api/*` para HTTP actions desde n8n

## Reglas de Automatización
- Carruseles: generación diaria, publicación a hora óptima
- Videos: render batch semanal, publicación calendarizada
- Research: scan cada 6 horas de fuentes configuradas
- Respuestas: monitoreo continuo, respuesta < 1 hora
