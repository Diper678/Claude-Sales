---
name: sisteco-finance
description: >
  Gestión financiera completa de Sisteco: facturación DTE, declaración IVA (F29),
  P&L mensual desde Convex, MRR/churn tracking, costos fijos y variables,
  procesadores de pago CLP, obligaciones tributarias Chile. Reemplaza al contador.
triggers:
  - factura
  - contabilidad
  - IVA
  - P&L
  - cobros
  - tesorería
  - financial report
  - flujo de caja
  - declaración
  - DTE
  - Formulario 29
  - estado financiero
  - MRR
  - ingresos
  - gastos
  - balance
  - finanzas
  - tributario
  - SII contribuyente
  - impuesto
  - LibreDTE
  - Bsale
  - facturación electrónica
  - cobro cliente
  - facturar
---

# Sisteco Finance — Referencia Completa

> Reemplaza al contador externo. Cubre: DTE, IVA, P&L, MRR, costos, pagos.
> Todo en el contexto de empresa SaaS B2B Chile, sin SpA constituida aún (mar-2026).

---

## 1. Estado Financiero Actual (snapshot mar-2026)

```
MRR:         $0 USD (0 clientes pagando)
Burn rate:   $144 USD/mes
Break-even:  1 cliente (Plan Inicio $397/mes)

COSTOS FIJOS ($65/mes):
  Vercel:    $20/mes
  Convex:    $25/mes
  Dominio:   $10/mes
  n8n Cloud: $10/mes

COSTOS VARIABLES ($79/mes actual):
  PhantomBuster: $69/mes
  Gemini API:    ~$10/mes
  Firecrawl:     $0 (free tier)
  SimpleAPI:     $0 (free tier)

TOTAL ACTUAL:  $144/mes
TOTAL CON SALES NAV: $243/mes (upgrade cuando 3+ clientes)
```

---

## 2. Planes y Precios

| Plan | Precio Normal | Precio Fundadores (40% off) | Target Revenue |
|------|--------------|----------------------------|----------------|
| Inicio | $397/mes | $239/mes | Break-even = 1 cliente |
| Crecimiento | $797/mes | $479/mes | 2x break-even = 1 cliente |
| Enterprise | $1,800/mes | $1,080/mes | 12.5x break-even = 1 cliente |

**Margen bruto diseñado:** 72-82% (SaaS estándar)

**Upgrade a Sales Nav trigger:** 3+ clientes pagando O conversión < 2%

---

## 3. Procesadores de Pago Chile

### Reveniu (actual — recomendado para arrancar)
- **Tipo:** Quick-start para SaaS/suscripciones
- **Comisión:** ~4.5% + IVA sobre comisión
- **Moneda:** CLP y USD
- **Setup:** Sin SpA requerida inicialmente
- **Variables n8n pendientes:**
  - `REVENIU_LINK_BASE_MONTHLY` — link de pago Plan Inicio
  - `REVENIU_LINK_GROWTH_MONTHLY` — link de pago Plan Crecimiento
- **Dashboard:** reveniu.com — ver suscripciones, MRR, churn
- **Webhook:** Configurar en Reveniu para trigger n8n onboarding automático

### dLocal Go (upgrade — requiere SpA)
- **Comisión:** 3.56%
- **Requiere:** Entidad legal constituida (SpA)
- **Ventaja:** Menor comisión, mejor para > $10K MRR
- **Activar cuando:** SpA constituida + $5K+ MRR

### Paddle (alternativa Merchant of Record)
- **Comisión:** 5% + $0.50/transacción
- **Ventaja:** Paddle maneja IVA de clientes internacionales, no requiere SpA
- **Ideal para:** clientes LATAM fuera de Chile
- **Sin factura DTE:** Paddle emite sus propios recibos

### Fintoc (A2A — cuenta bancaria a cuenta)
- **Comisión:** 0.5-1%
- **Disponible:** Julio 2026
- **Ideal para:** facturas de alto valor (Enterprise $1,800)
- **Requiere:** Cuenta bancaria empresarial

---

## 4. Facturación DTE (Documentos Tributarios Electrónicos)

**IMPORTANTE:** Sin SpA constituida, no se pueden emitir DTE propios.
Opciones mientras no hay SpA:
1. Usar Paddle como Merchant of Record (ellos emiten el recibo)
2. Cobrar en USD via Reveniu (boleta de honorarios persona natural)
3. Constituir SpA primero (ver sección 9)

### Cuando tengas SpA: LibreDTE (recomendado — gratis hasta 500 DTE/mes)

**URL:** https://www.libredte.cl
**Docs API:** https://developers.libredte.cl

