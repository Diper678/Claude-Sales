---
name: posthog
description: Gestion completa de PostHog analytics para Sisteco. Tracking de eventos, feature flags, revenue, A/B testing, session replay, compliance Ley 21.719, alertas Discord. Trigger con "posthog", "analytics", "tracking", "feature flag", "metricas", "eventos".
---

# Skill: PostHog — Analytics & Product Intelligence

Referencia unica para todas las operaciones PostHog en Sisteco.
Hosting EU obligatorio (Frankfurt) por Ley 21.719.

---

## 1. Setup & Configuracion

### Variables de entorno (.env)

```bash
# PostHog — Analytics (EU Frankfurt)
POSTHOG_PROJECT_API_KEY=phc_...          # Project API Key (capture/flags)
POSTHOG_PERSONAL_API_KEY=phx_...         # Personal API Key (query API, management)
POSTHOG_HOST=https://eu.i.posthog.com    # EU host — NUNCA usar us.posthog.com
POSTHOG_PROJECT_ID=                       # Numeric project ID (ver Project Settings)
```

Obtener keys en: https://eu.posthog.com/settings/project-api-key

### CLI Setup

```bash
node scripts/sisteco-cli.js posthog setup    # Verifica keys, crea posthog-client.js si no existe
node scripts/sisteco-cli.js posthog status   # Estado: conexion, proyecto, feature flags activos
node scripts/sisteco-cli.js posthog test     # Envia evento test_connection y confirma recepcion
```

### Dependencia Node.js

```bash
npm install posthog-node
```

---

## 2. Event Tracking

### Convencion de nombres

**Formato:** `objeto_accion` en snake_case. Siempre sustantivo + verbo pasado o accion.

```
page_viewed          # correcto
pageViewed           # INCORRECTO — no camelCase
user clicked button  # INCORRECTO — no espacios
```

### Eventos core por area

#### Landing Page (frontend vanilla JS)

| Evento | Propiedades | Cuando |
|--------|------------|--------|
| `page_viewed` | `path, referrer, utm_source, utm_medium, utm_campaign` | Cada pageview |
| `cta_clicked` | `button_id, section, destination` | Click en CTA |
| `demo_requested` | `source_page, company_size` | Agendar demo Cal.com |
| `pricing_viewed` | `plan_visible, scroll_depth` | Ver seccion precios |
| `form_submitted` | `form_id, fields_count` | Submit de formulario |

#### Dashboard (app autenticada)

| Evento | Propiedades | Cuando |
|--------|------------|--------|
| `dashboard_loaded` | `load_time_ms, leads_count, plan` | Carga inicial |
| `lead_viewed` | `lead_id, score, status` | Click en lead |
| `lead_exported` | `format, count, filter_applied` | Exportar leads |
| `filter_applied` | `filter_type, value, results_count` | Usar filtro |
| `settings_changed` | `setting_key, old_value, new_value` | Cambiar config |
| `onboarding_step_completed` | `step_number, step_name, time_spent_s` | Avanzar onboarding |
| `trial_banner_clicked` | `action, days_remaining` | Interactuar con banner trial |

#### Backend (Vercel serverless / scripts Node.js)

| Evento | Propiedades | Cuando |
|--------|------------|--------|
| `api_called` | `endpoint, method, status_code, duration_ms` | Cada request API |
| `lead_scored` | `lead_id, score, model_version, processing_ms` | Score calculado |
| `lead_enriched` | `lead_id, source, fields_added` | Enrichment completado |
| `email_sent` | `template, recipient_domain, provider` | Email enviado via Resend |
| `webhook_received` | `source, event_type, payload_size` | Webhook entrante |
| `error_occurred` | `error_type, message, stack_trace, endpoint` | Error no manejado |

#### n8n Workflows

| Evento | Propiedades | Cuando |
|--------|------------|--------|
| `workflow_completed` | `workflow_id, workflow_name, duration_s, nodes_executed` | Workflow termina OK |
| `workflow_failed` | `workflow_id, workflow_name, error_node, error_message` | Workflow falla |
| `leads_batch_scored` | `count, avg_score, min_score, max_score, workflow_id` | Batch scoring listo |
| `leads_batch_imported` | `count, source, duplicates_skipped` | Import de leads |
| `emails_batch_sent` | `count, template, bounce_rate` | Batch email enviado |

