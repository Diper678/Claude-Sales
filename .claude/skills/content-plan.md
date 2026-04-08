---
name: content-plan
description: Genera y gestiona el calendario editorial basado en research, tendencias y pilares de contenido
---

# Skill: Content Plan

## Trigger
"planificar contenido", "calendario editorial", "plan semanal", "agendar contenido"

## Qué hace
1. Lee research reciente (`docs/research/`)
2. Cruza con pilares de contenido definidos
3. Genera calendario editorial (semanal o mensual)
4. Asigna formatos y plataformas a cada pieza

## Comandos
```bash
# Generar plan semanal
node scripts/content-cli.js plan generate --period=week

# Generar plan mensual
node scripts/content-cli.js plan generate --period=month

# Ver calendario actual
node scripts/content-cli.js plan view

# Mover contenido de fecha
node scripts/content-cli.js plan move --from=2026-03-23 --to=2026-03-25
```

## Pilares de Contenido
1. Flujos agénticos (30%)
2. Herramientas AI — Claude Code, Google Labs (25%)
3. Automatización B2B Chile (20%)
4. Industria y competencia (15%)
5. Tutoriales técnicos (10%)

## Cadencia
| Día | Formato | Plataforma |
|-----|---------|------------|
| Lun-Vie | Carrusel Canva | LinkedIn, IG |
| Mar/Jue | Video corto | YouTube, TikTok, IG Reels |
| Mié | Newsletter | Email (Resend) |
| Diario | 2-3 posts texto | LinkedIn, X |
| Semanal | Artículo largo | Blog |

## Output
Genera `calendar/YYYY-WNN.md` con el plan semanal detallado.