#### Setup LibreDTE
1. Registrarse con RUT empresa
2. Conectar con SII (requiere clave SII empresa)
3. Obtener API token
4. Configurar en n8n variable `LIBREDTE_API_TOKEN`

#### API: Emitir Boleta Electrónica (Tipo 39)

```bash
POST https://libredte.cl/api/dte/documentos/emitir
Authorization: Bearer <LIBREDTE_API_TOKEN>
Content-Type: application/json

{
  "emisor": {
    "rut": "XX.XXX.XXX-X",
    "razon_social": "SISTECO SPA",
    "giro": "Desarrollo y Comercialización de Software",
    "direccion": "Las Condes, Santiago",
    "comuna": "Las Condes",
    "region": "13"
  },
  "receptor": {
    "rut": "<RUT_CLIENTE>",
    "razon_social": "<NOMBRE_EMPRESA>",
    "email": "<EMAIL_CLIENTE>"
  },
  "dte": {
    "tipo_dte": 39,
    "fecha_emision_date": "2026-04-01",
    "receptor": { ... },
    "detalle": [
      {
        "nombre": "Sisteco Plan Inicio - Abril 2026",
        "cantidad": 1,
        "precio": 397,
        "unidad": "MES"
      }
    ]
  }
}
```

#### API: Emitir Factura Electrónica (Tipo 33) — para empresas con RUT

```bash
# Mismo endpoint, cambiar tipo_dte: 33
# Requiere datos del receptor (RUT empresa, giro, dirección)
```

#### Alternativa: Bsale
- **Precio:** Desde $30.000 CLP/mes
- **Ventaja:** UI más simple, ideal para menos de 10 facturas/mes
- **API:** https://developers.bsale.cl

---

## 5. Declaración IVA Mensual (Formulario 29 SII)

**Frecuencia:** Mensual, entre días 1-12 del mes siguiente
**Tasa IVA:** 19%

### Cómo calcular (P&L simplificado)

```
INGRESOS DEL MES:
  Total cobros (neto): $XX.XXX CLP
  IVA débito (19%):    $XX.XXX CLP
  Total con IVA:       $XX.XXX CLP

GASTOS DEL MES (con factura):
  Vercel (USD → CLP): $20 × TCM = $XX.XXX
  Convex (USD → CLP): $25 × TCM = $XX.XXX
  n8n Cloud:          $10 × TCM = $XX.XXX
  PhantomBuster:      $69 × TCM = $XX.XXX
  Dominio:            $10 × TCM = $XX.XXX
  IVA crédito (19% sobre gastos con factura): $XX.XXX

IVA A PAGAR: IVA débito - IVA crédito = $X.XXX CLP
```

### Presentar F29
1. Entrar a misiir.sii.cl con clave tributaria
2. Formularios → F29 → Período correspondiente
3. Ingresar débitos y créditos
4. Pagar en TGR si hay saldo a favor del SII

**Nota:** Servicios de proveedores extranjeros (Vercel, Convex, Heroku) generan IVA de importación de servicios digitales. El SII puede requerir declaración adicional. Consultar con contador cuando MRR > $1M CLP/mes.

---

## 6. P&L Mensual — Template

```markdown
# P&L Sisteco — [MES] [AÑO]

## INGRESOS
| Cliente | Plan | USD | CLP (TCM) |
|---------|------|-----|-----------|
| [nombre] | Inicio | $239 | $XXX.XXX |
| TOTAL | | $XXX | $XXX.XXX |

## COSTOS FIJOS
| Ítem | USD | CLP |
|------|-----|-----|
| Vercel | $20 | $XX.XXX |
| Convex | $25 | $XX.XXX |
| n8n Cloud | $10 | $XX.XXX |
| Dominio | $10 | $XX.XXX |
| SUBTOTAL FIJOS | $65 | $XX.XXX |

## COSTOS VARIABLES
| Ítem | USD | CLP |
|------|-----|-----|
| PhantomBuster | $69 | $XX.XXX |
| Gemini API | ~$10 | $XX.XXX |
| Firecrawl extras | $0-5 | $0-XXX |
| SUBTOTAL VARIABLES | $79-84 | $XX.XXX |

## RESUMEN
| Métrica | USD | CLP |
|---------|-----|-----|
| Ingresos totales | $XXX | $XXX.XXX |
| Costos totales | $144-149 | $XX.XXX |
| **EBITDA** | **$XXX** | **$XXX.XXX** |
| Margen bruto | XX% | — |

## MRR TRACKER
- MRR inicio mes: $XXX
- Nuevos clientes: +$XXX
- Churn: -$XXX
- MRR fin mes: $XXX
- Churn rate: X.X%
```

---