#### CLI (sisteco-cli.js)

| Evento | Propiedades | Cuando |
|--------|------------|--------|
| `cli_command_executed` | `command, subcommand, args_count, duration_ms, exit_code` | Cada comando CLI |

### CLI: Trackear evento

```bash
# Evento simple
node scripts/sisteco-cli.js posthog track page_viewed

# Evento con propiedades (JSON string)
node scripts/sisteco-cli.js posthog track lead_scored '{"lead_id":"abc123","score":87}'

# Evento con distinct_id explicito
node scripts/sisteco-cli.js posthog track dashboard_loaded '{"load_time_ms":1200}' --user user_abc
```

### Codigo: Trackear evento

```javascript
import { track, shutdown } from './scripts/posthog-client.js';

// Track basico (distinct_id desde contexto o anonimo)
await track('lead_scored', { lead_id: 'abc123', score: 87 }, 'user_distinct_id');

// Siempre hacer shutdown antes de salir (flush pendientes)
process.on('beforeExit', shutdown);
```

---

## 3. Feature Flags

### Flags de plan Sisteco

Estos flags controlan features por plan de suscripcion:

| Flag Key | Plan | Descripcion |
|----------|------|-------------|
| `feature-sales-navigator` | Growth+ | LinkedIn Sales Navigator integration |
| `feature-crm-direct` | Growth+ | Sync directo HubSpot/Pipedrive/Salesforce |
| `feature-whatsapp-outreach` | Enterprise | Outreach WhatsApp Business API |
| `feature-data-enrichment` | Enterprise | Data enrichment avanzado (SII + Clearbit) |
| `feature-custom-scoring` | Enterprise | Modelo de scoring personalizado por cliente |

### CLI: Consultar flags

```bash
# Flag para usuario actual
node scripts/sisteco-cli.js posthog flag feature-sales-navigator

# Flag para usuario especifico
node scripts/sisteco-cli.js posthog flag feature-crm-direct --user user_abc123

# Listar todos los flags activos
node scripts/sisteco-cli.js posthog flag --list
```

### Codigo: Usar flags

```javascript
import PostHog from 'posthog-node';

const posthog = new PostHog(process.env.POSTHOG_PROJECT_API_KEY, {
  host: process.env.POSTHOG_HOST,
});

// Boolean flag
const hasSalesNav = await posthog.isFeatureEnabled('feature-sales-navigator', userId);
if (hasSalesNav) {
  // activar integracion Sales Navigator
}

// Flag con payload (JSON config)
const payload = await posthog.getFeatureFlagPayload('feature-custom-scoring', userId);
// payload = { model: 'v2', weights: { industry: 0.3, size: 0.4, engagement: 0.3 } }
```

### Crear/modificar flags

Los flags se crean y configuran SOLO desde la UI de PostHog:
https://eu.posthog.com/feature_flags

Desde codigo/CLI solo se pueden consultar, no crear.

---

## 4. Revenue Tracking

### Evento de compra

```javascript
await track('purchase', {
  revenue: 797,                    // monto en USD
  currency: 'USD',
  plan: 'growth',                  // base | growth | enterprise
  provider: 'reveniu',             // reveniu | dlocal
  billing_cycle: 'monthly',        // monthly | annual
  customer_company: 'Empresa XYZ',
  $set: {                          // actualiza propiedades del usuario
    plan: 'growth',
    mrr: 797,
    paying_customer: true
  }
}, customerId);
```

### CLI

```bash
node scripts/sisteco-cli.js posthog track purchase '{"revenue":797,"plan":"growth","currency":"USD","provider":"reveniu"}'
```

### Funcion helper (posthog-client.js)

```javascript
export async function trackRevenue(customerId, amount, plan, provider = 'reveniu') {
  await track('purchase', {
    revenue: amount,
    currency: 'USD',
    plan,
    provider,
    billing_cycle: 'monthly',
    $set: { plan, mrr: amount, paying_customer: true },
  }, customerId);
}
```

### Revenue en PostHog UI

Configurar en Product Analytics > Revenue:
- Event: `purchase`
- Revenue property: `revenue`
- Currency property: `currency`

