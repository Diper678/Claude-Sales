---
name: sisteco-ops
description: >
  Operaciones y onboarding de [EMPRESA]: checklist completo de onboarding nuevo cliente
  (<48h), protocolo de incidentes por tiers, weekly CEO report, guía constitución SpA,
  variables de entorno, configuración de tenant multi-cliente. Reemplaza al Ops Manager.
triggers:
  - onboarding
  - cliente nuevo
  - setup
  - operaciones
  - proceso
  - SpA
  - SII setup
  - configurar cliente
  - nuevo cliente
  - checklist
  - ops
  - operations
  - protocolo
  - incidente
  - pipeline caído
  - configurar entorno
  - variables de entorno
  - weekly report
  - reporte semanal
  - tenant
  - multi-tenant
---

# [EMPRESA] Operations — Referencia Completa

> Reemplaza al Ops Manager. Cubre: onboarding clientes, incidentes, reportes, constitución SpA.
> Objetivo: cualquier operación ejecutable en < 48h sin contratar personal.

---

## 1. Checklist Onboarding Nuevo Cliente (< 48h)

### Hora 0 — Pago Confirmado (trigger: webhook Reveniu)

```
□ Verificar pago recibido en Reveniu dashboard
□ Crear organización en Clerk:
    → Clerk Dashboard > Organizations > Create
    → Nombre: "[EMPRESA] - [EMPRESA]"
    → Invitar email del cliente
□ Configurar tenant en Convex:
    → Agregar org en tabla `organizations` con metadata del cliente
    → Campos: nombre, plan, fechaInicio, icpDefault, discordWebhook
□ Activar instancia PhantomBuster para su ICP:
    → Copiar configuración ICP default
    → Ajustar keywords a su industria/cargo target
□ Configurar Discord webhook del cliente (si Plan Crecimiento/Enterprise):
    → Cliente crea canal #empresa-leads en su Discord
    → Comparte webhook URL
    → Actualizar en Convex: organizations.discordWebhook
□ Enviar email de bienvenida (template Sección 4)
□ Agendar sesión de onboarding (Calendly / WhatsApp)
```

### Día 1 — Primer Run (primeras 24h)

```
□ Ejecutar primer run de PhantomBuster manualmente:
    → PhantomBuster Dashboard > Phantom > Launch
□ Verificar que leads aparecen en Convex (tabla leads)
□ Confirmar que enriquecimiento está corriendo
□ Mostrar primeros leads en dashboard durante llamada
□ Compartir link al dashboard: [TU_APP_URL]/[slug-cliente]
```

### Día 2 — Sesión de Configuración (60 min)

**Agenda sesión de onboarding:**

| Tiempo | Tema |
|--------|------|
| 0-10 min | Tour del dashboard: cómo leer el pipeline, métricas clave |
| 10-25 min | Configurar ICP: industrias, cargos, tamaños, geografía |
| 25-40 min | Revisar primeros leads juntos: ¿son del perfil correcto? |
| 40-50 min | Ajustar pesos de scoring según feedback del cliente |
| 50-60 min | Discord alerts: configurar y probar en vivo |

**Ajustes de ICP durante sesión:**
```typescript
// Convex: icpProfiles:updateIcp
{
  orgId: "[ORG_ID]",
  industries: ["saas", "fintech", "manufactura"],  // ajustar según cliente
  minEmployees: 50,    // ajustar
  maxEmployees: 500,   // ajustar
  targetRoles: ["Director Comercial", "Gerente Ventas", "CEO"],  // ajustar
  weights: {
    industryFit: 0.25,
    companySize: 0.20,
    buyingIntent: 0.25,
    contactQuality: 0.15,
    techFit: 0.15
  }
}
```

### Día 7 — Primera Semana Review (30 min)

```
□ Revisar métricas de la primera semana:
    → Leads descubiertos total
    → HOT / WARM / NURTURE / SKIP breakdown
    → ¿El cliente contactó algún HOT lead? ¿Con qué resultado?
□ Ajustar scoring si el cliente da feedback "demasiados/pocos HOT"
□ Verificar que Discord está recibiendo alertas correctamente
□ Confirmar que el cliente sabe cómo marcar leads como "contactado"
□ Preguntar NPS / satisfacción → actualizar en Convex
□ Identificar industrias que están generando más HOT (ajustar keywords PB)
```