## 7. Tracking MRR/Churn en Convex

### Schema recomendado: tabla `subscriptions`

```typescript
{
  clientId: Id<"clients">,
  plan: "inicio" | "crecimiento" | "enterprise",
  priceUSD: number,
  priceCLP: number,
  status: "active" | "churned" | "paused",
  startDate: number,       // timestamp
  endDate: number | null,  // null si activo
  churnReason: string | null,
  reveniuSubscriptionId: string | null,
}
```

### Queries Convex para reporte mensual

```typescript
// MRR actual
const activeSubs = await ctx.db.query("subscriptions")
  .filter(q => q.eq(q.field("status"), "active"))
  .collect();
const mrr = activeSubs.reduce((sum, s) => sum + s.priceUSD, 0);

// Churn del mes
const churned = await ctx.db.query("subscriptions")
  .filter(q => q.and(
    q.eq(q.field("status"), "churned"),
    q.gte(q.field("endDate"), startOfMonth),
    q.lt(q.field("endDate"), endOfMonth)
  ))
  .collect();
const churnedMRR = churned.reduce((sum, s) => sum + s.priceUSD, 0);
```

---

## 8. Workflow n8n: sisteco-monthly-finance-report

**Cron:** `0 8 1 * *` (1ro de cada mes 08:00 Chile = 11:00 UTC en horario estándar)

**Flujo:**
```
Cron trigger (1ro del mes)
  → GET Convex: suscripciones activas (MRR)
  → GET Convex: churn del mes anterior
  → GET Convex: nuevos clientes del mes anterior
  → GET costos fijos tabla (hardcoded: $144/mes)
  → Calcular P&L (JS Code node)
  → Formatear reporte Markdown
  → POST Discord webhook CEO
  → POST Resend: email CEO con P&L adjunto
```

**Plantilla mensaje Discord:**
```
📊 **P&L SISTECO — [MES ANTERIOR]**
💰 MRR: $XXX USD
📈 Nuevos clientes: X (+$XXX)
📉 Churn: X (-$XXX)
💸 Costos totales: $144 USD
✅ EBITDA: $XXX USD (XX% margen)
📋 Reporte completo en email
```

---

## 9. Constitución SpA — Paso a Paso

**Costo estimado:** $300-500 USD equivalente en CLP
**Tiempo:** 24-48 horas hábiles

### Pasos

1. **registrodeempresasysociedades.cl**
   - Ir a "Crear empresa" → "SpA"
   - Rellenar: nombre "SISTECO SpA", capital ($1.000.000 CLP mínimo), objeto social, socios
   - Objeto social recomendado: "Desarrollo y comercialización de software, plataformas digitales y servicios de automatización empresarial"
   - Firma digital con ClaveÚnica

2. **SII — Inicio de actividades**
   - Entrar a misiir.sii.cl con RUT empresa (se genera al crear SpA)
   - Formulario 4415 — Inicio de actividades
   - Giro: "7220 - Otras actividades de tecnología de la información y de servicios informáticos"
   - Actividad: Contribuyente IVA = Sí

3. **Cuenta bancaria empresarial**
   - BCI: cuenta corriente empresarial (requiere RUT + documentos constitución)
   - Banco de Chile: alternativa
   - Mercado Pago: opción rápida sin visita presencial

4. **Folios DTE**
   - SII → Servicios Online → Factura Electrónica → Autorizar Documentos
   - Solicitar folios Boleta Electrónica (Tipo 39) y Factura Electrónica (Tipo 33)

5. **LibreDTE setup**
   - Crear cuenta en libredte.cl con RUT empresa
   - Autorizar emisión DTE con certificado digital SII
   - Obtener API token

---

## 10. Obligaciones Tributarias Recurrentes

| Obligación | Frecuencia | Plazo | Sistema |
|-----------|------------|-------|---------|
| Formulario 29 (IVA) | Mensual | Días 1-12 del mes siguiente | misiir.sii.cl |
| Formulario 22 (Renta) | Anual | Abril | misiir.sii.cl |
| Cotizaciones dueño (si se paga renta) | Mensual | Día 10 | previred.com |
| Libros electrónicos | Mensual | Día 15 | LibreDTE |

---

## 11. Quick Reference — TCM Mensual

Tipo de cambio de mercado (TCM) para convertir USD → CLP.
- **Fuente oficial:** SII actualiza TCM mensual en sii.cl
- **Alternativa rápida:** usar CLP/USD del día de la transacción (Banco Central o Google)
- Para efectos del F29, usar TCM del mes en que se realizó la operación

---

*Skill actualizado: 2026-03-11 | Reemplaza contador externo ($200-400K CLP/mes)*
