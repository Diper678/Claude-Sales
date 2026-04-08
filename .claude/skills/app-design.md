---
name: app-design
description: >
  [EMPRESA] App Design System — guia unificada de marca, UI/UX, y patrones de diseno
  para la aplicacion B2B de ventas. Aplica identidad visual [EMPRESA], patron workspace-first
  con lenguaje natural, y componentes del dashboard. Usar cuando se diseñe o implemente
  cualquier pagina, componente, o interaccion de la aplicacion [EMPRESA].
triggers:
  - diseñar pagina
  - crear componente
  - implementar UI
  - app design
  - dashboard design
  - workspace design
  - brand guidelines
  - design system
  - ui-ux
  - colores
  - tipografia
  - layout
---

# [EMPRESA] App Design System

> Skill unificado que combina identidad de marca, sistema de diseño, patrones de UI/UX,
> y guias de implementacion para la aplicacion B2B de ventas de [EMPRESA].
> Inspirado en la metodologia de Brand Guidelines de Anthropic, adaptado a [EMPRESA].

---

## 1. Identidad de Marca

### Quien es [EMPRESA]
- **Mision:** La empresa agentica de ventas B2B
- **Posicionamiento:** Infraestructura inteligente para ventas B2B
- **Tagline:** "Menos leads, mas cierres"
- **Mercado:** Empresas medianas chilenas (50+ empleados)
- **Vision:** Agentes autonomos que manejan ciclos de venta completos

### Voz y Tono
- Tecnico pero cercano
- Orientado a resultados con metricas concretas
- Confiable, eficiente, directo
- Español (es-CL), tuteo profesional
- Verbos de accion, sin relleno

### Reglas de contenido
- NUNCA inventar testimonios, metricas o estadisticas
- NUNCA mencionar Claude/Gemini en el frontend publico
- SIEMPRE usar "Ley 21.719" en contexto legal Chile
- Metricas verificadas permitidas: 5-7x conversiones, 21x respondiendo <5min, 78% primer vendedor, 391% ROI, 89% retencion omnicanal

---

## 2. Paleta de Colores

### Colores Base (Light Theme)

| Token              | Valor      | Uso                                    |
|--------------------|------------|----------------------------------------|
| `--bg-primary`     | `#F8F7F5`  | Fondo principal (warm white)           |
| `--bg-surface`     | `#FFFFFF`  | Cards, modales, paneles                |
| `--bg-sidebar`     | `#111111`  | Sidebar lateral (dark)                 |
| `--text-primary`   | `#111111`  | Texto principal                        |
| `--text-secondary` | `#666666`  | Texto secundario, labels               |
| `--text-muted`     | `#999999`  | Hints, placeholders                    |
| `--accent`         | `#c5ed36`  | Acento lime — CTAs, badges activos     |
| `--accent-hover`   | `#b3d82f`  | Hover del acento                       |
| `--border`         | `#e5e5e5`  | Bordes de cards, dividers              |
| `--border-subtle`  | `#f0f0f0`  | Bordes sutiles, separadores internos   |

### Colores Semanticos

| Token              | Valor      | Uso                                    |
|--------------------|------------|----------------------------------------|
| `--success`        | `#22c55e`  | Activo, completado, positivo           |
| `--warning`        | `#eab308`  | Idle, atencion, pendiente              |
| `--error`          | `#ef4444`  | Error, critico, eliminacion            |
| `--info`           | `#3b82f6`  | Informativo, links, email steps        |

### Colores de Charts y Datos

| Token              | Valor      | Pipeline/Charts                        |
|--------------------|------------|----------------------------------------|
| `--chart-blue`     | `#3b82f6`  | Prospectos, canal email                |
| `--chart-orange`   | `#f59e0b`  | Contactados, canal LinkedIn            |
| `--chart-purple`   | `#a855f7`  | Negociacion, canal WhatsApp            |
| `--chart-green`    | `#22c55e`  | Cerrados, canal directo                |

### Reglas de Color
- El lime `#c5ed36` es SOLO para CTAs primarios, badges activos, y acentos — nunca como fondo extenso
- Sidebar SIEMPRE dark `#111111` con texto `#FFFFFF` y acento lime
- Cards sobre `#F8F7F5` usan `#FFFFFF` con border `#e5e5e5`
- No usar negro puro `#000000` — siempre `#111111`
- Glassmorphism: `rgba(255,255,255,0.85)` + `backdrop-filter: blur(12px)`

---

## 3. Tipografia

### Familias

| Rol       | Fuente          | Fallback            | Peso              | Uso                      |
|-----------|-----------------|---------------------|--------------------|--------------------------|
| Headings  | Sharp Grotesk   | system-ui, sans-serif | Medium, SemiBold, Bold | H1-H6, titulos de seccion |
| Body      | Source Sans 3   | system-ui, sans-serif | 400, 600           | Parrafos, labels, UI      |
| Logo      | Nasalization    | —                   | Regular            | SOLO wordmark "[EMPRESA]"   |
| Mono      | JetBrains Mono  | monospace           | 400                | Codigo, IDs, datos raw    |