---

## 2. Variables de Entorno — Lista Completa

### n8n (tu-instancia.app.n8n.cloud > Settings > Variables)

| Variable | Valor | Estado |
|----------|-------|--------|
| `SAAN_CONVEX_SITE_URL` | `<desde Convex Dashboard>` | ⚠️ Configurar |
| `SAAN_API_SECRET` | `<desde Convex Dashboard>` | ⚠️ Configurar |
| `PHANTOMBUSTER_API_KEY` | `<desde PhantomBuster Dashboard>` | ⚠️ Configurar |
| `PB_LINKEDIN_AGENT_ID` | `<ID del phantom>` | ⚠️ Configurar |
| `PB_LINKEDIN_SEARCH_URL` | `<URL búsqueda LinkedIn>` | ⚠️ Opcional |
| `FIRECRAWL_API_KEY` | `<desde firecrawl.dev>` | ⚠️ Configurar |
| `SIMPLE_API_KEY` | `<desde SimpleAPI.cl>` | ❌ Pendiente |
| `DISCORD_WEBHOOK_URL` | `<webhook CEO>` | ❌ Pendiente |
| `GEMINI_API_KEY` | `<desde Google AI Studio>` | ❌ Pendiente |
| `RESEND_API_KEY` | `<desde Resend dashboard>` | ❌ Pendiente |

### Vercel (vercel.com > Project > Settings > Environment Variables)

| Variable | Descripción | Estado |
|----------|-------------|--------|
| `NEXT_PUBLIC_CONVEX_URL` | URL pública de Convex | ❌ Pendiente |
| `CONVEX_DEPLOY_KEY` | Para deploy desde CLI | ❌ Pendiente |
| `CLERK_SECRET_KEY` | Auth backend | ❌ Pendiente |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Auth frontend | ❌ Pendiente |
| `CLERK_JWT_ISSUER_DOMAIN` | Dominio JWT Clerk | ❌ Pendiente |
| `RESEND_API_KEY` | Email transaccional | ❌ Pendiente |
| `REVENIU_LINK_BASE_MONTHLY` | Link pago Plan Inicio | ❌ Pendiente |
| `REVENIU_LINK_GROWTH_MONTHLY` | Link pago Plan Crecimiento | ❌ Pendiente |

### Convex Dashboard ([TU_CONVEX_URL] > Settings > Environment Variables)

| Variable | Descripción | Estado |
|----------|-------------|--------|
| `SAAN_API_SECRET` | Secreto compartido con n8n | ⚠️ Verificar |
| `GEMINI_API_KEY` | Para funciones Convex con IA | ❌ Pendiente |
| `RESEND_API_KEY` | Para emails desde Convex | ❌ Pendiente |

---

## 3. Protocolo de Incidentes

### Tier 1 — Self-Fix < 15 min (problemas comunes)

**PhantomBuster sin resultados:**
1. Ir a PhantomBuster Dashboard > phantom > Setup
2. Click "Re-connect" (renueva cookie LinkedIn li_at)
3. Si falla: hacer warm-up manual en LinkedIn (browsear, buscar perfiles 15 min)
4. Relanzar phantom manualmente

**n8n workflow no ejecuta:**
1. Verificar que el workflow está en estado "Active"
2. Revisar n8n > Executions > últimas ejecuciones (buscar errores rojos)
3. Verificar variables de entorno en n8n > Settings > Variables
4. Ejecutar manualmente: click "Run now" en el workflow

**Discord sin alertas:**
1. Probar webhook manualmente:
   ```bash
   curl -X POST "${DISCORD_WEBHOOK_URL}" -H "Content-Type: application/json" \
   -d '{"content": "Test de alerta [EMPRESA]"}'
   ```
2. Si falla 404: webhook fue eliminado → crear nuevo webhook en Discord
3. Actualizar variable `DISCORD_WEBHOOK_URL` en n8n

**Convex 403/401:**
1. Verificar `X-SAAN-Secret` en n8n coincide exactamente con Convex env var
2. Verificar función en allowlist de `http.ts`
3. Revisar Convex Dashboard > Logs