---

## 5. User Identification

### Despues de login con Clerk

```javascript
// En el frontend, despues de que Clerk autentica
import posthog from 'posthog-js';

const user = clerk.user;

posthog.identify(user.id, {
  email: user.primaryEmailAddress,
  name: user.firstName + ' ' + user.lastName,
  plan: user.publicMetadata.plan || 'trial',
  company_name: user.publicMetadata.company || '',
  created_at: user.createdAt,
});
```

### Backend (Node.js)

```javascript
import { identify, shutdown } from './scripts/posthog-client.js';

await identify(userId, {
  email: 'contacto@empresa.cl',
  plan: 'growth',
  company_name: 'Empresa XYZ',
  company_size: '50-200',
  industry: 'tecnologia',
});

process.on('beforeExit', shutdown);
```

### CLI

```bash
node scripts/sisteco-cli.js posthog identify user_abc123 '{"email":"contacto@empresa.cl","plan":"growth","company_name":"Empresa XYZ"}'
```

### Group Analytics (por empresa)

```javascript
// Agrupar usuario a su empresa (group analytics)
posthog.group('company', 'empresa_xyz', {
  name: 'Empresa XYZ',
  plan: 'growth',
  employee_count: 120,
  industry: 'tecnologia',
});
```

---

## 6. n8n Workflow Monitoring

### Desde n8n: Nodo HTTP Request

Para trackear desde n8n workflows, usar un nodo **HTTP Request**:

```
Method: POST
URL: https://eu.i.posthog.com/capture/
Headers:
  Content-Type: application/json

Body (JSON):
{
  "api_key": "{{ $env.POSTHOG_PROJECT_API_KEY }}",
  "event": "workflow_completed",
  "distinct_id": "n8n-system",
  "properties": {
    "workflow_id": "{{ $workflow.id }}",
    "workflow_name": "{{ $workflow.name }}",
    "duration_s": "{{ $runIndex }}",
    "timestamp": "{{ $now.toISO() }}"
  }
}
```

### Eventos recomendados para n8n

```json
// Workflow completado OK
{ "event": "workflow_completed", "properties": { "workflow_id": "...", "workflow_name": "lead-scoring", "duration_s": 12, "nodes_executed": 19 }}

// Workflow fallo
{ "event": "workflow_failed", "properties": { "workflow_id": "...", "workflow_name": "lead-scoring", "error_node": "Score AI", "error_message": "Gemini rate limit" }}

// Batch de leads scored
{ "event": "leads_batch_scored", "properties": { "count": 150, "avg_score": 72, "workflow_id": "dLrpslRLhoIjMh6Y" }}

// Batch de emails enviados
{ "event": "emails_batch_sent", "properties": { "count": 50, "template": "outreach-v1", "bounce_rate": 0.02 }}
```

### CLI para probar workflow events

```bash
node scripts/sisteco-cli.js posthog track workflow_completed '{"workflow":"lead-scoring","leads":150,"duration_s":12}'
node scripts/sisteco-cli.js posthog track workflow_failed '{"workflow":"lead-scoring","error_node":"Score AI","error_message":"rate limit"}'
```

---

## 7. Query Events

### CLI: Eventos recientes

```bash
# Ultimos 20 eventos
node scripts/sisteco-cli.js posthog events --last 20

# Filtrar por evento
node scripts/sisteco-cli.js posthog events --event lead_scored --last 10

# Filtrar por usuario
node scripts/sisteco-cli.js posthog events --user user_abc123 --last 10
```

Requiere `POSTHOG_PERSONAL_API_KEY` en .env.

### API directa (para scripts custom)

```javascript
// GET eventos via API
const projectId = process.env.POSTHOG_PROJECT_ID;
const apiKey = process.env.POSTHOG_PERSONAL_API_KEY;
const res = await fetch(
  'https://eu.posthog.com/api/projects/' + projectId + '/events/?limit=20',
  { headers: { Authorization: 'Bearer ' + apiKey } }
);
const data = await res.json();
// data.results = array de eventos
```

### Filtros utiles de la API