### Escala Tipografica

```css
--text-xs:   0.75rem;   /* 12px — captions, timestamps */
--text-sm:   0.875rem;  /* 14px — labels, secondary text */
--text-base: 1rem;      /* 16px — body text, UI elements */
--text-lg:   1.125rem;  /* 18px — subtitulos, emphasis */
--text-xl:   1.25rem;   /* 20px — section headers */
--text-2xl:  1.5rem;    /* 24px — page titles */
--text-3xl:  1.875rem;  /* 30px — hero titles */
--text-4xl:  2.25rem;   /* 36px — KPI numbers grandes */
```

### Reglas de Tipografia
- Sharp Grotesk SOLO para headings — nunca en body text
- Nasalization SOLO para el wordmark "[EMPRESA]" en sidebar/header
- Source Sans 3 es el workhorse — todo lo que no sea heading o logo
- Line-height: 1.5 para body, 1.2 para headings
- Letter-spacing: -0.02em en headings grandes (2xl+)

---

## 4. Espaciado y Layout

### Tokens de Espaciado

```css
--space-xs:  4px;
--space-sm:  8px;
--space-md:  16px;
--space-lg:  24px;
--space-xl:  32px;
--space-2xl: 48px;
--space-3xl: 64px;
```

### Border Radius

```css
--radius-sm:   8px;    /* Inputs, badges pequeños */
--radius-md:   12px;   /* Cards, buttons */
--radius-lg:   16px;   /* Modales, panels */
--radius-xl:   24px;   /* Hero cards, containers grandes */
--radius-pill: 9999px; /* Pills, tags, toggle buttons */
```

### Layout Principal

```
┌─────────────────────────────────────────────────────┐
│ Sidebar (240px, fixed, dark)                        │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Logo (icon + Nasalization)                      │ │
│ │ Nav items (8 links con Lucide icons)            │ │
│ │ User footer (avatar + nombre + rol)             │ │
│ └─────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────┤
│ Main Content (flex: 1, margin-left: 240px)          │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Topbar (72px, glassmorphism, sticky)            │ │
│ │ — Titulo + subtitulo                            │ │
│ │ — Actions (period selector, refresh, notifs)    │ │
│ ├─────────────────────────────────────────────────┤ │
│ │ Content Area (padding: 32px)                    │ │
│ │ — Varia segun pagina                            │ │
│ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### Breakpoints Responsive

```css
/* Desktop wide */   @media (min-width: 1200px) { /* grid 3-4 cols */ }
/* Desktop */        @media (min-width: 1024px) { /* grid 2-3 cols */ }
/* Tablet */         @media (max-width: 1024px) { /* grid 1-2 cols, sidebar collapse */ }
/* Mobile */         @media (max-width: 768px)  { /* 1 col, hamburger nav, 44px touch */ }
```

---

## 5. Componentes Core

### Buttons

```css
/* Primary — lime accent */
.btn-primary {
  background: var(--accent);
  color: var(--text-primary);
  border: none;
  border-radius: var(--radius-md);
  padding: 10px 24px;
  font-family: 'Source Sans 3', sans-serif;
  font-weight: 600;
  font-size: var(--text-sm);
  cursor: pointer;
  transition: background 0.2s ease;
}
.btn-primary:hover { background: var(--accent-hover); }

/* Ghost — transparent con border */
.btn-ghost {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 10px 24px;
}
.btn-ghost:hover { background: rgba(0,0,0,0.04); }

/* Icon button — cuadrado */
.btn-icon {
  width: 40px; height: 40px;
  display: flex; align-items: center; justify-content: center;
  border-radius: var(--radius-sm);
  background: transparent;
  border: 1px solid var(--border);
}
```

### Cards

```css
.card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: box-shadow 0.2s ease;
}
.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

/* KPI Card — numero grande + label */
.card-kpi {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
.card-kpi .value {
  font-family: 'Sharp Grotesk', sans-serif;
  font-size: var(--text-4xl);
  font-weight: 700;
  letter-spacing: -0.02em;
}
.card-kpi .label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}
```

### Status Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: var(--radius-pill);
  font-size: var(--text-xs);
  font-weight: 600;
}
.badge-active  { background: rgba(34,197,94,0.12); color: #16a34a; }
.badge-idle    { background: rgba(234,179,8,0.12);  color: #ca8a04; }
.badge-error   { background: rgba(239,68,68,0.12);  color: #dc2626; }
.badge-neutral { background: rgba(0,0,0,0.06);      color: #666666; }
```