### Tier 2 — Debug < 1 hora

**Pipeline no procesa leads (enrichment/scoring atascado):**
1. Convex Dashboard > Data > leads → verificar status de leads
2. Si hay leads en status "new" hace > 4h: enrichment no está corriendo
3. n8n > saan-leads-enrich > Run manually → verificar error
4. Si error Firecrawl: verificar créditos restantes en firecrawl.dev
5. Si error Convex: revisar logs en Convex Dashboard > Logs

**Leads no aparecen en dashboard:**
1. Verificar que Convex tiene datos: `leads:getLeadsStats` query
2. Si hay datos en Convex pero no en dashboard: problema de frontend
3. Revisar Vercel logs: vercel.com > Project > Deployments > Functions
4. Revisar errores en browser console

**Score incorrecto (todos SKIP o todos HOT):**
1. Revisar ICP profile en Convex: `icpProfiles:getIcpForScoring`
2. Verificar que los pesos suman 1.0
3. Revisar prompt de scoring en workflow n8n
4. Hacer test con lead manual (ver Sección 7 sales-pipeline.md)

### Tier 3 — Escalar (cliente afectado)

**Si un cliente afectado espera:**
1. Notificar al cliente en < 2 horas:
   ```
   Hola [NOMBRE], estamos al tanto de un problema técnico que afecta
   tu pipeline en [EMPRESA]. Estamos trabajando en la solución y
   te damos un ETA actualizado en [1-2 HORAS]. Disculpa las molestias.
   [TU_NOMBRE], [TU_EMPRESA]
   ```
2. Documentar incidente en Convex: tabla `incidents`
3. Si no se resuelve en 4h: activar modo manual (exportar leads de PhantomBuster
   directamente como CSV y enviar al cliente por email)
4. Post-incidente: enviar resumen al cliente + crédito de servicio si aplica SLA

---

## 4. Templates de Email Transaccional

### Email Bienvenida (Hora 0)

**Asunto:** Bienvenido a [EMPRESA] — tu pipeline B2B está listo

```
Hola [NOMBRE],

¡Bienvenido a [EMPRESA]! Tu cuenta ya está activa.

En las próximas 48 horas vamos a:
✅ Configurar tu ICP (Perfil de Cliente Ideal)
✅ Activar el pipeline de PhantomBuster
✅ Mostrar los primeros leads en tu dashboard

Tu acceso: [LINK_DASHBOARD]
Usuario: [EMAIL]

También te invito a agendar la sesión de onboarding (60 min):
[CALENDLY_LINK]

Cualquier pregunta, estoy disponible directo:
WhatsApp: [TU_TELEFONO]
Email: [TU_EMAIL]

[TU_NOMBRE]
[TU_CARGO], [TU_EMPRESA]
```

### Email Primera Semana Review

**Asunto:** Tu primera semana en [EMPRESA] — resultados y próximos pasos

```
Hola [NOMBRE],

Esta fue tu primera semana con [EMPRESA]:

📊 RESUMEN SEMANA 1
• Leads descubiertos: [N]
• Leads HOT (score > 80): [N]
• Leads WARM (score 50-80): [N]
• Pipeline value estimado: $[X]

[Si hubo HOT leads:]
Los mejores leads de la semana:
• [NOMBRE] — [CARGO] @ [EMPRESA] (Score: [X])
• [NOMBRE] — [CARGO] @ [EMPRESA] (Score: [X])

¿Pudiste contactar alguno? Si me das feedback sobre la calidad,
ajusto el scoring esta semana.

Hablamos el [DÍA] a las [HORA] para el check-in.

[TU_NOMBRE]
```

---

## 5. Workflow n8n: sisteco-weekly-ceo-report

**Cron:** `0 20 * * 5` (viernes 17:00 Chile = 20:00 UTC)