```
?event=lead_scored                    # Solo un tipo de evento
?person_id=user_abc123                # Solo un usuario
?after=2026-03-20T00:00:00Z          # Desde fecha
?before=2026-03-21T00:00:00Z         # Hasta fecha
?properties=[{"key":"score","value":80,"operator":"gte"}]  # Por propiedad
```

---

## 8. A/B Testing

### Crear experimento

Los experimentos se crean SOLO en PostHog UI:
https://eu.posthog.com/experiments

### Consultar variante en codigo

```javascript
// Frontend (vanilla JS)
var variant = posthog.getFeatureFlag('experiment-pricing-page');
// variant = 'control' | 'test-annual-first' | false (no participa)

if (variant === 'test-annual-first') {
  showAnnualPricingFirst();
} else {
  showMonthlyPricingFirst();
}

// Trackear resultado del experimento
posthog.capture('pricing_plan_selected', {
  plan: 'growth',
  variant: variant,
  $feature_flag: 'experiment-pricing-page',
});
```

### Patron landing page (vanilla JS)

```html
<script>
  // Esperar a que PostHog cargue flags
  posthog.onFeatureFlags(function() {
    var variant = posthog.getFeatureFlag('experiment-hero-copy');

    if (variant === 'test-metrics') {
      document.getElementById('hero-title').textContent = '5-7x mas conversiones con automatizacion';
    } else if (variant === 'test-pain') {
      document.getElementById('hero-title').textContent = 'Tu equipo de ventas pierde el 80% del tiempo en tareas manuales';
    }
    // 'control' = texto original, no hacer nada
  });
</script>
```

### Backend (Node.js)

```javascript
const variant = await posthog.getFeatureFlag('experiment-scoring-model', userId);

if (variant === 'test-gemini-25') {
  score = await scoreWithGemini25(lead);
} else {
  score = await scoreWithGeminiFlashLite(lead);
}

// Trackear resultado
await track('lead_scored', {
  score,
  model: variant,
  $feature_flag: 'experiment-scoring-model',
}, userId);
```

---

## 9. Session Replay

### Snippet de configuracion (dashboard pages)

```javascript
posthog.init('__POSTHOG_KEY__', {
  api_host: 'https://eu.i.posthog.com',
  // Session replay
  session_recording: {
    maskAllInputs: true,                  // Ocultar inputs (compliance)
    maskTextSelector: '.ph-no-capture',   // Clase CSS para ocultar texto
    recordCrossOriginIframes: false,
  },
  // Solo grabar sesiones autenticadas
  person_profiles: 'identified_only',
  disable_session_recording: false,       // true para desactivar en paginas especificas
});
```

### Privacidad — Clases CSS

```html
<!-- Ocultar elemento completo en replay -->
<div class="ph-no-capture">Datos sensibles aqui</div>

<!-- Ocultar solo texto (mantener layout) -->
<span class="ph-mask">RUT: 12.345.678-9</span>
```

### Elementos que SIEMPRE deben tener ph-no-capture

- Campos de RUT
- Campos de telefono personal
- Campos de email en formularios
- Datos financieros (precios custom, facturacion)
- Tokens/API keys visibles en UI

### Buscar replays en PostHog UI

1. Ir a https://eu.posthog.com/replay
2. Filtrar por: Person email contains "empresa.cl"
3. O filtrar por: Event = "error_occurred" (para debugging)

---

## 10. Compliance Ley 21.719

### Configuracion obligatoria

```javascript
posthog.init('__POSTHOG_KEY__', {
  api_host: 'https://eu.i.posthog.com',     // EU hosting (Frankfurt) — OBLIGATORIO
  person_profiles: 'identified_only',         // No crear perfiles anonimos
  ip: false,                                  // NUNCA capturar IP
  opt_out_capturing_by_default: true,         // Consentimiento previo obligatorio
  capture_pageview: true,
  capture_pageleave: true,
  persistence: 'localStorage+cookie',
  cross_subdomain_cookie: false,
  secure_cookie: true,
  property_denylist: [                        // Nunca capturar estas propiedades
    'rut',
    'phone_personal',
    'address_home',
  ],
  session_recording: {
    maskAllInputs: true,
  },
});
```

### Banner de consentimiento