### Topbar (Glassmorphism)

```css
.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 72px;
  background: rgba(248,247,245,0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  padding: 0 var(--space-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

---

## 6. Iconografia

### Sistema: Lucide Icons 0.468.0

```html
<script src="https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
```

### Mapa de Iconos por Funcion

| Funcion       | Icono Lucide      | Uso                    |
|---------------|-------------------|------------------------|
| Overview      | `layout-dashboard` | Nav sidebar            |
| Leads         | `users`           | Nav + KPI cards        |
| Pipeline      | `git-branch`      | Pipeline view          |
| Secuencias    | `mail`            | Email sequences        |
| Reportes      | `bar-chart-3`     | Charts y analytics     |
| Agentes       | `bot`             | SAAN agents            |
| Workspace     | `terminal`        | Command workspace      |
| Settings      | `settings`        | Configuracion          |
| Buscar        | `search`          | Search bar, commands   |
| Notificaciones| `bell`            | Topbar notifications   |
| Refresh       | `refresh-cw`      | Reload data            |
| Enviar        | `send`            | Submit, chat send      |
| Agregar       | `plus`            | Crear nuevo            |
| Editar        | `pencil`          | Modificar              |
| Eliminar      | `trash-2`         | Borrar con confirmacion|
| Telefono      | `phone`           | Contacto               |
| LinkedIn      | `linkedin`        | Canal LinkedIn         |
| WhatsApp      | `message-circle`  | Canal WhatsApp         |

### Reglas de Iconos
- Tamaño default: 20px en nav, 16px en inline
- Stroke-width: 1.75 (default Lucide)
- Color hereda del texto parent
- En sidebar dark: color blanco, active = lime

---

## 7. Animaciones

### Libreria: GSAP 3.12.7

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js"></script>
```

### Easing Standard
```javascript
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'; // smooth overshoot
```

### Patrones de Animacion

```javascript
// Entrada escalonada de cards/elementos
gsap.from('.card', {
  y: 24, opacity: 0,
  duration: 0.6,
  stagger: 0.08,
  ease: 'power3.out'
});

// Fade in de pagina
gsap.from('.content', {
  opacity: 0,
  duration: 0.4,
  ease: 'power2.out'
});

// KPI number count-up
gsap.from('.kpi-value', {
  textContent: 0,
  duration: 1.2,
  snap: { textContent: 1 },
  ease: 'power2.out'
});

// Panel slide-in (right panel)
gsap.from('.panel', {
  x: 320, opacity: 0,
  duration: 0.5,
  ease: 'power3.out'
});
```

### Reglas de Animacion
- Duracion: 0.3-0.6s para UI, 0.8-1.2s para datos/charts
- Stagger: 0.06-0.1s entre items
- NO animar en `prefers-reduced-motion: reduce`
- Usar `will-change` solo en elementos que realmente se animan
- Page transitions: opacity fade 0.3s

---

## 8. Patron Workspace-First (Cowork-Inspired)

### Filosofia
La pagina principal de la app es el **Workspace** — un chat/command bar donde el usuario
interactua con lenguaje natural para manejar su pipeline de ventas. Las paginas
tradicionales (Overview, Leads, Reports) existen como vistas complementarias,
pero la interaccion principal es conversacional.

### Layout del Workspace

```
┌──────────────────────────────────────────────────────────┐
│ Sidebar │ Topbar: "Workspace" + date                     │
│         ├────────────────────────────────────┬────────────┤
│         │ Main Area                          │ Right Panel│
│         │                                    │ (320px,    │
│         │ ┌──────────────────────────────┐   │ collapsible│
│         │ │ Quick Actions Grid (3x2)     │   │            │
│         │ │ [Nuevo Lead] [Ver Pipeline]  │   │ • Agente   │
│         │ │ [Activar Agente] [Reporte]   │   │   Activo   │
│         │ │ [Buscar Empresa] [Secuencia] │   │ • Ultimo   │
│         │ └──────────────────────────────┘   │   Lead     │
│         │                                    │ • Metricas │
│         │ ┌──────────────────────────────┐   │   Rapidas  │
│         │ │ Command Bar                  │   │ • Acciones │
│         │ │ > Escribe un comando o       │   │   Sugeridas│
│         │ │   pregunta...                │   │            │
│         │ │                         [⏎]  │   │            │
│         │ └──────────────────────────────┘   │            │
│         │                                    │            │
│         │ Actividad Reciente                 │            │
│         │ • Lead scoring completado...       │            │
│         │ • Secuencia activada...             │            │
│         └────────────────────────────────────┴────────────┘
```

### Command Bar — El Corazon de la App