**Flujo:**
```
Cron trigger (viernes 17:00 Chile)
  → GET Convex: leads stats semana actual vs semana anterior
  → GET Convex: HOT leads nuevos esta semana (detalle)
  → GET Convex: leads contactados esta semana
  → GET Convex: pipeline value (HOT + WARM × ticket promedio)
  → Calcular: variación semana vs semana anterior (JS Code node)
  → Calcular: mejor industria de la semana
  → Formatear reporte ejecutivo (Markdown)
  → POST Discord webhook CEO #empresa-ops
  → POST Resend: email CEO con reporte
```

**Template reporte:**
```markdown
# 📊 SISTECO — REPORTE SEMANAL [FECHA]

## Pipeline esta semana
| Métrica | Esta semana | Semana anterior | Δ |
|---------|------------|-----------------|---|
| Leads nuevos | [N] | [N] | [+/-X%] |
| Leads HOT | [N] | [N] | [+/-X%] |
| Leads contactados | [N] | [N] | [+/-X%] |
| Pipeline value | $[X] | $[X] | [+/-X%] |

## 🔥 HOT Leads esta semana
[LISTA DE HOT LEADS CON: nombre, cargo, empresa, score, LinkedIn URL]

## 💡 Industria con mejor performance
[INDUSTRIA]: [N] HOT leads ([X]% del total)

## ⚡ Acción recomendada
[TEXTO GENERADO POR IA BASADO EN LOS DATOS]

---
Próximo reporte: [FECHA + 7 DÍAS] | Generado automáticamente por [EMPRESA]
```

---

## 6. Workflow n8n: sisteco-client-onboarding (automático)

**Trigger:** Webhook de Reveniu al confirmar nuevo suscriptor

**Flujo:**
```
Webhook trigger (Reveniu payment confirmed)
  → Parse webhook: extraer email, plan, monto, nombre empresa
  → POST Convex: organizations:createOrg
      → campos: nombre, plan, email, fechaInicio, estado: "onboarding"
  → POST Convex: icpProfiles:createDefaultIcp
      → crear ICP con configuración default de [EMPRESA]
  → POST Resend: enviar email de bienvenida (template Sección 4)
  → POST Discord CEO webhook: nuevo cliente
      → "🎉 NUEVO CLIENTE: [EMPRESA] — Plan [PLAN] — $[PRECIO]/mes"
  → POST Clerk API: crear organización + invitar email
  → Actualizar Convex: organizations.clerkOrgId
```

---

## 7. Schema Convex Multi-tenant

```typescript
// Tabla: organizations (cada cliente de [EMPRESA])
{
  nombre: string,
  plan: "inicio" | "crecimiento" | "enterprise",
  priceUSD: number,
  status: "onboarding" | "active" | "churned" | "paused",
  fechaInicio: number,         // timestamp
  clerkOrgId: string,          // para auth
  discordWebhook: string | null,
  emailContacto: string,
  icpProfileId: Id<"icpProfiles">,
  // Métricas
  totalLeads: number,
  hotLeadsThisWeek: number,
  lastActiveAt: number,
}

// Tabla: icpProfiles (configuración por cliente)
{
  orgId: Id<"organizations">,
  name: string,
  industries: string[],
  minEmployees: number,
  maxEmployees: number,
  targetRoles: string[],
  locations: string[],         // default: ["Chile"]
  weights: { ... },
  isActive: boolean,
}

// Tabla: incidents (log de incidentes)
{
  orgId: Id<"organizations"> | null,  // null = sisteco interno
  tier: 1 | 2 | 3,
  description: string,
  status: "open" | "investigating" | "resolved",
  resolvedAt: number | null,
  resolutionNote: string | null,
}

// Tabla: optOuts (GDPR/Ley 21.719)
{
  email: string,
  empresa: string | null,
  requestedAt: number,
  source: "email" | "form" | "manual",
}
```

---

## 8. Guía Constitución SpA — Paso a Paso Detallado

**Ver también:** sisteco-finance.md Sección 9 (versión resumida)

### Checklist completo

