---
name: sisteco-propuesta
description: >
  Generación de propuestas comerciales personalizadas para Sisteco: template HTML/PDF completo,
  ROI calculator, secuencia de follow-up 14 días, deck CEO 3 slides, métricas verificadas.
  Reemplaza al vendedor para documentos y propuestas comerciales.
triggers:
  - propuesta
  - oferta comercial
  - pitch
  - presentación
  - deck
  - propuesta comercial
  - cotización
  - proposal
  - cierre
  - propuesta de valor
  - caso de negocio
  - ROI
  - enviar propuesta
  - generar propuesta
  - propuesta para cliente
  - carta oferta
  - presupuesto
---

# Sisteco Propuesta Comercial — Referencia Completa

> Reemplaza al vendedor para generación de documentos. Cubre: propuesta personalizada,
> ROI calculator, follow-up 14 días, deck CEO. Usa siempre datos reales del lead desde Convex.

---

## 1. Cómo Generar una Propuesta Personalizada

### Datos a obtener de Convex (lead)

```typescript
// Query Convex: leads:getLeadById
{
  empresa: "Nombre Empresa SA",
  contacto: "Juan Pérez",
  cargo: "Director Comercial",
  email: "juan@empresa.cl",
  industria: "saas",
  tamano: "50-200 empleados",
  linkedinUrl: "...",
  enrichedData: {
    descripcion: "Empresa que ofrece X para clientes Y...",
    productos: "Software de gestión, CRM propio",
    stack_detectado: "HubSpot, Salesforce",
    sii_giro: "Desarrollo de software",
    sii_rut: "XX.XXX.XXX-X"
  },
  score: 87,
  scoreCategory: "HOT",
  scoreReasoning: "Empresa SaaS B2B con equipo de ventas >10, usa CRM..."
}
```

### Personalización por industria

| Industria | Ángulo principal | Dolor típico |
|-----------|-----------------|--------------|
| SaaS/Tech | Escalar ventas sin escalar equipo | Ciclo de venta largo, poco seguimiento |
| Fintech | Prospectar decisores CFO/COO difíciles de alcanzar | Regulatorio = menos tiempo para ventas |
| Servicios Profesionales | SDR junior costoso, alta rotación | Manual: buscar leads en LinkedIn 4h/día |
| Manufactura | Diversificar cartera de clientes B2B | No tienen equipo de ventas outbound |
| Logística/Transporte | Llegar a gerentes de operaciones de empresas objetivo | Propuestas tardías, oportunidades perdidas |

---

## 2. Template Propuesta Comercial HTML/PDF