```html
<div class="command-bar">
  <div class="command-input-wrapper">
    <i data-lucide="terminal" class="command-icon"></i>
    <textarea
      placeholder="Escribe un comando, pregunta, o usa / para ver opciones..."
      rows="1"
      autofocus
    ></textarea>
    <button class="btn-send"><i data-lucide="send"></i></button>
  </div>
  <div class="command-menu" hidden>
    <!-- Slash commands -->
  </div>
</div>
```

### Slash Commands del Workspace

| Comando       | Accion                                    |
|---------------|-------------------------------------------|
| `/leads`      | Ver y filtrar leads del pipeline           |
| `/nuevo`      | Crear nuevo lead con datos basicos         |
| `/pipeline`   | Mostrar pipeline visual (kanban o funnel)  |
| `/agente`     | Activar/consultar agentes SAAN             |
| `/reporte`    | Generar reporte de periodo                 |
| `/secuencia`  | Crear o activar secuencia de email         |
| `/buscar`     | Buscar empresa o contacto                  |
| `/factura`    | Crear o consultar facturas                 |
| `/config`     | Abrir settings rapidos                     |

### Interaccion por Lenguaje Natural

El workspace acepta tanto comandos slash como lenguaje natural:

```
Usuario: "Muestrame los leads calientes de esta semana"
→ Filtra pipeline por score HOT + fecha esta semana

Usuario: "Crea una secuencia de 3 emails para leads del sector fintech"
→ Genera draft de secuencia con 3 steps, sector=fintech

Usuario: "Cual es mi conversion rate este mes?"
→ Muestra KPI de conversion con mini chart inline

Usuario: "Activa el agente de prospecting para LinkedIn"
→ Trigger al agente Leads via n8n webhook
```

### Quick Actions Grid
Cards de acceso rapido que ejecutan acciones comunes:

```css
.quick-actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}
.quick-action-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: var(--space-md);
}
.quick-action-card:hover {
  border-color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent);
}
```

---

## 9. Paginas de la Aplicacion

### Paginas Principales (7)

| Pagina     | Ruta               | Proposito                           | Prioridad |
|------------|---------------------|-------------------------------------|-----------|
| Workspace  | `/workspace`        | Chat + commands (pagina principal)  | Core      |
| Overview   | `/overview`         | KPIs, pipeline bar, actividad       | Core      |
| Leads      | `/leads`            | Kanban drag-drop de leads           | Core      |
| Reportes   | `/reports`          | Charts SVG, metricas, funnel        | Core      |
| Secuencias | `/sequences`        | Email sequences con step flows      | Secundaria|
| Agentes    | `/agents`           | Status de agentes SAAN              | Secundaria|
| Settings   | `/settings`         | Configuracion SPA (8 secciones)     | Secundaria|

### Principio de Minimalismo
- Workspace es la pagina default — el usuario puede hacer TODO desde ahi
- Las paginas dedicadas existen para vistas visuales detalladas (kanban, charts)
- Navegacion fluida: el Workspace puede abrir vistas inline sin cambiar de pagina
- Menos clicks = mejor — lenguaje natural reduce la necesidad de navegar

---

## 10. IA Integrada — Recomendacion de Modelo

### Para el Asistente del Workspace

El workspace necesita un modelo de IA que:
1. Entienda español (es-CL) con precision
2. Soporte tool use / function calling (para ejecutar acciones)
3. Sea rapido (respuesta <2s para UX fluida)
4. Sea economico o gratuito para escalar

### Opciones Recomendadas

| Modelo               | Costo                    | Tool Use | Español | Velocidad | Recomendacion        |
|----------------------|--------------------------|----------|---------|-----------|----------------------|
| **Gemini 2.0 Flash** | ~$0.10/1M tokens (muy bajo) | Excelente | Muy bueno | Muy rapido | **Opcion #1 — Produccion** |
| **Qwen 2.5-72B**    | Gratis via Groq/Together  | Bueno    | Bueno   | Rapido    | Opcion #2 — Zero cost |
| **Llama 3.3-70B**   | Gratis via Groq           | Bueno    | Aceptable | Muy rapido | Opcion #3 — Backup  |
| **Claude Haiku 4.5** | ~$0.25/1M input          | El mejor | Excelente | Rapido    | Premium — Mejor calidad |

### Arquitectura Recomendada

```
[Workspace UI] → [Vercel API Route] → [Gemini 2.0 Flash API]
                                        ↕ Tool Definitions
                                    [n8n Webhooks]
                                        ↕
                              [Convex DB] [Email] [LinkedIn]
```

**Stack de IA recomendado:**
- **Modelo primario:** Gemini 2.0 Flash (costo casi zero, tool use nativo, rapido)
- **Orquestacion:** LlamaIndex TS (TypeScript) como framework de agente
  - Define tools que mapean a acciones del CRM
  - Mantiene contexto de conversacion
  - Ejecuta function calls contra n8n webhooks y Convex
