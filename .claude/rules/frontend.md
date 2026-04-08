---
paths:
  - "**/*.html"
  - "**/*.css"
  - "shared/**"
  - "public/**"
---

# Reglas Frontend

## Identidad Visual (nunca cambiar sin razón)

| Elemento | Valor |
|----------|-------|
| Fondo | #F8F7F5 (warm white) |
| Texto | #111111 |
| Acento | #c5ed36 (lime) |
| Hover | #b3d82f |
| Borde | #e5e5e5 |
| Font heading | Sharp Grotesk |
| Font body | Source Sans 3 |
| Font logo | [TU_FONT_LOGO] |
| Iconos | Lucide 0.468.0 |

## Librerías
- Animaciones: GSAP 3.12.7 (ScrollTrigger, SplitText)
- Iconos: Lucide 0.468.0 (NO Font Awesome, NO Material Icons)
- NO frameworks CSS (NO Tailwind, NO Bootstrap)
- NO React, NO Vue — vanilla JS

## Reglas
- NUNCA mencionar Claude/Gemini/Kimi en el frontend público
- NUNCA exponer nombres de herramientas AI al usuario final
- Responsive mobile-first
- Animaciones sutiles, no excesivas
- Design system completo en `.claude/skills/app-design.md`
