# Content Pipeline — Publicación Diaria Automatizada

> Definido 2026-04-01. Pipeline para generar 1 carrusel/día fiel al estilo aprobado.

## Diseño de Referencia (Template Master)

- **Canva ID:** DAHFpIf5t50
- **Formato:** 1080x1350 (portrait)
- **Slides:** 8
- **Editar:** https://www.canva.com/design/DAHFpIf5t50/edit

### Estructura del Template

| Slide | Función | Contenido de referencia |
|-------|---------|------------------------|
| 1 | Hook | "¿Sabías que responder un lead en menos de 5 minutos multiplica x21 tus chances de cerrar?" |
| 2 | Dato impactante | "Un 78% de las empresas chilenas tardan más de 24 horas en responder." |
| 3 | Transición | "Cómo automatizar tu departamento de ventas al primer contacto >>>>>>>>" |
| 4 | Feature 1 | Generación de Leads — "extrae 1000 perfiles de tu mercado ideal mientras tú te encargas de vender" |
| 5 | Feature 2 | Scoring inteligente — "encontrar por ti la persona que ya quiere comprar" |
| 6 | Feature 3 | Prospección automatizada — "a menor costo que un solo empleado... volviéndose cada día más inteligente" |
| 7 | Summary | "Hecho para ti / Todo planificado / Todo inteligente / Responde por ti / No se cansa no duerme" |
| 8 | CTA | "¿Listo para automatizar? — [TU_DOMINIO]" + "Simplifica tu proceso comercial hoy mismo." |

> Versión final aprobada con feedback de socios (2026-04-01). Canva rev 40.

### Elementos Visuales Constantes

- Footer en TODAS las slides: "[EMPRESA] — B2B Sales Automation"
- Ícono S como watermark de fondo en slides sin imagen
- Fondo: #F8F7F5 / Texto: #111111 / Acento: #c5ed36
- Formato portrait 1080x1350

## Pipeline Diario

```
┌─────────────────────────────────────────────────────────┐
│                    AUTOMATIZADO                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. NotebookLM genera contenido nuevo                   │
│     - Fuentes: research diario, noticias AI/ventas,     │
│       competencia, tendencias Chile                     │
│     - Output: insights, datos, argumentos frescos       │
│                                                         │
│  2. Claude (schedule) extrae y genera guión              │
│     - Lee output de NotebookLM                          │
│     - Genera guión de 8 slides siguiendo template       │
│     - Adapta contenido nuevo a estructura fija           │
│     - Output: guión con texto por slide                 │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                    PASO HUMANO #1                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  3. [APROBADOR] aprueba el guión                             │
│     - Revisa texto, tono, datos                         │
│     - Ajusta si necesario                               │
│     - Aprueba → trigger siguiente paso                  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                    AUTOMATIZADO                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  4. Claude genera publicación en Canva                  │
│     - Usa API Canva (generate-design)                   │
│     - Prompt incluye: guión aprobado + design standard  │
│     - Assets: icon S (MAHFpDIz1UU) + logo (MAHFpOecb6Y)|
│     - Formato: instagram_post portrait                  │
│     - Fiel al template master (DAHFpIf5t50)             │
│     - Exporta como PNG 1080x1350                        │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                    PASO HUMANO #2                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  5. [APROBADOR] aprueba y publica                            │
│     - Revisa visual final en Canva                      │
│     - Ajusta en editor si necesario                     │
│     - Publica en Instagram / LinkedIn / TikTok          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Detalle por Paso

### Paso 1: NotebookLM — Generación de Contenido

**Fuentes configuradas:**
- Obsidian vault [EMPRESA] (sync via nlm-sync skill)
- Research diario de competencia y tendencias
- Transcripciones de calls de ventas (AutoResearch)
- Noticias AI/automatización/ventas B2B Chile

**Output esperado:**
- 3-5 insights/datos frescos por día
- Argumentos de venta actualizados
- Datos de mercado chileno relevantes

### Paso 2: Claude Schedule — Extracción + Guión

**Trigger:** Schedule diario (ej: 7:00 AM)
**Proceso:**
1. Lee último output de NotebookLM
2. Selecciona el insight más potente del día
3. Genera guión de 8 slides:
   - Slide 1: Hook basado en el insight (pregunta provocadora)
   - Slide 2: Dato/estadística que respalde
   - Slide 3: Transición al "cómo"
   - Slides 4-6: Features de [EMPRESA] adaptadas al contexto del insight
   - Slide 7: Summary punch (frases cortas apiladas)
   - Slide 8: CTA constante
4. Envía guión para aprobación (Telegram/Discord/email)

**Voz del copy:** Estilo [APROBADOR] — directo, conversacional, concreto. Ver carousel-design-standard.md.

### Paso 3: Aprobación Humana del Guión

**Canal:** Telegram bot / Discord #content-creator
**Acciones:**
- Aprobar → trigger paso 4
- Editar → [APROBADOR] modifica texto, re-envía
- Rechazar → se genera nuevo guión con otro insight

### Paso 4: Claude → Canva — Generación Visual

**Herramientas:**
- `mcp__plugin_marketing_canva__generate-design` (design_type: instagram_post)
- Assets precargados: MAHFpDIz1UU (icon S), MAHFpOecb6Y (logo full)
- `mcp__plugin_marketing_canva__create-design-from-candidate`
- `mcp__plugin_marketing_canva__export-design` (PNG 1080x1350)

**Prompt template:** Incluir guión aprobado + reglas de carousel-design-standard.md

### Paso 5: Aprobación Humana + Publicación

**Canal:** Mismo Telegram/Discord
**Acciones:**
- Link a Canva editor para ajustes manuales si necesario
- PNGs descargables listos para publicar
- [APROBADOR] publica manualmente (por ahora)
- Futuro: auto-publish via Buffer/Later/Meta API

## Canva Assets (permanentes en cuenta)

| Asset | ID | Uso |
|-------|-----|-----|
| Ícono S lime | MAHFpDIz1UU | Watermark fondo en todas las slides |
| Logo [EMPRESA] full | MAHFpOecb6Y | Footer slide 1 y slide 8 (CTA) |

## Archivos Relacionados

- Template visual: `carousel-design-standard.md`
- Content Engine rules: `Content Engine/.claude/rules/content-engine.md`
- Carousel skill: `Content Engine/.claude/skills/create-carousel.md`
- NLM sync skill: `/nlm-sync`
- Schedule skill: `/schedule`