- **Fallback:** Si Gemini falla, rotar a Qwen 2.5 via Together AI
- **Voice input:** Web Speech API (gratis, nativo del browser) → texto → modelo

### Ejemplo de Tool Definitions

```typescript
// LlamaIndex tools para el workspace agent
const tools = [
  {
    name: "search_leads",
    description: "Buscar leads por nombre, empresa, score o estado",
    parameters: { query: "string", filters: "object" }
  },
  {
    name: "create_lead",
    description: "Crear un nuevo lead con datos basicos",
    parameters: { name: "string", company: "string", email: "string" }
  },
  {
    name: "get_pipeline_stats",
    description: "Obtener estadisticas del pipeline de ventas",
    parameters: { period: "string" }
  },
  {
    name: "activate_agent",
    description: "Activar un agente SAAN especifico",
    parameters: { agent: "string", config: "object" }
  },
  {
    name: "create_sequence",
    description: "Crear secuencia de email automatizada",
    parameters: { name: "string", steps: "array", target: "string" }
  },
  {
    name: "generate_report",
    description: "Generar reporte de ventas para un periodo",
    parameters: { type: "string", period: "string" }
  }
];
```

---

## 11. Patrones de Diseño Visual

### Estilo General: Modern Minimal + Functional

Inspiraciones directas:
- **Cowork (Claude):** Workspace conversacional, command-first, panel lateral
- **Linear:** Tipografia limpia, animaciones sutiles, densidad de informacion
- **Apollo.io:** Dashboard de ventas, KPIs, pipeline visualization
- **Notion:** Slash commands, bloques de contenido, minimalismo

### Do's
- Usar espaciado generoso (no tener miedo del whitespace)
- Cards con bordes sutiles, no shadows agresivos
- Animaciones de entrada suaves (GSAP power3.out)
- Tipografia como elemento de diseño (Sharp Grotesk en KPIs grandes)
- Lime accent con moderacion — maximo 2-3 elementos por viewport
- SVG para charts (no librerias pesadas como Chart.js)
- Grid pattern sutil de fondo (24px, 4% opacity)

### Don'ts
- No usar gradientes de color (excepto glassmorphism blur)
- No usar sombras duras (max: `0 4px 12px rgba(0,0,0,0.06)`)
- No saturar con colores — la paleta es neutral con pops de lime
- No usar iconos de mas de una libreria (solo Lucide)
- No romper la jerarquia tipografica (Sharp Grotesk solo headings)
- No agregar paginas innecesarias — el Workspace maneja la mayoria

### Ejemplo: Dark Card (para Agentes)

```css
.agent-card {
  background: #111111;
  border: 1px solid rgba(197,237,54,0.15);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  color: #FFFFFF;
}
.agent-card .status-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--success);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## 12. Assets y Dependencias

### Fonts Locales (en `assets/fonts/`)
- `SharpGrotesk-Medium20.otf`
- `SharpGrotesk-SemiBold20.otf`
- `SharpGrotesk-Bold20.otf`
- `Nasalization-Rg.otf`

### CDN
```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">

<!-- Lucide Icons -->
<script src="https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js"></script>

<!-- GSAP -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js"></script>
```

### Favicon y Logo
- `assets/sisteco-icon.png` — icono 32x32 para favicon + sidebar
- Wordmark "[EMPRESA]" renderizado con Nasalization en sidebar

---

## 13. Checklist de Implementacion

Al crear o modificar cualquier pagina de la app, verificar:

- [ ] Usa la paleta de colores definida (tokens CSS)
- [ ] Sharp Grotesk solo en headings, Source Sans 3 en body
- [ ] Sidebar dark con nav items + Lucide icons
- [ ] Topbar glassmorphism con titulo de pagina
- [ ] Cards con border-radius 16px y border sutil
- [ ] Animaciones GSAP en entrada (stagger 0.08s)
- [ ] Responsive: funciona en 768px y 1024px breakpoints
- [ ] Lucide icons con createIcons() al final del script
- [ ] Lime accent usado con moderacion (max 2-3 por vista)
- [ ] Accesibilidad: semantic HTML, focus states, aria labels
- [ ] Sin librerias CSS externas (todo vanilla CSS)
- [ ] Sin frameworks JS (vanilla JS + GSAP)

---

---

## 14. Inspiraciones de Apps Reales (Research 2026-03-06)

> Investigacion directa de las interfaces de 4 aplicaciones de referencia.
> Documentos completos en `sisteco-knowledge/investigacion/`.

### 14.1 Claude (claude.ai) — Chat + Artifacts

**Lo que tomamos:**
- Fondo calido `#FAF9F5` (casi identico a nuestro `#F8F7F5`) — CONFIRMADO que funciona
- Flat design sin sombras, border-radius consistente ~10px
- Sidebar colapsable con jerarquia: Starred > Recents > Projects
- Input bar flotante inferior con multiples controles integrados (attach, model, send)
- Split-screen artifacts panel (~50% derecho) — inspiracion para Lead Detail Panel
- Versionado con navegacion `< v1/v3 >` — para historial de leads
- Tipografia dual: serif headings + sans body (nosotros: Sharp Grotesk + Source Sans 3)
- Botones: fondo `#141413`, texto blanco, border-radius 9.6px, SIN sombras

