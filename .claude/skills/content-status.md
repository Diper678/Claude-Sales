---
name: content-status
description: Dashboard del estado del Content Engine — contenido creado, pendiente, publicado, engagement
---

# Skill: Content Status

## Trigger
"estado contenido", "status", "dashboard contenido", "como va el contenido"

## Qué hace
1. Lee estado de contenido en Convex
2. Muestra resumen de producción vs publicación
3. Métricas de engagement por plataforma
4. Próximas publicaciones agendadas

## Comando
```bash
node scripts/content-cli.js status
```

## Output esperado
```
=== [EMPRESA] Content Engine — Status ===

📅 Semana 12/2026 (Mar 17-23)

Producción:
  Carruseles: 5/5 creados ✓
  Videos:     2/2 renderizados ✓
  Posts:      12/15 escritos (3 pendientes)
  Newsletter: 1/1 enviada ✓
  Artículo:   0/1 pendiente

Publicación:
  Publicados hoy: 3
  Agendados:      7
  En cola:        4

Engagement (últimos 7 días):
  LinkedIn:  1,234 impresiones | 89 likes | 12 comentarios
  Instagram: 567 reach | 45 likes
  X:         890 impresiones | 23 likes
  Email:     42% open rate | 8% click rate

Próximas publicaciones:
  2026-03-23 08:00 — Carrusel LinkedIn "Claude Code MCP"
  2026-03-23 11:00 — Reel IG "5 workflows que..."
  2026-03-23 12:00 — Post X "Google Stitch update"
```
