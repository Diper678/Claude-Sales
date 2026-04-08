---
name: create-video
description: Genera videos programáticos con Remotion, edición automatizada, subtítulos y branding [EMPRESA]
---

# Skill: Create Video

## Trigger
"crear video", "remotion", "video corto", "render video", "editar video"

## Qué hace
1. Toma tema/script del calendario o input directo
2. Genera composición Remotion con branding
3. Renderiza video en formato apropiado (16:9 o 9:16)
4. Agrega subtítulos automáticos
5. Agenda publicación

## Comandos
```bash
# Crear video desde script
node scripts/content-cli.js create video --script="scripts/video-scripts/topic.md"

# Preview en browser
npm run remotion:preview

# Render final
npm run remotion:render

# Render vertical (Reels/Shorts/TikTok)
node scripts/content-cli.js create video --format=vertical

# Render horizontal (YouTube)
node scripts/content-cli.js create video --format=horizontal
```

## Estructura de Video
```
src/remotion/
├── index.ts              # Entry point
├── compositions/
│   ├── Carousel.tsx      # Carrusel animado
│   ├── Tutorial.tsx      # Tutorial paso a paso
│   ├── NewsUpdate.tsx    # Noticias AI/tech
│   └── Testimonial.tsx   # Caso de éxito
├── components/
│   ├── Logo.tsx
│   ├── Subtitles.tsx
│   ├── Transition.tsx
│   └── CTA.tsx
└── assets/
    ├── fonts/
    └── images/
```

## Formatos
| Tipo | Resolución | Duración | Plataforma |
|------|-----------|----------|------------|
| Reel | 1080x1920 (9:16) | 15-60s | IG, TikTok, Shorts |
| Video | 1920x1080 (16:9) | 30-180s | YouTube, LinkedIn |

## Branding
- Colores: #F8F7F5, #111111, #c5ed36
- Fuentes: Sharp Grotesk, Source Sans 3
- Intro/Outro con logo [EMPRESA]
- Subtítulos en español