**Tokens de Claude adoptados:**
```css
--border-warm: #E8E6DC;     /* Bordes sutiles calidos (reemplaza #e5e5e5 en algunos contextos) */
--input-border: #D9D8D5;    /* Borde especifico para inputs */
--btn-radius: 10px;         /* Consistente con Claude ~9.6px */
```

**Patron clave:** El command bar inferior de Claude (con attach, model selector, send) es el modelo directo para nuestro Workspace command bar.

### 14.2 Notion — Slash Commands + Command Palette

**Lo que tomamos:**
- **Sistema `/` slash commands** — El patron mas importante para nuestro Workspace:
  - Popover flotante inline (bajo el cursor), ~320px ancho
  - Busqueda fuzzy en tiempo real
  - Categorias con headers (Basic, Database, Media, etc.)
  - Items: icono + nombre + descripcion corta
  - Navegacion: flechas + Enter
- **Command Palette `Cmd+K`** — Separado del slash menu:
  - Modal centrado con overlay oscuro
  - Muestra recientes antes de escribir
  - Fuzzy search en todo el workspace
  - Ruta/ubicacion de cada resultado
- **Settings layout** — Modal casi full-screen, dos paneles:
  - Sidebar izquierda: categorias (Account + Workspace)
  - Content derecho: formularios con inputs, dropdowns, toggles
- **Progressive disclosure** — Hover revela acciones (`+`, `...`, drag handle)
- **Grid de 8px** riguroso para spacing
- **Warm grays** — Texto `#373530` (no negro puro), secundario `#787774`

**Colores de referencia de Notion:**
```css
/* NO copiar — solo referencia de warm tones */
--notion-text: #373530;        /* Warm dark — considerar para texto secundario */
--notion-secondary: #787774;   /* Warm gray */
--notion-hover: #F1F1EF;       /* Hover state */
--notion-blue: #455DD3;        /* Acento azul Notion */
--notion-border: #E5E5E3;      /* Borde sutil */
```

**Patron clave:** Dos command palettes separados — `/` para crear/ejecutar (inline) y `Cmd+K` para navegar/buscar (modal). [EMPRESA] debe implementar ambos.

### 14.3 Obsidian (v1.12) — CSS Variables + Minimal Design

**Lo que tomamos:**
- **Sistema de CSS Variables por capas:**
  - Foundations: colores, tipografia, spacing, radii
  - Components: botones, inputs, modales
  - Editor/Pages: overrides especificos
