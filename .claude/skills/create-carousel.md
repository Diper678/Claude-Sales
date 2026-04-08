---
name: create-carousel
description: Genera carruseles con Canva API, aplica branding [EMPRESA], y agenda publicación diaria
---

# Skill: Create Carousel

## Trigger
"crear carrusel", "canva", "carrusel para linkedin", "diseño slides"

## Qué hace
1. Toma tema del calendario editorial o input directo
2. Genera contenido de 5-10 slides
3. Crea diseño via Canva API con branding [EMPRESA]
4. Agenda publicación automática

## Comandos
```bash
# Crear carrusel desde tema
node scripts/content-cli.js create carousel --topic="Claude Code MCP plugins"

# Crear carrusel desde research
node scripts/content-cli.js create carousel --from-research=2026-03-22

# Listar carruseles pendientes
node scripts/content-cli.js create carousel --list

# Agendar carrusel
node scripts/content-cli.js create carousel --schedule="2026-03-23T10:00"
```

## Estructura de Carrusel
1. **Slide 1 (Hook):** Pregunta o dato llamativo
2. **Slides 2-8 (Valor):** Contenido educativo, paso a paso
3. **Slide 9 (Resumen):** Key takeaway
4. **Slide 10 (CTA):** Seguir, comentar, visitar [TU_DOMINIO]

## Branding
- Colores: #F8F7F5 (fondo), #111111 (texto), #c5ed36 (acento)
- Font: Sharp Grotesk (headings), Source Sans 3 (body)
- Logo [EMPRESA] en última slide
- Sin mencionar herramientas AI internas

## Variables de Entorno
```
CANVA_API_KEY=
CANVA_BRAND_TEMPLATE_ID=
```