```javascript
// Mostrar banner ANTES de capturar cualquier dato
function showConsentBanner() {
  // ... render banner UI ...
}

function onAcceptAnalytics() {
  posthog.opt_in_capturing();
  localStorage.setItem('analytics_consent', 'accepted');
}

function onDeclineAnalytics() {
  posthog.opt_out_capturing();
  localStorage.setItem('analytics_consent', 'declined');
}

// Al cargar pagina, verificar consentimiento previo
var consent = localStorage.getItem('analytics_consent');
if (consent === 'accepted') {
  posthog.opt_in_capturing();
} else if (consent === 'declined') {
  posthog.opt_out_capturing();
} else {
  showConsentBanner();  // Primera visita
}
```

### Checklist de compliance

- [x] Hosting EU (eu.i.posthog.com) — datos nunca salen de la UE
- [x] ip: false — no se captura IP del usuario
- [x] opt_out_capturing_by_default: true — consentimiento previo
- [x] person_profiles: identified_only — no perfiles anonimos
- [x] maskAllInputs: true — inputs ocultos en replay
- [x] property_denylist — datos sensibles excluidos
- [ ] Data retention configurado en Project Settings (recomendado: 12 meses)
- [ ] DPA firmado con PostHog (solicitar a privacy@posthog.com)

### Derechos del titular (Ley 21.719 Art. 10-16)

Para solicitudes de acceso/eliminacion de datos:
1. Buscar persona en PostHog > Persons
2. Exportar datos del usuario (boton "Export")
3. Eliminar persona (boton "Delete") — elimina todos los eventos asociados
4. Confirmar eliminacion al titular dentro de 15 dias habiles

---

## 11. Alertas & Notificaciones

### PostHog Webhook a Discord

Configurar en PostHog UI > Data Pipeline > Destinations:

1. Crear destination tipo "Webhook"
2. URL: webhook de Discord del canal #alertas
3. Filtrar por eventos: `workflow_failed`, `error_occurred`, `purchase`

### Insight Alerts (recomendados)

| Insight | Alerta | Umbral |
|---------|--------|--------|
| Errores por hora | error_occurred > 10/hora | Icono campana en insight |
| Workflow failures | workflow_failed > 0/hora | Icono campana en insight |
| Revenue diario | purchase sum(revenue) | Diario a las 9am CLT |
| Leads scored | leads_batch_scored count | Semanal los lunes |

### n8n como middleware de alertas

Patron: PostHog webhook a n8n a Discord embed formateado

```
[PostHog Webhook Destination]
  URL: https://primary-production-24f87.up.railway.app/webhook/posthog-alert
  Events: workflow_failed, error_occurred

[n8n Workflow]
  Webhook trigger > Switch (event type) > Format Discord embed > HTTP Request (Discord webhook)
```

Embed Discord recomendado:

```json
{
  "embeds": [{
    "title": "Workflow Failed: lead-scoring",
    "color": 16711680,
    "fields": [
      { "name": "Error", "value": "Gemini rate limit", "inline": true },
      { "name": "Node", "value": "Score AI", "inline": true },
      { "name": "Time", "value": "2026-03-21 14:30 CLT", "inline": true }
    ],
    "footer": { "text": "PostHog Alert via n8n" }
  }]
}
```

---

## 12. Snippets Listos para Copiar

### Frontend: Landing page + Dashboard (vanilla JS)

```html
<script>
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  posthog.init('__POSTHOG_KEY__', {
    api_host: 'https://eu.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
    ip: false,
    opt_out_capturing_by_default: true,
    session_recording: {
      maskAllInputs: true,
    },
  });
</script>
```

### Banner de consentimiento (HTML + JS)

```html
<div id="consent-banner" style="display:none; position:fixed; bottom:0; left:0; right:0; background:#111; color:#fff; padding:16px; z-index:9999; text-align:center;">
  <span>Usamos analytics para mejorar tu experiencia. </span>
  <button onclick="acceptAnalytics()" style="background:#c5ed36; color:#111; border:none; padding:8px 16px; cursor:pointer; margin-left:8px;">Aceptar</button>
  <button onclick="declineAnalytics()" style="background:transparent; color:#fff; border:1px solid #555; padding:8px 16px; cursor:pointer; margin-left:4px;">Rechazar</button>
</div>

<script>
  function acceptAnalytics() {
    posthog.opt_in_capturing();
    localStorage.setItem('analytics_consent', 'accepted');
    document.getElementById('consent-banner').style.display = 'none';
  }

  function declineAnalytics() {
    posthog.opt_out_capturing();
    localStorage.setItem('analytics_consent', 'declined');
    document.getElementById('consent-banner').style.display = 'none';
  }

  (function() {
    var consent = localStorage.getItem('analytics_consent');
    if (consent === 'accepted') posthog.opt_in_capturing();
    else if (consent === 'declined') posthog.opt_out_capturing();
    else document.getElementById('consent-banner').style.display = 'block';
  })();
</script>
```