```
ANTES DE EMPEZAR:
□ Nombre empresa elegido: "[EMPRESA] SpA" (verificar disponibilidad en REyS)
□ Capital inicial: mínimo $1.000.000 CLP (puede ser en trabajo/servicios)
□ ClaveÚnica activa (para firma digital en línea)
□ Cuenta corriente personal para recibir capital

PASO 1 — REGISTRO (gratis, online):
□ Ir a www.registrodeempresasysociedades.cl
□ Click "Crear empresa" > "SpA" (Sociedad por Acciones)
□ Completar formulario:
    - Nombre: [EMPRESA] SpA
    - Objeto social: "Desarrollo y comercialización de software, plataformas
      digitales y servicios de automatización empresarial. También podrá
      realizar cualquier otra actividad lícita."
    - Capital: $1.000.000 CLP
    - Socios: [TU_NOMBRE] [Apellido], RUT XX.XXX.XXX-X (100% acciones)
    - Domicilio social: Las Condes, Santiago
□ Firma digital con ClaveÚnica
□ Guardar escritura en PDF

PASO 2 — SII (24-48h hábiles):
□ Esperar email con RUT empresa (automático del REyS)
□ Ir a misiir.sii.cl con RUT empresa
□ Formulario 4415 — Inicio de actividades
□ Giro principal: "7220 - Otras actividades de tecnología de la información"
□ Actividad secundaria: "7430 - Publicidad"
□ Contribuyente IVA: SÍ
□ Tipo de contabilidad: Completa (con contador) o Simplificada

PASO 3 — CUENTA BANCARIA (1-5 días hábiles):
□ Opción A: BCI Empresa (requiere visita presencial + documentos)
    - Documentos: RUT empresa, escritura SpA, cédula fundador
□ Opción B: Mercado Pago Empresa (100% online, más rápido)
    - Solo RUT empresa + cédula

PASO 4 — FOLIOS DTE:
□ misiir.sii.cl > Servicios Online > Factura Electrónica
□ Solicitar autorización como emisor
□ Pedir folios:
    - Boleta Electrónica (Tipo 39): 200 folios
    - Factura Electrónica (Tipo 33): 100 folios
□ Instalar software tributario o conectar LibreDTE API

PASO 5 — LibreDTE (facturación gratis hasta 500 DTE/mes):
□ Crear cuenta en libredte.cl con RUT empresa
□ Autorizar emisión DTE con clave SII
□ Configurar datos emisor
□ Obtener API token
□ Agregar a n8n variable: LIBREDTE_API_TOKEN
```

---

## 9. Dashboard KPIs — Definiciones

| KPI | Definición | Fuente | Frecuencia |
|-----|-----------|--------|-----------|
| MRR | Suma de suscripciones activas en USD/mes | Convex: organizations.plan | Diario |
| Leads nuevos | Leads creados en últimos 7 días | Convex: leads (status=new) | Diario |
| HOT leads | Leads con scoreCategory=HOT | Convex: leads | Tiempo real |
| Pipeline value | HOT leads × ticket promedio | Calculado: HOT × $[TICKET_PROMEDIO] | Semanal |
| Conversion rate | Leads contactados que respondieron / total contactados | Convex: leads (status) | Semanal |
| Churn rate | Suscripciones canceladas / total activas × 100 | Convex: organizations | Mensual |
| CAC | Costo total adquisición / nuevos clientes | Manual (costos Reveniu + tiempo) | Mensual |
| LTV | MRR promedio × vida útil promedio (meses) | Calculado | Trimestral |

---

## 10. Protocolo Salida de Cliente (Offboarding)

```
□ Verificar fecha de cancelación en Reveniu
□ Exportar todos los datos del cliente de Convex (JSON)
□ Enviar exportación al cliente por email (+ 30 días post-cancelación)
□ Eliminar datos de Convex en plazo prometido (30 días)
□ Certificar eliminación por escrito
□ Desactivar webhook Discord del cliente
□ Actualizar status en Convex: organizations.status = "churned"
□ Registrar motivo de churn para aprendizaje

Email de offboarding:
Asunto: Tu exportación de datos de [EMPRESA] — [EMPRESA]

"Hola [NOMBRE], adjunto la exportación completa de tus datos en
[EMPRESA] (leads, scores, actividad). Tus datos serán eliminados
de nuestros sistemas el [FECHA + 30 DÍAS]. Gracias por confiar
en [EMPRESA]. [TU_NOMBRE]"
```

---

*Skill actualizado: 2026-03-11 | Reemplaza Ops Manager ($600K-1M CLP/mes)*
