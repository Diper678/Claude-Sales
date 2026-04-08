---
name: publish-content
description: Agenda y publica contenido en múltiples plataformas via n8n workflows coordinados
---

# Skill: Publish Content

## Trigger
"publicar", "agendar post", "distribuir contenido", "programar publicación"

## Qué hace
1. Lee calendario editorial y contenido listo
2. Coordina publicación via n8n workflows
3. Publica en plataformas configuradas
4. Registra en Convex para tracking

## Comandos
```bash
# Publicar contenido agendado para hoy
node scripts/content-cli.js distribute publish

# Agendar contenido específico
node scripts/content-cli.js distribute schedule --content=carousel-001 --date=2026-03-23 --time=10:00

# Ver cola de publicación
node scripts/content-cli.js distribute queue

# Publicar en plataforma específica
node scripts/content-cli.js distribute publish --platform=linkedin --content=post-001

# Estado de publicaciones
node scripts/content-cli.js distribute status
```

## Plataformas Soportadas
| Plataforma | Método | Workflow n8n |
|------------|--------|-------------|
| LinkedIn | API / n8n node | WF-Publish-LinkedIn |
| Instagram | Meta Graph API | WF-Publish-Instagram |
| Twitter/X | X API v2 | WF-Publish-X |
| TikTok | TikTok API | WF-Publish-TikTok |
| YouTube | YouTube Data API | WF-Publish-YouTube |
| Email | Resend | WF-Newsletter |

## Horarios Óptimos (Chile, GMT-3/-4)
- LinkedIn: 8:00-9:00 AM, 12:00-1:00 PM
- Instagram: 11:00 AM-1:00 PM, 7:00-9:00 PM
- Twitter/X: 8:00-10:00 AM, 12:00-1:00 PM
- TikTok: 7:00-9:00 PM
- YouTube: 2:00-4:00 PM

## Variables de Entorno
```
LINKEDIN_ACCESS_TOKEN=
INSTAGRAM_ACCESS_TOKEN=
X_API_KEY=
X_API_SECRET=
TIKTOK_ACCESS_TOKEN=
YOUTUBE_API_KEY=
RESEND_API_KEY=
```