### Node.js Backend: posthog-client.js

```javascript
// scripts/posthog-client.js
import PostHog from 'posthog-node';
import 'dotenv/config';

const client = new PostHog(process.env.POSTHOG_PROJECT_API_KEY, {
  host: process.env.POSTHOG_HOST || 'https://eu.i.posthog.com',
  flushAt: 20,
  flushInterval: 10000,
});

export async function track(event, properties = {}, distinctId = 'system') {
  client.capture({
    distinctId,
    event,
    properties: {
      ...properties,
      source: properties.source || 'backend',
      environment: process.env.NODE_ENV || 'development',
    },
  });
}

export async function identify(distinctId, properties = {}) {
  client.identify({
    distinctId,
    properties,
  });
}

export async function trackRevenue(customerId, amount, plan, provider = 'reveniu') {
  await track('purchase', {
    revenue: amount,
    currency: 'USD',
    plan,
    provider,
    billing_cycle: 'monthly',
    $set: { plan, mrr: amount, paying_customer: true },
  }, customerId);
}

export async function shutdown() {
  await client.shutdown();
}

export default client;
```

### n8n HTTP Request node body

```json
{
  "api_key": "{{ $env.POSTHOG_PROJECT_API_KEY }}",
  "event": "workflow_completed",
  "distinct_id": "n8n-system",
  "properties": {
    "workflow_id": "{{ $workflow.id }}",
    "workflow_name": "{{ $workflow.name }}",
    "timestamp": "{{ $now.toISO() }}",
    "source": "n8n"
  }
}
```

---

## Quick Reference

| Accion | Comando CLI |
|--------|-------------|
| Setup | `node scripts/sisteco-cli.js posthog setup` |
| Status | `node scripts/sisteco-cli.js posthog status` |
| Test conexion | `node scripts/sisteco-cli.js posthog test` |
| Track evento | `node scripts/sisteco-cli.js posthog track <event> [props_json]` |
| Check flag | `node scripts/sisteco-cli.js posthog flag <key> [--user id]` |
| Listar flags | `node scripts/sisteco-cli.js posthog flag --list` |
| Identify user | `node scripts/sisteco-cli.js posthog identify <id> [props_json]` |
| Eventos recientes | `node scripts/sisteco-cli.js posthog events --last 20` |
| Eventos filtrados | `node scripts/sisteco-cli.js posthog events --event <name> --last 10` |

---

## Errores comunes

| Error | Causa | Solucion |
|-------|-------|----------|
| Invalid API key | Key incorrecta o de otro proyecto | Verificar POSTHOG_PROJECT_API_KEY en .env |
| CORS error en frontend | api_host incorrecto | Usar https://eu.i.posthog.com (con .i.) |
| Eventos no aparecen | opt_out_capturing_by_default: true | Llamar posthog.opt_in_capturing() despues de consentimiento |
| Feature flags undefined | Flags no cargados aun | Usar posthog.onFeatureFlags(callback) |
| 429 Too Many Requests | Rate limit API | Personal API key: 600 req/min. Reducir frecuencia |
| Session replay no graba | disable_session_recording: true | Verificar config o plan PostHog (replay requiere plan con replay) |

---

## Enlaces utiles

- **PostHog EU Dashboard:** https://eu.posthog.com
- **API Docs:** https://posthog.com/docs/api
- **Node SDK:** https://posthog.com/docs/libraries/node
- **JS SDK:** https://posthog.com/docs/libraries/js
- **Feature Flags:** https://posthog.com/docs/feature-flags
- **Session Replay:** https://posthog.com/docs/session-replay
- **Experiments:** https://posthog.com/docs/experiments