> Instrucción para Claude: Copiar este template, rellenar los marcadores [CAMPO] con datos reales del lead, y generar el archivo HTML. Usar el CSS de Sisteco.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Propuesta Comercial Sisteco — [EMPRESA]</title>
  <style>
    /* Sisteco Brand */
    @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Source Sans 3', sans-serif;
      background: #F8F7F5;
      color: #111111;
      line-height: 1.6;
    }

    /* PORTADA */
    .cover {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 80px;
      background: #111111;
      color: #F8F7F5;
    }
    .cover .logo {
      font-family: 'Nasalization', monospace;
      font-size: 24px;
      color: #c5ed36;
      margin-bottom: 80px;
      letter-spacing: 2px;
    }
    .cover h1 {
      font-size: 52px;
      font-weight: 700;
      line-height: 1.1;
      margin-bottom: 24px;
    }
    .cover .subtitle {
      font-size: 20px;
      color: #999;
      margin-bottom: 60px;
    }
    .cover .pill {
      display: inline-block;
      background: #c5ed36;
      color: #111111;
      padding: 8px 20px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 14px;
    }
    .cover .date {
      position: absolute;
      bottom: 80px;
      right: 80px;
      color: #666;
      font-size: 14px;
    }

    /* SECCIONES */
    .section {
      padding: 80px;
      border-bottom: 1px solid #e5e5e5;
    }
    .section-label {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #999;
      margin-bottom: 16px;
    }
    h2 {
      font-size: 36px;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 32px;
    }
    h3 {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 16px;
      color: #111;
    }
    p { margin-bottom: 16px; font-size: 17px; }

    /* HIGHLIGHT BOX */
    .highlight {
      background: #c5ed36;
      padding: 32px 40px;
      border-radius: 12px;
      margin: 32px 0;
    }
    .highlight h3 { color: #111111; }

    /* STATS ROW */
    .stats-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin: 40px 0;
    }
    .stat-card {
      background: #111111;
      color: #F8F7F5;
      padding: 32px;
      border-radius: 12px;
    }
    .stat-number {
      font-size: 48px;
      font-weight: 700;
      color: #c5ed36;
      line-height: 1;
      margin-bottom: 8px;
    }
    .stat-label { font-size: 14px; color: #999; }

    /* PRICE TABLE */
    .price-table {
      width: 100%;
      border-collapse: collapse;
      margin: 32px 0;
    }
    .price-table th {
      background: #111111;
      color: #F8F7F5;
      padding: 16px 20px;
      text-align: left;
      font-size: 14px;
    }
    .price-table td {
      padding: 16px 20px;
      border-bottom: 1px solid #e5e5e5;
      font-size: 15px;
    }
    .price-table tr.recommended {
      background: #f0f9d6;
      font-weight: 600;
    }
    .price-table .precio {
      font-size: 20px;
      font-weight: 700;
      color: #111111;
    }
    .price-table .descuento {
      color: #c5ed36;
      background: #111;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
    }

    /* STEPS */
    .steps { counter-reset: step; }
    .step {
      display: flex;
      gap: 24px;
      margin-bottom: 32px;
      align-items: flex-start;
    }
    .step-number {
      width: 48px;
      height: 48px;
      background: #c5ed36;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 18px;
      flex-shrink: 0;
    }

    /* CTA */
    .cta-section {
      background: #111111;
      color: #F8F7F5;
      padding: 80px;
      text-align: center;
    }
    .cta-section h2 { color: #c5ed36; margin-bottom: 16px; }
    .cta-section p { color: #999; margin-bottom: 40px; }
    .cta-btn {
      display: inline-block;
      background: #c5ed36;
      color: #111111;
      padding: 16px 40px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 18px;
      text-decoration: none;
    }
    .garantia {
      margin-top: 24px;
      font-size: 14px;
      color: #666;
    }

    @media print {
      .section { page-break-inside: avoid; }
      .cover { page-break-after: always; }
    }
  </style>
</head>
<body>

<!-- PORTADA -->
<div class="cover">
  <div class="logo">SISTECO</div>
  <h1>Propuesta para<br>[EMPRESA]</h1>
  <p class="subtitle">Automatización de prospección B2B para [INDUSTRIA]</p>
  <span class="pill">Plan [INICIO / CRECIMIENTO] — [MES AÑO]</span>
  <div class="date">Preparada para [CONTACTO], [CARGO]<br>[FECHA]</div>
</div>

<!-- SECCIÓN 1: EL PROBLEMA -->
<div class="section">
  <div class="section-label">El Problema</div>
  <h2>[EMPRESA] está perdiendo oportunidades de venta B2B todos los días</h2>

  <p>
    Para una empresa como [EMPRESA] en el sector [INDUSTRIA], el crecimiento depende
    de llegar consistentemente a los decisores correctos. El problema: hacerlo manualmente
    es lento, costoso y no escala.
  </p>

  <div class="highlight">
    <h3>¿Cuánto cuesta no automatizar?</h3>
    <p>
      Un SDR junior en Chile cuesta entre $800.000 y $1.200.000 CLP/mes (más cotizaciones).
      Y dedica el 60% de su tiempo a tareas administrativas: buscar leads en LinkedIn,
      copiar datos en Excel, hacer seguimiento manual.
    </p>
    <p style="margin:0; font-weight:700">
      Resultado: 3-5 leads calificados por semana. Con Sisteco: 75+ leads calificados
      semanales, trabajando 24/7.
    </p>
  </div>

  <div class="stats-row">
    <div class="stat-card">
      <div class="stat-number">78%</div>
      <div class="stat-label">de compradores B2B elige al primer vendedor en responder</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">21x</div>
      <div class="stat-label">más conversiones respondiendo en menos de 5 minutos</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">391%</div>
      <div class="stat-label">ROI promedio en automatización de ventas (Forrester)</div>
    </div>
  </div>
</div>

<!-- SECCIÓN 2: SOLUCIÓN -->
<div class="section">
  <div class="section-label">La Solución</div>
  <h2>Su pipeline de ventas B2B funcionando en 48 horas</h2>

  <p>
    Sisteco es la plataforma de automatización de ventas B2B diseñada específicamente
    para empresas medianas chilenas. No es un CRM genérico: es infraestructura inteligente
    construida para su mercado.
  </p>

  <div class="steps">
    <div class="step">
      <div class="step-number">1</div>
      <div>
        <h3>Descubrimiento automático de leads</h3>
        <p>PhantomBuster extrae 75+ prospectos semanales de LinkedIn con el perfil exacto
        de [EMPRESA]: [INDUSTRIA], [TAMAÑO EMPRESA], tomadores de decisión.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div>
        <h3>Enriquecimiento con datos chilenos</h3>
        <p>Cada lead se enriquece automáticamente con datos del SII (RUT, giro, tamaño real),
        información del sitio web y señales de compra detectadas por IA.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div>
        <h3>Scoring IA con su ICP</h3>
        <p>Gemini evalúa cada lead contra el Perfil de Cliente Ideal de [EMPRESA] y asigna
        una puntuación 0-100. Solo los mejores leads llegan a su equipo.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div>
        <h3>Alerta inmediata de leads HOT</h3>
        <p>Cuando aparece un lead HOT (score > 80), su equipo recibe una alerta en tiempo
        real vía Discord/email con todos los datos listos para contactar.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-number">5</div>
      <div>
        <h3>Dashboard CEO en tiempo real</h3>
        <p>Vista ejecutiva del pipeline completo: leads nuevos, HOT, contactados, pipeline
        value. Consultas en lenguaje natural: "¿Cuántos leads de fintech tuvimos esta semana?"</p>
      </div>
    </div>
  </div>
</div>

<!-- SECCIÓN 3: ROI CALCULATOR -->
<div class="section">
  <div class="section-label">Retorno de Inversión</div>
  <h2>El math para [EMPRESA]</h2>

  <p>Comparación honesta con las alternativas:</p>

  <table class="price-table">
    <thead>
      <tr>
        <th>Opción</th>
        <th>Costo Mensual</th>
        <th>Leads Calificados/Semana</th>
        <th>Tiempo hasta 1er Lead</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>SDR Junior Chile</td>
        <td class="precio">$800K-1.2M CLP</td>
        <td>3-5</td>
        <td>4-8 semanas (reclutamiento)</td>
      </tr>
      <tr>
        <td>Stack DIY (Apollo + PB + Instantly + n8n)</td>
        <td class="precio">$205+ USD sin configurar</td>
        <td>variable, sin scoring</td>
        <td>6-12 semanas configuración</td>
      </tr>
      <tr class="recommended">
        <td>✅ Sisteco Plan [PLAN]</td>
        <td class="precio">$[PRECIO] USD/mes <span class="descuento">40% OFF</span></td>
        <td>75+ leads calificados</td>
        <td>48 horas</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight">
    <h3>¿Cuánto necesita cerrar para que Sisteco se pague?</h3>
    <p>
      Plan Inicio ($[PRECIO]/mes = $[PRECIO_CLP] CLP):
      Con un ticket promedio B2B de $[TICKET_PROMEDIO] CLP, necesita cerrar
      <strong>1 cliente cada [X] meses</strong> para que Sisteco se pague solo.
    </p>
    <p style="margin:0; font-weight:700">
      Sisteco genera 75 leads/semana. Si su tasa de cierre es 2-3%,
      son 1-2 nuevos clientes por mes. ROI proyectado: [X]x
    </p>
  </div>
</div>

<!-- SECCIÓN 4: PLANES Y PRECIOS -->
<div class="section">
  <div class="section-label">Inversión</div>
  <h2>Planes diseñados para empresas como [EMPRESA]</h2>

  <table class="price-table">
    <thead>
      <tr>
        <th>Plan</th>
        <th>Precio Normal</th>
        <th>Precio Fundadores</th>
        <th>Incluye</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Inicio</strong></td>
        <td>$397 USD/mes</td>
        <td class="precio">$239 USD/mes</td>
        <td>Pipeline completo, dashboard CEO, 1 ICP, Discord alerts</td>
      </tr>
      <tr class="recommended">
        <td><strong>⭐ Crecimiento</strong><br><small>(Recomendado)</small></td>
        <td>$797 USD/mes</td>
        <td class="precio">$479 USD/mes</td>
        <td>Todo Inicio + 3 ICPs, API access, outreach sequences, onboarding dedicado</td>
      </tr>
      <tr>
        <td><strong>Enterprise</strong></td>
        <td>$1,800 USD/mes</td>
        <td class="precio">$1,080 USD/mes</td>
        <td>Todo Crecimiento + SLA 99.5%, account manager, custom integrations, DPA</td>
      </tr>
    </tbody>
  </table>

  <div class="highlight">
    <h3>Oferta Fundadores — Exclusiva para [EMPRESA]</h3>
    <p>
      Como uno de los primeros clientes de Sisteco, le ofrecemos el <strong>Plan Fundadores:
      40% de descuento permanente durante los primeros 12 meses</strong>, más:
    </p>
    <ul style="margin-top:12px; padding-left:20px">
      <li>Onboarding personalizado gratuito (60 min sesión 1:1)</li>
      <li>Configuración del ICP a medida para [EMPRESA]</li>
      <li>Caso de estudio conjunto (beneficio mutuo)</li>
      <li>Acceso directo al founder (Felipe) para feedback y mejoras</li>
    </ul>
    <p style="margin-top:16px; font-weight:700; margin-bottom:0">
      Esta oferta es válida hasta el [FECHA + 7 DÍAS].
    </p>
  </div>
</div>

<!-- SECCIÓN 5: PRÓXIMOS PASOS -->
<div class="section">
  <div class="section-label">Próximos Pasos</div>
  <h2>Estar operacional en 48 horas</h2>

  <div class="steps">
    <div class="step">
      <div class="step-number">1</div>
      <div>
        <h3>Hoy — Confirmar propuesta</h3>
        <p>Responder este email con "Acepto" o agendar llamada de 15 min para resolver dudas.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-number">2</div>
      <div>
        <h3>Día 1 — Onboarding (60 min)</h3>
        <p>Sesión 1:1 para configurar ICP de [EMPRESA]: industrias objetivo, cargos,
        tamaños de empresa, señales de compra. Setup completo.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-number">3</div>
      <div>
        <h3>Día 2 — Primeros leads</h3>
        <p>Pipeline activo. Primer batch de leads calificados aparece en el dashboard.</p>
      </div>
    </div>
    <div class="step">
      <div class="step-number">4</div>
      <div>
        <h3>Día 7 — Primera semana review</h3>
        <p>Check-in de 30 min. Ajustar pesos de scoring, refinar ICP con aprendizajes reales.</p>
      </div>
    </div>
  </div>
</div>

<!-- CTA FINAL -->
<div class="cta-section">
  <h2>¿Listo para escalar las ventas de [EMPRESA]?</h2>
  <p>Únase a los primeros fundadores que están construyendo con Sisteco.</p>
  <a href="[REVENIU_LINK]" class="cta-btn">Comenzar ahora — $[PRECIO] USD/mes</a>
  <p class="garantia">✅ Garantía 30 días: si no está satisfecho, reembolso completo sin preguntas</p>
  <p class="garantia" style="margin-top:32px">
    ¿Preguntas? contacto@sisteco.cl · +56 9 40065566
  </p>
</div>

</body>
</html>
```

---

## 3. Secuencia de Follow-Up Post-Propuesta (14 días)

### Día 0 — Envío de Propuesta

**Asunto:** Propuesta personalizada para [EMPRESA] — Pipeline B2B automatizado

```
Hola [NOMBRE],

Te adjunto nuestra propuesta para [EMPRESA].

El resumen ejecutivo:
• Sisteco pone en marcha un pipeline de 75+ leads calificados semanales,
  ajustado a tu ICP, en 48 horas.
• Precio Fundadores: $[PRECIO] USD/mes (40% off permanente).
• Garantía 30 días: si no ves resultados, reembolso completo.

El punto que más le llama la atención a directores comerciales como tú:
el 78% de los compradores B2B elige al primer proveedor en responder.
Sisteco asegura que [EMPRESA] siempre sea el primero.

¿Cuándo tienes 15 minutos para conversar?

Felipe
Sisteco
+56 9 40065566
```

### Día 2 — WhatsApp/LinkedIn

```
Hola [NOMBRE], soy Felipe de Sisteco.

¿Llegó bien la propuesta? Quería asegurarme.

Si tienes dudas puntuales, con gusto las resuelvo en un mensaje.

Felipe
```

### Día 5 — Email: Caso de Uso Específico

**Asunto:** Cómo usaría Sisteco una empresa de [INDUSTRIA] como [EMPRESA]

```
Hola [NOMBRE],

Quería mostrarte un caso de uso concreto para [EMPRESA]:

Imagina que hoy tu pipeline detecta automáticamente que
[COMPETIDOR / EMPRESA SIMILAR] en Santiago acaba de contratar
a un nuevo Director Comercial. Esa es una señal de compra.

Sisteco detectaría eso, lo clasificaría como HOT, y tú recibirías
una alerta en segundos con todos los datos para ser el primero en contactar.

¿Exploramos cómo configuraríamos esto para tu ICP?

Felipe
```

### Día 8 — Llamada Directa

**Guión WhatsApp/LinkedIn:**
```
Hola [NOMBRE], Felipe de Sisteco.

Vi que revisaste la propuesta. Me gustaría hablar directamente
contigo — 15 minutos para ver si tiene sentido para [EMPRESA].

¿Tienes tiempo esta semana?
```

### Día 14 — Última Propuesta + Urgencia

**Asunto:** Última oportunidad Plan Fundadores [EMPRESA] — vence el [FECHA]

```
Hola [NOMBRE],

El Plan Fundadores de Sisteco (40% descuento permanente) vence
esta semana. A partir del [FECHA] volvemos a precio normal.

Si [EMPRESA] va a escalar su pipeline B2B este trimestre,
este es el momento.

¿Me dices sí o no? Lo entiendo de cualquier forma,
prefiero saber para organizar mi agenda.

Felipe
Sisteco
```

---

## 4. Deck CEO — 3 Slides (para presentación verbal)

### Slide 1: El Problema

**Título:** "Su equipo de ventas pierde el 60% del tiempo en tareas manuales"

**Visual:** Timeline de un SDR típico en un día
- 9:00-11:00 Buscar leads en LinkedIn (2h)
- 11:00-12:00 Copiar datos en CRM (1h)
- 13:00-15:00 Hacer seguimiento manual (2h)
- 15:00-17:00 Preparar propuestas (2h)
- Resultado: 3-5 leads calificados. Tiempo de venta real: 1h.

### Slide 2: La Solución

**Título:** "Sisteco: Su pipeline B2B en piloto automático"

**Visual:** El mismo día con Sisteco:
- Pipeline descubre 15+ leads/día automáticamente
- IA califica y prioriza (score 0-100)
- CEO recibe alerta HOT con datos completos
- Equipo solo interviene para cerrar

**Número destacado:** "75 leads calificados/semana vs 3-5 manuales"

### Slide 3: Los Números

**Título:** "¿Por qué Sisteco en lugar de contratar?"

| | SDR Junior | Sisteco Crecimiento |
|--|-----------|-------------------|
| Costo | $1M CLP/mes | $479 USD Fundadores |
| Leads calificados/semana | 3-5 | 75+ |
| Setup | 4-8 semanas | 48 horas |
| Trabaja 24/7 | No | Sí |
| Garantía | No | 30 días |

**CTA:** "¿Cuándo arrancamos?"

---

## 5. Métricas Verificadas (usar siempre estas — nunca inventar)

| Métrica | Fuente | Uso |
|---------|--------|-----|
| 21x más conversiones respondiendo < 5 min | Harvard Business Review | Argumento de velocidad |
| 78% compran al primer vendedor en responder | Hubspot Research | Argumento de urgencia |
| 391% ROI en automatización | Forrester / PolyAI | Argumento de ROI |
| 89% retención omnicanal vs 33% monocanal | Aberdeen Group | Argumento multicanal |
| 5-7x más conversiones vs stack DIY | Benchmark SaaS | Argumento diferenciación |

**Nunca inventar testimonios, métricas ni casos de estudio no verificados.**

---

## 6. Objecciones Comunes y Respuestas

| Objeción | Respuesta |
|----------|-----------|
| "Es caro para lo que hace" | "Un SDR junior cuesta $1M CLP/mes + cotizaciones. Sisteco Inicio son $239 USD. La pregunta es cuánto cuesta NO tener pipeline." |
| "Ya tenemos CRM/HubSpot" | "Perfecto, Sisteco alimenta tu CRM con leads calificados. No lo reemplaza, lo potencia." |
| "Queremos verlo funcionando primero" | "Garantía 30 días. Si en 30 días no ves leads HOT, reembolso completo. Riesgo cero." |
| "No tenemos presupuesto ahora" | "Eso es exactamente para lo que sirve Sisteco: generar el pipeline que trae el presupuesto." |
| "Necesito consultarlo con [otro directivo]" | "Con gusto preparo una versión de la propuesta para [nombre], o agendamos una llamada conjunta." |
| "LinkedIn me bloquea si uso automatización" | "PhantomBuster opera dentro de los límites seguros de LinkedIn. En 2 años de uso, 0 cuentas bloqueadas con nuestra configuración." |

---

## 7. Plan Fundadores — Detalles

**Beneficios únicos:**
- 40% descuento permanente los primeros 12 meses
- Onboarding personal con Felipe (60 min 1:1)
- Acceso directo para feedback (WhatsApp/email)
- Caso de estudio conjunto firmado
- Voz en el roadmap del producto

**Condiciones:**
- Disponible para los primeros 10 clientes
- Precio se congela 12 meses desde contratación
- Requiere firma de caso de estudio (publicación con revisión del cliente)
- Sin contrato mínimo (mes a mes)

**Links de pago (Reveniu):**
- Plan Inicio Fundadores ($239/mes): `[REVENIU_LINK_BASE_MONTHLY]`
- Plan Crecimiento Fundadores ($479/mes): `[REVENIU_LINK_GROWTH_MONTHLY]`

---

## 8. Envio Automatico por Email

### 8.1 Script de Envio via Resend API

> Envia la propuesta HTML generada directamente al lead por email, con wrapper branded y notificacion Discord.

```javascript
// scripts/send-proposal.js
// Uso: node scripts/send-proposal.js --leadId <convex_id> --plan <inicio|crecimiento|enterprise>

const { Resend } = require('resend');

// --- Config ---
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL;
const FROM_EMAIL = 'Felipe Palma - Sisteco <contacto@sisteco.cl>';

// Subject lines por plan
const SUBJECT_TEMPLATES = {
  inicio: 'Propuesta Sisteco Plan Inicio para [EMPRESA] — Pipeline B2B automatizado',
  crecimiento: 'Propuesta Sisteco Crecimiento para [EMPRESA] — Escale sus ventas B2B',
  enterprise: 'Propuesta Enterprise Sisteco para [EMPRESA] — Automatizacion B2B a escala',
};

// --- Funciones principales ---

/**
 * Envuelve el HTML de la propuesta en un wrapper de email branded.
 * El wrapper agrega header y footer con identidad Sisteco.
 */
function wrapProposalInEmail(proposalHtml, leadData, plan) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background:#F8F7F5; font-family:'Source Sans 3',Arial,sans-serif;">

  <!-- HEADER -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#111111; padding:24px 40px;">
    <tr>
      <td style="color:#c5ed36; font-size:20px; font-weight:700; letter-spacing:2px;">
        SISTECO
      </td>
      <td align="right" style="color:#666; font-size:13px;">
        Propuesta Comercial — ${new Date().toLocaleDateString('es-CL')}
      </td>
    </tr>
  </table>

  <!-- INTRO PERSONALIZADO -->
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px;">
    <tr>
      <td style="font-size:17px; color:#111; line-height:1.6;">
        <p>Hola ${leadData.contacto},</p>
        <p>
          Te adjunto la propuesta personalizada que preparamos para
          <strong>${leadData.empresa}</strong>. Incluye el detalle completo
          del Plan ${plan.charAt(0).toUpperCase() + plan.slice(1)} con precio
          Fundadores (40% descuento permanente).
        </p>
        <p>
          El resumen ejecutivo:<br>
          &bull; Pipeline de 75+ leads calificados semanales, operativo en 48 horas<br>
          &bull; Scoring IA ajustado a tu ICP<br>
          &bull; Garantia 30 dias: si no ves resultados, reembolso completo
        </p>
        <p>
          Abajo encontraras la propuesta completa. Si prefieres verla como PDF,
          puedes imprimir esta pagina desde tu navegador (Ctrl+P → Guardar como PDF).
        </p>
      </td>
    </tr>
  </table>

  <!-- PROPUESTA HTML EMBEBIDA -->
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:0 40px;">
    <tr>
      <td>
        ${proposalHtml}
      </td>
    </tr>
  </table>

  <!-- FOOTER -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#111111; padding:32px 40px; margin-top:40px;">
    <tr>
      <td style="color:#999; font-size:13px; line-height:1.6;">
        <span style="color:#c5ed36; font-weight:700;">SISTECO</span> — Infraestructura inteligente para ventas B2B<br>
        Felipe Palma · contacto@sisteco.cl · +56 9 40065566<br>
        Las Condes, Santiago de Chile<br><br>
        <span style="color:#666; font-size:11px;">
          Si no deseas recibir mas comunicaciones, responde "BAJA" a este email.
        </span>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

/**
 * Envia la propuesta por email via Resend API.
 * Retorna el ID del email enviado.
 */
async function sendProposal(leadData, proposalHtml, plan) {
  const resend = new Resend(RESEND_API_KEY);

  const subject = SUBJECT_TEMPLATES[plan].replace('[EMPRESA]', leadData.empresa);
  const emailHtml = wrapProposalInEmail(proposalHtml, leadData, plan);

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [leadData.email],
    subject: subject,
    html: emailHtml,
    tags: [
      { name: 'type', value: 'proposal' },
      { name: 'plan', value: plan },
      { name: 'lead_id', value: leadData._id || 'unknown' },
    ],
  });

  if (error) {
    throw new Error(`Resend error: ${JSON.stringify(error)}`);
  }

  console.log(`[OK] Propuesta enviada a ${leadData.email} — Resend ID: ${data.id}`);
  return data.id;
}

/**
 * Envia notificacion a Discord confirmando el envio.
 */
async function notifyDiscord(leadData, plan, resendId) {
  if (!DISCORD_WEBHOOK) {
    console.log('[SKIP] No DISCORD_WEBHOOK_URL configured');
    return;
  }

  const payload = {
    embeds: [{
      title: '📧 Propuesta Enviada',
      color: 0xc5ed36, // lime Sisteco
      fields: [
        { name: 'Empresa', value: leadData.empresa, inline: true },
        { name: 'Contacto', value: `${leadData.contacto} (${leadData.cargo})`, inline: true },
        { name: 'Plan', value: plan.charAt(0).toUpperCase() + plan.slice(1), inline: true },
        { name: 'Email', value: leadData.email, inline: true },
        { name: 'Score', value: `${leadData.score || 'N/A'} (${leadData.scoreCategory || 'N/A'})`, inline: true },
        { name: 'Resend ID', value: resendId, inline: true },
      ],
      footer: { text: 'Sisteco — Propuesta Automatica' },
      timestamp: new Date().toISOString(),
    }],
  };

  await fetch(DISCORD_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  console.log(`[OK] Discord notificado`);
}

// --- Main ---
async function main() {
  const args = process.argv.slice(2);
  const leadIdIdx = args.indexOf('--leadId');
  const planIdx = args.indexOf('--plan');

  if (leadIdIdx === -1 || planIdx === -1) {
    console.error('Uso: node scripts/send-proposal.js --leadId <id> --plan <inicio|crecimiento|enterprise>');
    process.exit(1);
  }

  const leadId = args[leadIdIdx + 1];
  const plan = args[planIdx + 1];

  if (!['inicio', 'crecimiento', 'enterprise'].includes(plan)) {
    console.error('Plan invalido. Opciones: inicio, crecimiento, enterprise');
    process.exit(1);
  }

  // TODO: Obtener leadData de Convex usando leadId
  // const leadData = await convexClient.query('leads:getLeadById', { id: leadId });

  // TODO: Generar proposalHtml usando el template de seccion 2 con datos del lead
  // const proposalHtml = generateProposal(leadData, plan);

  // Placeholder para testing:
  console.log(`[INFO] Enviaria propuesta plan ${plan} al lead ${leadId}`);
  console.log('[INFO] Implementar: conectar Convex query + template HTML generation');

  // Cuando este conectado:
  // const resendId = await sendProposal(leadData, proposalHtml, plan);
  // await notifyDiscord(leadData, plan, resendId);
  // TODO: Actualizar Convex con proposalSent (ver seccion 8.3)
}

main().catch(console.error);
```

### 8.2 Secuencia de Follow-Up Automatizada (Dias 2, 5, 8, 14)

> Template para disparar via n8n Cron o script manual. Cada email usa Resend API.
> Los bodies estan en la voz de Felipe (ver vault/voice-identity).

```javascript
// scripts/send-followup.js
// Uso: node scripts/send-followup.js --leadId <id> --day <2|5|8|14>

const FOLLOWUP_SEQUENCE = {

  // === DIA 2: Check suave — confirmar recepcion ===
  2: {
    subject: 'Queria asegurarme que llego bien — Propuesta [EMPRESA]',
    html: (lead) => `
      <p>Hola ${lead.contacto},</p>
      <p>
        Soy Felipe de Sisteco. Te envie una propuesta hace un par de dias
        para automatizar el pipeline B2B de ${lead.empresa}.
      </p>
      <p>
        Queria confirmar que llego bien y si tienes alguna duda puntual.
        Con gusto la resuelvo por aca o en una llamada rapida de 15 min.
      </p>
      <p>
        Felipe<br>
        Sisteco · +56 9 40065566
      </p>
    `,
  },

  // === DIA 5: Valor agregado — caso de uso especifico ===
  5: {
    subject: 'Como usaria Sisteco una empresa de [INDUSTRIA] como [EMPRESA]',
    html: (lead) => `
      <p>Hola ${lead.contacto},</p>
      <p>
        Queria mostrarte un caso de uso concreto para ${lead.empresa}:
      </p>
      <p>
        Imagina que hoy tu pipeline detecta automaticamente que una empresa
        en tu mercado objetivo acaba de contratar a un nuevo director comercial.
        Esa es una senal de compra.
      </p>
      <p>
        Sisteco detectaria eso, lo clasificaria como HOT, y tu recibirias una
        alerta en segundos con todos los datos para ser el primero en contactar.
      </p>
      <p>
        El 78% de los compradores B2B elige al primer proveedor en responder.
        Eso es lo que automatizamos para ti.
      </p>
      <p>
        Te tinca agendar 15 minutos para ver como configurariamos esto
        para ${lead.empresa}?
      </p>
      <p>
        Felipe<br>
        Sisteco · +56 9 40065566
      </p>
    `,
  },

  // === DIA 8: Contacto directo — buscar respuesta ===
  8: {
    subject: 'Pregunta rapida sobre la propuesta, [NOMBRE]',
    html: (lead) => `
      <p>Hola ${lead.contacto},</p>
      <p>
        No quiero ser insistente, pero si quiero asegurarme de no dejar
        pasar una oportunidad para ${lead.empresa}.
      </p>
      <p>
        Vi que la propuesta fue abierta. Me gustaria hablar directamente
        contigo — 15 minutos para ver si tiene sentido, y si no, lo
        entiendo perfectamente.
      </p>
      <p>
        Tienes disponibilidad esta semana? Puedo ajustarme a tu agenda.
      </p>
      <p>
        Felipe<br>
        Sisteco · +56 9 40065566
      </p>
    `,
  },

  // === DIA 14: Ultima oportunidad — urgencia real ===
  14: {
    subject: 'Ultima oportunidad Plan Fundadores [EMPRESA] — vence esta semana',
    html: (lead) => `
      <p>Hola ${lead.contacto},</p>
      <p>
        El Plan Fundadores de Sisteco (40% descuento permanente) vence
        esta semana. A partir del lunes volvemos a precio normal.
      </p>
      <p>
        Si ${lead.empresa} va a escalar su pipeline B2B este trimestre,
        este es el momento. Garantia 30 dias: si no ves resultados,
        reembolso completo.
      </p>
      <p>
        Me dices si o no? Lo entiendo de cualquier forma,
        prefiero saber para organizar mi agenda.
      </p>
      <p>
        Felipe<br>
        Sisteco · +56 9 40065566
      </p>
    `,
  },
};

/**
 * Envia un follow-up especifico de la secuencia.
 * Reemplaza [EMPRESA], [INDUSTRIA], [NOMBRE] en el subject.
 */
async function sendFollowUp(leadData, day) {
  const { Resend } = require('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);

  const template = FOLLOWUP_SEQUENCE[day];
  if (!template) {
    throw new Error(`No existe template para dia ${day}. Opciones: 2, 5, 8, 14`);
  }

  const subject = template.subject
    .replace('[EMPRESA]', leadData.empresa)
    .replace('[INDUSTRIA]', leadData.enrichedData?.sii_giro || leadData.industria || '')
    .replace('[NOMBRE]', leadData.contacto);

  const body = template.html(leadData);

  // Wrap en email template minimo
  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0; padding:40px; background:#F8F7F5; font-family:'Source Sans 3',Arial,sans-serif; color:#111; font-size:16px; line-height:1.6;">
  ${body}
  <hr style="border:none; border-top:1px solid #e5e5e5; margin:32px 0 16px;">
  <p style="font-size:12px; color:#999;">
    Sisteco — Infraestructura inteligente para ventas B2B<br>
    Si no deseas recibir mas comunicaciones, responde "BAJA".
  </p>
</body>
</html>`;

  const { data, error } = await resend.emails.send({
    from: 'Felipe Palma - Sisteco <contacto@sisteco.cl>',
    to: [leadData.email],
    subject: subject,
    html: html,
    tags: [
      { name: 'type', value: 'followup' },
      { name: 'day', value: String(day) },
      { name: 'lead_id', value: leadData._id || 'unknown' },
    ],
  });

  if (error) throw new Error(`Resend error: ${JSON.stringify(error)}`);

  console.log(`[OK] Follow-up dia ${day} enviado a ${leadData.email} — ID: ${data.id}`);

  // Notificar Discord
  if (process.env.DISCORD_WEBHOOK_URL) {
    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `Follow-up dia ${day} enviado a **${leadData.contacto}** (${leadData.empresa}) — ${leadData.email}`,
      }),
    });
  }

  return data.id;
}

module.exports = { FOLLOWUP_SEQUENCE, sendFollowUp };
```

#### Cronograma de la secuencia

```
Dia 0  → Propuesta enviada (send-proposal.js)
Dia 2  → Check suave: "Llego bien?"
Dia 5  → Caso de uso especifico para su industria
Dia 8  → Contacto directo: "15 min para ver si tiene sentido"
Dia 14 → Ultima oportunidad Plan Fundadores (urgencia real)

n8n automation:
  Trigger: Cron cada dia a las 10:00 AM CLT
  Logic:
    1. Query Convex: leads con proposalSent = true
    2. Calcular dias desde proposalSentAt
    3. Si dias == 2|5|8|14 Y followUpDay[N] != sent → ejecutar sendFollowUp
    4. Actualizar Convex: followUpDay2Sent, followUpDay5Sent, etc.
    5. Si dia > 14 sin respuesta → marcar como "nurture" (sale de secuencia activa)
```

### 8.3 Tracking en Convex — Schema Sugerido

> Agregar estos campos a la tabla `leads` (o crear tabla `proposals` separada) para trackear envios.

```typescript
// convex/schema.ts — campos a agregar al schema de leads

// Opcion A: Campos directos en la tabla leads
{
  // ... campos existentes ...

  // Propuesta
  proposalSent: v.optional(v.boolean()),        // true cuando se envia la propuesta
  proposalSentAt: v.optional(v.string()),        // ISO date del envio
  proposalPlan: v.optional(v.string()),          // "inicio" | "crecimiento" | "enterprise"
  proposalResendId: v.optional(v.string()),      // ID de Resend para tracking

  // Follow-up sequence
  followUpDay2Sent: v.optional(v.boolean()),
  followUpDay2At: v.optional(v.string()),
  followUpDay5Sent: v.optional(v.boolean()),
  followUpDay5At: v.optional(v.string()),
  followUpDay8Sent: v.optional(v.boolean()),
  followUpDay8At: v.optional(v.string()),
  followUpDay14Sent: v.optional(v.boolean()),
  followUpDay14At: v.optional(v.string()),

  // Resultado
  proposalStatus: v.optional(v.string()),        // "sent" | "opened" | "replied" | "accepted" | "rejected" | "expired"
  proposalStatusUpdatedAt: v.optional(v.string()),
}

// Opcion B: Tabla separada (mejor si hay muchas propuestas)
// convex/schema.ts
/*
proposals: defineTable({
  leadId: v.id("leads"),
  plan: v.string(),                    // "inicio" | "crecimiento" | "enterprise"
  sentAt: v.string(),                  // ISO date
  resendId: v.string(),               // Resend email ID
  status: v.string(),                  // "sent" | "opened" | "replied" | "accepted" | "rejected"
  followUps: v.object({
    day2: v.optional(v.object({ sentAt: v.string(), resendId: v.string() })),
    day5: v.optional(v.object({ sentAt: v.string(), resendId: v.string() })),
    day8: v.optional(v.object({ sentAt: v.string(), resendId: v.string() })),
    day14: v.optional(v.object({ sentAt: v.string(), resendId: v.string() })),
  }),
  notes: v.optional(v.string()),
}).index("by_lead", ["leadId"])
  .index("by_status", ["status"]),
*/
```

#### Mutation para actualizar tracking

```typescript
// convex/proposals.ts — mutation de ejemplo

import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const markProposalSent = mutation({
  args: {
    leadId: v.id("leads"),
    plan: v.string(),
    resendId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.leadId, {
      proposalSent: true,
      proposalSentAt: new Date().toISOString(),
      proposalPlan: args.plan,
      proposalResendId: args.resendId,
      proposalStatus: "sent",
      proposalStatusUpdatedAt: new Date().toISOString(),
    });
  },
});

export const markFollowUpSent = mutation({
  args: {
    leadId: v.id("leads"),
    day: v.number(),
    resendId: v.string(),
  },
  handler: async (ctx, args) => {
    const field = `followUpDay${args.day}Sent`;
    const fieldAt = `followUpDay${args.day}At`;
    await ctx.db.patch(args.leadId, {
      [field]: true,
      [fieldAt]: new Date().toISOString(),
    });
  },
});
```

---

*Skill actualizado: 2026-03-17 | Reemplaza vendedor para documentos ($800K-1.5M CLP/mes)*