- **Grid de 4px** para spacing (mas fino que Notion's 8px)
  - 4, 8, 12, 16, 20, 24, 32, 48, 64px
- **Escala de grises de 12 pasos** (base-00 a base-100):
  - Permite derivar toda la paleta de light/dark mode
  - Transiciones suaves entre niveles
- **Accent color en HSL** — permite derivar shades con `calc()`:
  ```css
  --accent-h: 76;   /* Hue de nuestro lime */
  --accent-s: 82%;  /* Saturation */
  --accent-l: 57%;  /* Lightness */
  --accent: hsl(var(--accent-h), var(--accent-s), var(--accent-l));
  ```
- **Border radius escalonado:** 4px (small) → 8px (medium) → 12px (large) → 16px (xl)
- **Inter Variable** como font UI (variable weights 100-900)
- **Corner smoothing** estilo Apple (`corner-shape` CSS property)
- **Command Palette** con fuzzy search mejorado, hotkeys visibles
- **Mobile: bottom nav** + auto-hide al scroll + floating nav
- **Settings con iconos** por seccion + agrupacion logica

**Patron clave:** El sistema de CSS variables de Obsidian (~200+ tokens) es el modelo para organizar nuestro propio design system. Adoptar la estructura foundations → components → pages.

### 14.4 Wispr Flow — Voice Input + Invisible UI

**Lo que tomamos:**
- **Filosofia "Designed to be forgotten"** — la voz es una capa invisible, no un panel prominente
- **Hold-to-speak pattern**: mantener tecla → hablar → soltar → texto procesado aparece
  - Para [EMPRESA]: `Alt+Space` o tecla configurable para dictar en el Workspace
- **Post-proceso con LLM, no streaming crudo**:
  - El audio se envia al modelo, que limpia fillers, corrige gramatica, formatea
  - El texto aparece completo y limpio — NO caracter por caracter
  - Reduce distraccion visual y genera confianza en el resultado
- **Minimal recording indicator**: solo un punto pulsante o micro-bar
  - Para [EMPRESA]: punto lime `#c5ed36` pulsante en el command bar = on-brand
- **Insercion directa en contexto**: texto aparece donde el usuario esta trabajando
  - No en un panel separado que requiera copy-paste
- **Zero chrome cuando idle**: sin UI visible salvo icono en toolbar
- **Floating bubble (mobile)**: aparece/desaparece segun contexto (campo de texto activo)

**Colores de referencia:**
```css
/* NO copiar — solo referencia de warm/soft tones */
--wispr-primary: #034F46;     /* Teal profundo */
--wispr-accent: #F0D7FF;      /* Lavanda claro */
--wispr-bg: #FFFFEB;          /* Crema calido */
```

**Patron clave:** Voice input como capa invisible con post-procesamiento LLM. El usuario habla naturalmente, la IA limpia y formatea. Cero friction, cero distraccion.

### 14.5 Sintesis: Patrones Unificados para [EMPRESA]

#### Decisiones de Diseno Consolidadas

| Decision | Valor | Fuente |
|----------|-------|--------|
| Fondo principal | `#F8F7F5` (warm white) | Claude + [EMPRESA] original |
| Texto principal | `#111111` | [EMPRESA] (Claude usa `#141413`) |
| Warm grays | Si — nunca grises frios puros | Claude + Notion + Obsidian |
| Border radius buttons | `10px` (~9.6px) | Claude |
| Border radius cards | `12-16px` | Obsidian scale |
| Sombras | Ninguna (flat) o muy sutiles max `0 4px 12px rgba(0,0,0,0.06)` | Claude + Obsidian |
| Grid spacing | `4px` base (4, 8, 12, 16, 24, 32, 48, 64) | Obsidian |
| Slash commands `/` | Popover inline, fuzzy search, categorizado | Notion |
| Command palette `Cmd+K` | Modal centrado, busqueda global, recientes | Notion + Obsidian |
| Input bar location | Bottom, flotante | Claude |
| Panel lateral derecho | Collapsible, ~320-400px | Claude artifacts |
| Settings layout | Full modal, sidebar categorias + content area | Notion |
| Progressive disclosure | Hover revela acciones | Notion |
| Mobile navigation | Bottom-aligned, auto-hide | Obsidian |
| CSS architecture | Variables por capas (foundations → components → pages) | Obsidian |
| Accent en HSL | `hsl(76, 82%, 57%)` = `#c5ed36` | Obsidian pattern |

#### Tabla de Equivalencias App → [EMPRESA]

| Componente Original | App | Equivalente [EMPRESA] |
|---------------------|-----|---------------------|
| Chat input bar | Claude | **Command bar** (bottom, con attach + agent selector + send) |
| Artifacts panel | Claude | **Lead Detail Panel** (derecho, collapsible, con historial) |
| Sidebar projects | Claude | **Sidebar campaigns/pipelines** |
| Slash command `/` | Notion | **Slash menu**: /lead, /pipeline, /agente, /reporte, /secuencia, /factura |
| Command palette Cmd+K | Notion | **Quick search**: buscar leads, empresas, agentes, paginas |
| Database views | Notion | **Pipeline views**: kanban, tabla, lista |
| CSS Variables system | Obsidian | **Design tokens** organizados por capas |
| 4px grid | Obsidian | **Spacing system** base-4 |
| Bottom mobile nav | Obsidian | **Mobile-first nav** con auto-hide |
| Settings icons | Obsidian | **Settings con iconos** Lucide por seccion |
| Inline title | Obsidian | **Lead name inline** en detail view |
| Star/Bookmark | Claude + Notion | **Pin leads** favoritos en sidebar |

---

## 15. CSS Variables Master (Actualizado con Research)

> Sistema completo de tokens CSS integrando hallazgos de Claude, Notion, y Obsidian.

```css
:root {
  /* === FOUNDATIONS: Colors === */

  /* Background scale (warm, inspirado en Claude/[EMPRESA]) */
  --bg-primary: #F8F7F5;
  --bg-surface: #FFFFFF;
  --bg-subtle: #F5F4F2;
  --bg-hover: #F0EFED;
  --bg-sidebar: #111111;
  --bg-sidebar-hover: #1a1a1a;

  /* Text scale (warm darks, inspirado en Notion/Claude) */
  --text-primary: #111111;
  --text-secondary: #666666;
  --text-muted: #999999;
  --text-placeholder: #B0AEA5;
  --text-on-dark: #FFFFFF;
  --text-on-accent: #111111;

  /* Accent — HSL para derivar shades (patron Obsidian) */
  --accent-h: 76;
  --accent-s: 82%;
  --accent-l: 57%;
  --accent: hsl(var(--accent-h), var(--accent-s), var(--accent-l));
  --accent-hover: hsl(var(--accent-h), var(--accent-s), calc(var(--accent-l) - 5%));
  --accent-subtle: hsl(var(--accent-h), var(--accent-s), 90%);
  --accent-faint: hsl(var(--accent-h), 40%, 95%);

  /* Borders (warm, inspirado en Claude) */
  --border: #e5e5e5;
  --border-warm: #E8E6DC;
  --border-subtle: #f0f0f0;
  --border-input: #D9D8D5;

  /* Semantic colors */
  --success: #22c55e;
  --warning: #eab308;
  --error: #ef4444;
  --info: #3b82f6;

  /* Chart colors */
  --chart-blue: #3b82f6;
  --chart-orange: #f59e0b;
  --chart-purple: #a855f7;
  --chart-green: #22c55e;

  /* === FOUNDATIONS: Typography === */
  --font-heading: 'Sharp Grotesk', system-ui, sans-serif;
  --font-body: 'Source Sans 3', system-ui, sans-serif;
  --font-logo: 'Nasalization', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;

  --leading-tight: 1.2;
  --leading-normal: 1.5;
  --tracking-tight: -0.02em;

  /* === FOUNDATIONS: Spacing (4px grid, Obsidian pattern) === */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;

  /* === FOUNDATIONS: Radii (Obsidian scale + Claude influence) === */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 10px;    /* Botones — Claude 9.6px */
  --radius-lg: 12px;    /* Cards */
  --radius-xl: 16px;    /* Modales, panels */
  --radius-2xl: 24px;   /* Hero containers */
  --radius-pill: 9999px;

  /* === FOUNDATIONS: Shadows (flat-first, Claude pattern) === */
  --shadow-none: none;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.06);
  --shadow-popover: 0 4px 24px rgba(0,0,0,0.12);

  /* === FOUNDATIONS: Layout === */
  --sidebar-width: 240px;
  --topbar-height: 72px;
  --panel-width: 360px;
  --content-max-width: 1200px;
  --command-menu-width: 320px;

  /* === FOUNDATIONS: Animation === */
  --ease-default: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 0.2s;
  --duration-normal: 0.3s;
  --duration-slow: 0.6s;
  --stagger: 0.08s;
}
```

---

---

## 16. Voice Input Pattern (Wispr Flow-Inspired)

> El Workspace de [EMPRESA] soporta input por voz como canal principal junto al texto.

### Activacion
```
[Command Bar]
┌─────────────────────────────────────────────────────────┐
│ [/] Escribe o habla...              [🎤] [Agent▾] [➤] │
│                                      ^^^                │
│                               Mic button / Hold Alt+Space│
└─────────────────────────────────────────────────────────┘
```

### Estados del Voice Input

| Estado | Visual | Duracion |
|--------|--------|----------|
| Idle | Icono mic gris `--text-muted` | Permanente |
| Listening | Punto lime pulsante + borde lime en command bar | Mientras habla |
| Processing | Punto lime fade in/out rapido + "Procesando..." | 0.5-2s |
| Complete | Texto aparece completo en el command bar | Instantaneo |
| Error | Punto rojo momentaneo + tooltip "Intenta de nuevo" | 2s |

### CSS del Voice Indicator
```css
.voice-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--text-muted);
  transition: all var(--duration-fast) var(--ease-default);
}

.voice-indicator.listening {
  background: var(--accent);
  animation: voice-pulse 1.5s ease-in-out infinite;
}

.voice-indicator.processing {
  background: var(--accent);
  animation: voice-process 0.6s ease-in-out infinite;
}

@keyframes voice-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.4); opacity: 0.7; }
}

@keyframes voice-process {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* Command bar border glow when listening */
.command-bar.listening {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-subtle);
}
```

### Flujo Tecnico
```
[Hold Alt+Space] → [Web Speech API captura audio]
                  → [Texto crudo enviado a Gemini Flash]
                  → [LLM limpia: fillers, gramatica, formato]
                  → [Texto final insertado en command bar]
                  → [Usuario confirma con Enter o edita]
```

### Principios de Voice UX
1. **Post-proceso, no streaming** — texto aparece completo y limpio
2. **Indicator minimal** — solo punto pulsante, nada mas
3. **Insercion en contexto** — texto va directo al command bar
4. **Fallback siempre disponible** — puede escribir en vez de hablar
5. **Sin modal ni overlay** — la voz no interrumpe el flujo visual

---

*Skill unificado de diseno — [EMPRESA] App Design System v1.2*
*Basado en Brand Guidelines de Anthropic + investigacion de Claude, Notion, Obsidian, y Wispr Flow.*
*Reportes completos en `sisteco-knowledge/investigacion/`.*
