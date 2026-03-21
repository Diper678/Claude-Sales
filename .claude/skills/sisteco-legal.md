---
name: sisteco-legal
description: >
  Compliance legal completo de Sisteco: contratos de servicio, DPA Ley 21.719,
  política de privacidad, términos y condiciones, RAT, bases legales B2B,
  checklist compliance por prioridad, sanciones. Reemplaza al abogado.
triggers:
  - contrato
  - DPA
  - compliance
  - Ley 21.719
  - privacidad
  - términos
  - acuerdo
  - NDA
  - legal
  - RGPD
  - consentimiento
  - opt-out
  - datos personales
  - política privacidad
  - términos y condiciones
  - RAT
  - interés legítimo
  - protección datos
  - GDPR Chile
  - bases legales
  - derechos titular
  - DPO
  - EIA
  - EIPD
---

# Sisteco Legal & Compliance — Referencia Completa

> Reemplaza al abogado/compliance externo. Cubre: Contratos, DPA, Ley 21.719, privacidad.
> Chile. Derecho aplicable: Ley 19.628 (vigente) + Ley 21.719 (en implementación, vigor dic-2026).

---

## 1. Estado Compliance (mar-2026)

```
Ley 21.719: Promulgada. Vigor: diciembre 2026.
Estado Sisteco:
  ✅ Conocimiento de la ley (este skill)
  ❌ Inventario de datos → pendiente
  ❌ RAT (Registro Actividades de Tratamiento) → pendiente
  ❌ Política privacidad publicada → pendiente
  ❌ DPA con clientes → pendiente
  ❌ SCCs con proveedores cloud → pendiente
  ❌ Portal derechos titular → pendiente
  ❌ Sistema opt-out → pendiente
  ❌ EIPD para scoring IA → pendiente

Sanciones máximas Ley 21.719:
  - Hasta 20.000 UTM (~$1.39M USD) o
  - 2-4% de facturación anual (lo que sea mayor)
  - Autoridad: Agencia de Protección de Datos Personales (APDP)
```

---

## 2. Checklist Compliance Ley 21.719 por Prioridad

### P1 — Antes de septiembre 2026 (crítico)

- [ ] **Inventario de datos:** mapear qué datos recopila Sisteco, de quién, para qué
- [ ] **RAT (Registro de Actividades de Tratamiento):** completar plantilla (ver sección 8)
- [ ] **Test de ponderación de interés legítimo:** para prospectos B2B (ver sección 5)
- [ ] **Política de privacidad:** publicar en sisteco.cl (ver template sección 6)
- [ ] **DPA con clientes:** antes de onboarding de primer cliente (ver template sección 3)
- [ ] **SCCs con proveedores cloud:** Convex (USA), Vercel (USA), Clerk (USA), Resend (USA)
- [ ] **Sistema opt-out:** botón en emails + registro en Convex tabla `optOuts`
- [ ] **Portal derechos del titular:** formulario en sisteco.cl/privacidad

### P2 — Antes de noviembre 2026

- [ ] **Schema Convex compliance:** campos `consentimiento`, `fuenteOrigen`, `fechaExpiracion`
- [ ] **Retención automática:** purge leads SKIP > 90 días + enriquecidos > 3 años
- [ ] **EIPD:** evaluación de impacto para scoring IA Gemini (ver sección 9)
- [ ] **Protocolo de incidentes de seguridad:** notificar APDP en 72h y titular afectado
- [ ] **DPO externo:** contratar asesor ($500K-1.5M CLP/mes) — Q3 2026
- [ ] **Lista negra opt-outs:** sincronizar con PhantomBuster y secuencias email

---

## 3. Template: Contrato de Servicio Sisteco

```markdown
CONTRATO DE PRESTACIÓN DE SERVICIOS DE SOFTWARE
Sisteco — Plataforma de Automatización de Ventas B2B

Santiago de Chile, [FECHA]

ENTRE:
PRESTADOR: [SISTECO SpA / Felipe [Apellido], RUT XX.XXX.XXX-X]
  Domicilio: Las Condes, Santiago de Chile
  Email: contacto@sisteco.cl
  Teléfono: +56 9 40065566

CLIENTE: [RAZÓN SOCIAL EMPRESA]
  RUT: [XX.XXX.XXX-X]
  Representante Legal: [NOMBRE]
  Cargo: [CARGO]
  Domicilio: [DIRECCIÓN]
  Email: [EMAIL]

SE ACUERDA LO SIGUIENTE:

## CLÁUSULA 1 — OBJETO DEL CONTRATO

Sisteco se compromete a prestar al Cliente los servicios de automatización
de prospección y ventas B2B descritos en el Plan [INICIO / CRECIMIENTO /
ENTERPRISE] elegido por el Cliente, según los términos de este contrato.

Los servicios incluyen:
- Plataforma de pipeline de leads automatizado
- Dashboard de ventas con inteligencia artificial
- Scoring y calificación de prospectos
- Alertas en tiempo real (Discord/email)
- Soporte técnico vía email (respuesta < 24h hábiles)
- [Plan Crecimiento/Enterprise: onboarding dedicado 60 min]
- [Plan Enterprise: account manager dedicado, SLA 99.5%]

## CLÁUSULA 2 — PRECIO Y FORMA DE PAGO

El Cliente pagará a Sisteco la suma de USD $[PRECIO] más IVA (19%) mensual
= USD $[PRECIO×1.19] o su equivalente en CLP según tipo de cambio del día
de facturación.

Forma de pago: débito automático mensual mediante [Reveniu / Fintoc / Transferencia]
Ciclo: mensual, el día [DÍA] de cada mes.

[Si aplica Plan Fundadores:]
Precio Fundadores (40% descuento permanente durante primeros 12 meses):
USD $[PRECIO_FUNDADORES] + IVA = USD $[PRECIO_FUNDADORES×1.19]
Aplicable desde [FECHA INICIO] hasta [FECHA - 12 MESES].

## CLÁUSULA 3 — VIGENCIA

Este contrato entra en vigencia el [FECHA DE INICIO] y se renueva
automáticamente mes a mes, salvo que cualquiera de las partes notifique
por escrito su intención de no renovar con 30 días de anticipación.

## CLÁUSULA 4 — GARANTÍA 30 DÍAS

Sisteco garantiza satisfacción completa durante los primeros 30 días.
Si el Cliente no está satisfecho por cualquier razón, se reembolsará
el 100% del pago del primer mes sin preguntas.

## CLÁUSULA 5 — DATOS PERSONALES (Ley 21.719)

5.1 ROL DE LAS PARTES: Las partes acuerdan que:
- Sisteco actúa como RESPONSABLE del tratamiento de datos de prospectos
  captados mediante sus herramientas de prospección (PhantomBuster, SII, etc.)
- Cuando el Cliente provee sus propios datos de contactos, el Cliente actúa
  como Responsable y Sisteco como Encargado (Data Processor)

5.2 BASE LEGAL: El tratamiento de datos de prospectos B2B se basa en:
(a) Interés legítimo (Art. 13 Ley 21.719): captación de leads de empresas
    con más de 50 empleados con cargos de decisión comercial
(b) Contrato: datos necesarios para la prestación del servicio contratado

5.3 OBLIGACIONES DE SISTECO:
- Implementar medidas técnicas y organizativas adecuadas
- No transferir datos a terceros sin consentimiento, salvo proveedores
  operativos (ver DPA adjunto)
- Notificar incidentes de seguridad en plazo legal (72h a APDP)
- Respetar solicitudes de derechos: acceso, rectificación, supresión,
  portabilidad, oposición

5.4 OBLIGACIONES DEL CLIENTE:
- No compartir credenciales de acceso
- Notificar a Sisteco si recibe solicitudes de derechos de titulares

## CLÁUSULA 6 — CONFIDENCIALIDAD

Las partes se comprometen a mantener confidencial toda información técnica,
comercial y estratégica que intercambien durante la vigencia del contrato y
por 2 años posteriores. Queda excluida la información que sea de dominio público.

## CLÁUSULA 7 — LÍMITE DE RESPONSABILIDAD

La responsabilidad total de Sisteco bajo este contrato no excederá el
equivalente a 3 meses de suscripción pagada por el Cliente.
Sisteco no será responsable por lucro cesante, pérdida de oportunidad
de negocio o daños indirectos.

## CLÁUSULA 8 — PROPIEDAD INTELECTUAL

Sisteco retiene todos los derechos de propiedad intelectual sobre la
plataforma, algoritmos y código. El Cliente recibe una licencia de uso
no exclusiva durante la vigencia del contrato.

Los datos y leads generados para la cuenta del Cliente son propiedad
del Cliente y serán entregados en formato exportable al término del contrato.

## CLÁUSULA 9 — INCUMPLIMIENTO Y TÉRMINO ANTICIPADO

Causales de término anticipado:
- Falta de pago por más de 15 días corridos
- Violación de los términos de uso (uso no autorizado, scraping de datos de Sisteco)
- Solicitud escrita con 30 días de aviso

## CLÁUSULA 10 — LEY APLICABLE Y JURISDICCIÓN

Este contrato se rige por las leyes de la República de Chile.
Cualquier controversia se someterá a arbitraje conforme a las
reglas del Centro de Arbitraje y Mediación de Santiago (CAM Santiago).

---

FIRMA PRESTADOR:                    FIRMA CLIENTE:
_______________________             _______________________
[Nombre Sisteco]                    [Nombre Representante Legal]
RUT: XX.XXX.XXX-X                   RUT: XX.XXX.XXX-X
Fecha:                              Fecha:
```

---

## 4. Template: DPA (Data Processing Agreement) Ley 21.719

```markdown
ACUERDO DE TRATAMIENTO DE DATOS PERSONALES (DPA)
Conforme a Ley 21.719 sobre Protección de Datos Personales (Chile)

Entre Sisteco (Encargado) y [EMPRESA CLIENTE] (Responsable)
Fecha: [FECHA]

## 1. OBJETO

Este DPA regula el tratamiento de datos personales que el Responsable
encomienda al Encargado en el contexto de los servicios de la plataforma
Sisteco (pipeline de leads, dashboard, scoring).

## 2. DATOS TRATADOS

| Categoría | Tipos de datos | Propósito | Plazo retención |
|-----------|---------------|-----------|-----------------|
| Prospectos B2B | Nombre, cargo, email, LinkedIn, empresa, RUT empresa | Pipeline de ventas | 3 años o hasta opt-out |
| Datos empresa | RUT, giro SII, tamaño, industria | Scoring y calificación | 3 años |
| Interacciones | Estado contacto, fechas, respuestas | Seguimiento pipeline | 3 años |

**Datos que NO se tratan:**
- Datos sensibles (salud, origen étnico, religión, opiniones políticas)
- Datos de personas menores de 18 años
- Datos financieros personales (solo datos empresariales SII)

## 3. INSTRUCCIONES DE TRATAMIENTO

El Encargado (Sisteco) tratará los datos únicamente:
(a) Para la prestación del servicio contratado
(b) Conforme a las instrucciones documentadas del Responsable
(c) Nunca para propósitos propios del Encargado

## 4. SUBENCARGADOS (Subprocesadores)

El Responsable autoriza el uso de los siguientes subprocesadores:

| Proveedor | País | Propósito | Garantía legal |
|-----------|------|-----------|----------------|
| Convex Inc. | USA | Base de datos en la nube | SCC (Standard Contractual Clauses) |
| Vercel Inc. | USA | Hosting y serverless | SCC |
| Clerk Inc. | USA | Autenticación | SCC |
| Resend Inc. | USA | Envío de emails | SCC |
| PhantomBuster | Francia | Prospección LinkedIn | Adequacy Decision EU + SCC Chile |
| Google LLC (Gemini) | USA | Scoring IA | SCC |

## 5. MEDIDAS DE SEGURIDAD

El Encargado implementa:
- Cifrado en tránsito (HTTPS/TLS 1.3)
- Cifrado en reposo (Convex: cifrado AES-256)
- Control de acceso por roles (Clerk JWT)
- Logs de acceso y auditoría
- Sin acceso a datos de producción desde desarrollo

## 6. DERECHOS DE LOS TITULARES

El Encargado asistirá al Responsable para responder solicitudes de:
- **Acceso:** exportar datos del titular en 5 días hábiles
- **Rectificación:** corregir datos incorrectos en 5 días hábiles
- **Supresión ("derecho al olvido"):** eliminar en 10 días hábiles
- **Portabilidad:** exportar en formato JSON/CSV
- **Oposición:** opt-out de cualquier tratamiento

Canal de solicitudes: contacto@sisteco.cl (respuesta máx. 15 días hábiles)

## 7. NOTIFICACIÓN DE INCIDENTES

El Encargado notificará al Responsable dentro de las 72 horas de conocer
cualquier violación de seguridad que afecte datos personales, incluyendo:
- Tipo de incidente
- Datos afectados (categorías y volumen estimado)
- Medidas tomadas
- Contacto del responsable de seguridad

## 8. AUDITORÍAS

El Responsable podrá solicitar auditorías de cumplimiento con 30 días de
aviso. El Encargado facilitará acceso a registros y documentación relevante.

## 9. RETORNO Y DESTRUCCIÓN DE DATOS

Al término del contrato, el Encargado:
(a) Entregará todos los datos del Responsable en formato exportable (JSON/CSV)
(b) Eliminará todas las copias de los datos dentro de 30 días
(c) Certificará la eliminación por escrito

---
FIRMA: ___________________    FECHA: ___________________
```

---

## 5. Bases Legales para Prospección B2B (Interés Legítimo)

### ¿Qué puede hacer Sisteco legalmente?

**SÍ puede:**
- Recopilar datos de contacto de LinkedIn de directivos de empresas (datos de carácter profesional)
- Consultar datos empresariales del SII (RUT, giro, tamaño) — son datos públicos
- Contactar por email o LinkedIn a leads que NO han manifestado oposición
- Usar datos para scoring IA con propósito de prospección B2B
- Conservar datos de leads durante 3 años (plazo estándar de ciclo de venta B2B)

**NO puede:**
- Contactar a quien haya manifestado opt-out
- Tratar datos sensibles (salud, política, religión)
- Recopilar datos de personas naturales que no actúan en calidad profesional
- Vender o ceder datos a terceros sin consentimiento

### Test de Ponderación de Interés Legítimo (Art. 13 Ley 21.719)

Para documentar la base legal de prospección B2B:

```markdown
REGISTRO DE INTERÉS LEGÍTIMO — Prospección B2B Sisteco

Fecha de evaluación: [FECHA]
Actividad de tratamiento: Prospección de leads B2B para oferta de servicios SaaS

PASO 1 — IDENTIFICACIÓN DEL INTERÉS LEGÍTIMO:
Interés: comercial legítimo de Sisteco en ofrecer servicios de automatización
de ventas a empresas medianas chilenas que podrían beneficiarse.
¿Es el interés real y presente? SÍ — MRR objetivo, operación activa.

PASO 2 — NECESIDAD DEL TRATAMIENTO:
¿Es el tratamiento necesario? SÍ — no es posible identificar y contactar
a decisores B2B sin acceder a datos profesionales disponibles públicamente.
¿Existe alternativa menos intrusiva? NO — publicidad genérica tiene ROI
10x menor sin personalización.

PASO 3 — PONDERACIÓN (¿prevalece interés del titular?):
- Datos tratados: solo profesionales (nombre, cargo, email empresa, LinkedIn)
- Los datos son de carácter público (perfil LinkedIn visible)
- Los titulares actúan en calidad de representantes de empresa
- Impacto: bajo-medio (contacto comercial puntual, no datos sensibles)
- Expectativa razonable: directivo de empresa con >50 empleados puede
  razonablemente esperar recibir propuestas comerciales B2B relevantes
- Salvaguarda: opt-out sencillo en primer contacto y en todos los emails

CONCLUSIÓN: El interés legítimo de Sisteco prevalece sobre los derechos
del titular para esta actividad de tratamiento específica.

Firmado: Felipe [Apellido], Responsable del Tratamiento — [FECHA]
```

---

## 6. Template: Política de Privacidad sisteco.cl

```markdown
# Política de Privacidad

**Última actualización:** [FECHA]
**Responsable del tratamiento:** Sisteco SpA, RUT XX.XXX.XXX-X
**Contacto DPO/privacidad:** contacto@sisteco.cl
**Dirección:** Las Condes, Santiago de Chile

## ¿Qué datos recopilamos?

**A. Clientes (empresas contratantes):**
- Datos de contacto del representante (nombre, cargo, email empresarial, teléfono)
- Datos de la empresa (RUT, razón social, giro, dirección)
- Datos de facturación y pago (gestionados por Reveniu/Paddle)
- Datos de uso de la plataforma (logs de acceso, interacciones con el dashboard)

**B. Prospectos B2B (leads en nuestro pipeline):**
- Nombre completo, cargo, empresa, email empresarial
- URL de perfil LinkedIn (datos de carácter público profesional)
- Datos empresariales SII: RUT empresa, giro, tamaño estimado
- Puntaje de idoneidad (generado automáticamente por IA)

**C. Visitantes del sitio web:**
- Datos de navegación (cookies analíticas, si aplica)
- Email si se suscribe a nuestra lista de contacto

## ¿Por qué tratamos sus datos?

| Propósito | Base legal | Plazo |
|-----------|-----------|-------|
| Prestación del servicio contratado | Contrato (Art. 12 Ley 21.719) | Duración contrato + 5 años |
| Prospección B2B | Interés legítimo (Art. 13) | 3 años o hasta opt-out |
| Envío de emails comerciales | Interés legítimo | Hasta opt-out |
| Cumplimiento tributario (SII) | Obligación legal | 6 años |
| Mejora del servicio | Interés legítimo | 2 años |

## ¿Con quién compartimos sus datos?

Sus datos son tratados por los siguientes subprocesadores bajo nuestras instrucciones:
- **Convex Inc.** (USA) — base de datos
- **Vercel Inc.** (USA) — hosting
- **Clerk Inc.** (USA) — autenticación
- **Resend Inc.** (USA) — comunicaciones por email
- **Google LLC** (USA) — análisis con IA (datos anonimizados)

Todas las transferencias internacionales cuentan con las garantías adecuadas
(Cláusulas Contractuales Tipo conforme Ley 21.719).

## Sus derechos

Usted tiene derecho a:
- **Acceder** a sus datos personales que tratamos
- **Rectificar** datos inexactos o incompletos
- **Suprimir** sus datos ("derecho al olvido")
- **Portabilidad:** recibir sus datos en formato estructurado
- **Oponerse** al tratamiento basado en interés legítimo
- **Revocar consentimiento** cuando sea la base legal

**Ejercer sus derechos:** Enviar email a contacto@sisteco.cl con asunto
"Derechos Ley 21.719 — [su nombre]". Respuesta en máximo 15 días hábiles.

**Reclamaciones:** Puede presentar reclamación ante la Agencia de Protección
de Datos Personales (APDP) cuando esté operativa.

## Opt-out de comunicaciones comerciales

Para ser eliminado de nuestro sistema de prospección:
1. Responda cualquier email con "BAJA" o "STOP"
2. Envíe email a contacto@sisteco.cl con asunto "Opt-out"
3. [Próximamente] Use el formulario en sisteco.cl/privacidad
```

---

## 7. Template: Términos y Condiciones

```markdown
# Términos y Condiciones de Uso

**Sisteco** — Plataforma de Automatización de Ventas B2B
Última actualización: [FECHA]

## 1. Aceptación

Al contratar los servicios de Sisteco o acceder a la plataforma,
el Cliente acepta íntegramente estos Términos y Condiciones.

## 2. Descripción del Servicio

Sisteco es una plataforma SaaS de automatización de prospección y ventas
B2B para empresas medianas chilenas. Incluye: pipeline de leads, dashboard
CEO, scoring IA, alertas en tiempo real.

## 3. Uso Aceptable

El Cliente se compromete a:
- Usar la plataforma solo para prospección B2B legítima
- No violar la Ley 21.719 en el uso de datos de prospectos
- No intentar acceder a datos de otros clientes de Sisteco
- No hacer ingeniería inversa de los algoritmos de scoring

## 4. Disponibilidad del Servicio

**Planes Inicio y Crecimiento:** Disponibilidad objetivo 99%, sin SLA garantizado.
**Plan Enterprise:** SLA 99.5% mensual. Créditos de servicio si no se cumple.

**Mantenimientos programados:** notificados con 24h de anticipación por Discord/email.

## 5. Datos y Privacidad

El uso de los datos se rige por nuestra Política de Privacidad y DPA.

## 6. Propiedad Intelectual

Sisteco retiene todos los derechos sobre la plataforma. Los leads y datos
generados para la cuenta del Cliente son propiedad del Cliente.

## 7. Limitación de Responsabilidad

Ver Cláusula 7 del Contrato de Servicio.

## 8. Modificaciones

Sisteco puede modificar estos términos con 30 días de aviso por email.
El uso continuado del servicio implica aceptación de los nuevos términos.

## 9. Ley Aplicable

Estos términos se rigen por la ley chilena. Jurisdicción: Santiago de Chile.
```

---

## 8. Template: RAT (Registro de Actividades de Tratamiento)

```markdown
# REGISTRO DE ACTIVIDADES DE TRATAMIENTO — SISTECO
Conforme Art. 16 Ley 21.719 | Actualizado: [FECHA]

---

## Actividad 1: Pipeline de Prospección B2B

| Campo | Detalle |
|-------|---------|
| Responsable | Sisteco SpA (Felipe [Apellido], contacto@sisteco.cl) |
| Propósito | Identificar y calificar prospectos B2B para oferta comercial |
| Categorías de titulares | Directivos y decisores de empresas con 50+ empleados |
| Categorías de datos | Nombre, cargo, empresa, email profesional, LinkedIn URL, RUT empresa |
| Categorías de destinatarios | Proveedores subprocesadores (Convex, Gemini, Resend) |
| Transferencias internacionales | USA — Convex, Vercel, Clerk, Resend, Google (SCCs) |
| Base legal | Interés legítimo (Art. 13 Ley 21.719) |
| Plazo de retención | 3 años desde captación o hasta opt-out |
| Medidas de seguridad | Cifrado TLS + AES-256, control acceso JWT, logs auditoría |

---

## Actividad 2: Gestión de Clientes Contratantes

| Campo | Detalle |
|-------|---------|
| Propósito | Prestar el servicio contratado, facturación, soporte |
| Categorías de titulares | Representantes legales y usuarios designados de empresas cliente |
| Categorías de datos | Nombre, cargo, email, teléfono, RUT empresa, datos de pago |
| Base legal | Ejecución del contrato (Art. 12 Ley 21.719) |
| Plazo de retención | Duración contrato + 6 años (obligación tributaria) |

---

## Actividad 3: Scoring IA de Prospectos

| Campo | Detalle |
|-------|---------|
| Propósito | Calificar automáticamente leads según fit con ICP de Sisteco |
| Sistema IA | Gemini 2.5 Flash Lite (Google LLC) |
| Datos usados | Nombre, cargo, empresa, industria, tamaño empresa, datos SII |
| Decisión automatizada | SÍ — genera categoría HOT/WARM/NURTURE/SKIP |
| Lógica del scoring | Ponderación de industria (25%), tamaño (20%), señales de compra (25%), cargo (15%), tech fit (15%) |
| Intervención humana | SÍ — CEO revisa todos los HOT leads antes de contacto |
| Base legal | Interés legítimo (prospección comercial) |
| EIPD requerida | SÍ — ver sección 9 |

---

## Actividad 4: Comunicaciones Comerciales

| Campo | Detalle |
|-------|---------|
| Propósito | Contactar a prospectos calificados con propuesta de valor |
| Canal | Email (Resend) + LinkedIn (manual) |
| Base legal | Interés legítimo (B2B) |
| Opt-out | Sí — en cada email + contacto@sisteco.cl |
| Registro opt-outs | Convex tabla `optOuts` |
```

---

## 9. EIPD — Evaluación de Impacto para Scoring IA

```markdown
# EVALUACIÓN DE IMPACTO EN LA PROTECCIÓN DE DATOS (EIPD)
Sistema de Scoring IA — Gemini 2.5 Flash Lite

Fecha: [FECHA] | Responsable: Felipe [Apellido]

## 1. Descripción del Sistema

Sisteco usa Gemini (Google) para evaluar automáticamente el nivel de
ajuste de prospectos B2B con nuestro Perfil de Cliente Ideal (ICP).
Output: score 0-100 + categoría HOT/WARM/NURTURE/SKIP.

## 2. Necesidad de la EIPD

Obligatoria porque: (a) tratamiento automatizado que produce efectos
significativos (decisión de contactar o no), (b) perfilado sistemático.

## 3. Evaluación de Riesgos

| Riesgo | Probabilidad | Impacto | Nivel | Mitigación |
|--------|-------------|---------|-------|------------|
| Discriminación por industria/tamaño | Baja | Medio | Bajo | Pesos calibrados, no usa datos protegidos |
| Error de clasificación (falso negativo) | Media | Bajo | Bajo | CEO revisa HOT leads manualmente |
| Fuga de datos a Google | Baja | Medio | Bajo | Solo datos profesionales públicos |
| Sesgo contra ciertos cargos | Baja | Bajo | Muy bajo | Pesos explícitos documentados |

## 4. Salvaguardas Implementadas

- Solo datos de carácter profesional (no sensibles)
- CEO revisa todos los HOT leads antes de cualquier contacto
- Pesos de scoring documentados y auditables
- No hay decisión totalmente automatizada sin supervisión humana
- Datos mínimos enviados a Gemini (solo los necesarios para scoring)
- Opt-out elimina lead de todos los procesos

## 5. Conclusión

Riesgo residual: BAJO. El sistema es proporcional al propósito,
usa datos mínimos necesarios e incluye supervisión humana en decisiones relevantes.

Aprobado: Felipe [Apellido] — [FECHA]
Próxima revisión: [FECHA + 1 año]
```

---

## 10. SCCs — Cláusulas Contractuales Tipo (proveedores USA)

Para cada proveedor cloud que transfiere datos fuera de Chile:

```markdown
REGISTRO SCCs — Sisteco
Fecha: [FECHA]

| Proveedor | País | DPA URL | SCCs | Estado |
|-----------|------|---------|------|--------|
| Convex Inc. | USA | convex.dev/legal/privacy | SCCs EU (adaptables Chile) | Pendiente aceptar |
| Vercel Inc. | USA | vercel.com/legal/dpa | SCCs EU | Pendiente aceptar |
| Clerk Inc. | USA | clerk.com/legal/dpa | SCCs EU | Pendiente aceptar |
| Resend Inc. | USA | resend.com/legal/dpa | SCCs EU | Pendiente aceptar |
| Google (Gemini) | USA | cloud.google.com/terms/data-processing-addendum | SCCs EU | Pendiente aceptar |
| PhantomBuster | Francia | (UE — adequacy decision) | N/A | OK |

Acción requerida: Aceptar DPA de cada proveedor en su dashboard.
Los SCCs de la UE son adaptables a Chile bajo Ley 21.719.
```

---

## 11. Sanciones y Riesgos

| Infracción | Sanción máxima |
|-----------|---------------|
| Leve (ej: no tener RAT) | Hasta 1.000 UTM (~$69K USD) |
| Grave (ej: sin medidas seguridad) | Hasta 5.000 UTM (~$347K USD) |
| Muy grave (ej: vulneración masiva) | Hasta 20.000 UTM (~$1.39M USD) O 4% facturación anual |
| Reincidencia | El doble de la sanción base |

**UTM Marzo 2026:** $67.294 CLP (~$69 USD)

---

## 12. Template: NDA Bidireccional (Acuerdo de Confidencialidad)

> Usar cuando: antes de compartir información comercial, técnica o estratégica
> con un prospecto, partner, proveedor o cliente potencial.
> Bidireccional: ambas partes protegen la información de la otra.

```markdown
ACUERDO DE CONFIDENCIALIDAD (NDA)
Acuerdo Bidireccional de No Divulgación de Información Confidencial
Ley aplicable: República de Chile

Santiago de Chile, [FECHA]

═══════════════════════════════════════════════════════════════════

ENTRE:

PARTE A: Sisteco SpA
  RUT: XX.XXX.XXX-X
  Representante Legal: Felipe Palma
  Domicilio: Las Condes, Santiago de Chile
  Email: contacto@sisteco.cl
  Teléfono: +56 9 40065566

PARTE B: [RAZÓN SOCIAL EMPRESA]
  RUT: [XX.XXX.XXX-X]
  Representante Legal: [NOMBRE COMPLETO]
  Cargo: [CARGO]
  Domicilio: [DIRECCIÓN COMPLETA]
  Email: [EMAIL]

En adelante, individualmente "Parte" y en conjunto "las Partes".

═══════════════════════════════════════════════════════════════════

Las Partes han decidido explorar una posible relación comercial y/o
técnica relativa a [DESCRIBIR PROPÓSITO: ej. "la evaluación de los
servicios de automatización de ventas B2B de Sisteco para la operación
comercial de [EMPRESA]"]. Para dicho fin, será necesario que ambas
Partes compartan información de carácter confidencial.

Por lo tanto, las Partes acuerdan lo siguiente:

---

## CLÁUSULA 1 — DEFINICIÓN DE INFORMACIÓN CONFIDENCIAL

1.1 Se entiende por "Información Confidencial" toda información,
    ya sea oral, escrita, gráfica, electrónica o en cualquier otro
    formato, que una Parte ("Parte Reveladora") divulgue a la otra
    ("Parte Receptora"), incluyendo pero no limitándose a:

    (a) Información comercial: planes de negocio, estrategias,
        listas de clientes, precios, márgenes, pipeline de ventas,
        métricas de rendimiento, proyecciones financieras.

    (b) Información técnica: código fuente, algoritmos, arquitectura
        de sistemas, bases de datos, APIs, workflows, modelos de
        scoring, integraciones, infraestructura tecnológica.

    (c) Información operativa: procesos internos, metodologías,
        know-how, manuales, documentación interna, SOPs.

    (d) Datos de terceros: datos de leads, prospectos, clientes o
        usuarios que una Parte comparta con la otra en el contexto
        de la relación explorada.

    (e) Cualquier información marcada como "Confidencial", "Reservada",
        "Privada" o con una designación similar.

1.2 Se presume confidencial toda información que razonablemente se
    entendería como tal por su naturaleza o por las circunstancias
    de su divulgación, aun cuando no esté expresamente marcada.

---

## CLÁUSULA 2 — EXCLUSIONES

2.1 No se considerará Información Confidencial aquella que:

    (a) Sea o se convierta en información de dominio público sin
        mediar incumplimiento de este Acuerdo.

    (b) Ya estuviera en poder legítimo de la Parte Receptora antes
        de recibirla de la Parte Reveladora, según conste en registros
        previos verificables.

    (c) Sea recibida legítimamente de un tercero sin obligación de
        confidencialidad respecto de dicha información.

    (d) Sea desarrollada independientemente por la Parte Receptora
        sin uso de la Información Confidencial, según conste en
        documentación de desarrollo independiente.

    (e) Deba ser divulgada por mandato legal, resolución judicial
        o requerimiento de autoridad competente, siempre que la
        Parte Receptora notifique previamente a la Parte Reveladora
        (en la medida legalmente permitida) para que esta pueda
        ejercer los recursos que estime pertinentes.

---

## CLÁUSULA 3 — OBLIGACIONES DE LA PARTE RECEPTORA

3.1 La Parte Receptora se obliga a:

    (a) Usar la Información Confidencial exclusivamente para los
        fines del propósito descrito en los considerandos de este
        Acuerdo.

    (b) No divulgar, publicar, difundir ni compartir la Información
        Confidencial con terceros sin consentimiento previo y por
        escrito de la Parte Reveladora.

    (c) Limitar el acceso a la Información Confidencial únicamente
        a aquellos empleados, asesores o subcontratistas que
        necesiten conocerla para los fines autorizados ("Personas
        Autorizadas"), quienes deberán estar sujetos a obligaciones
        de confidencialidad no menos restrictivas que las de este
        Acuerdo.

    (d) Proteger la Información Confidencial con el mismo grado de
        cuidado que aplica a su propia información confidencial,
        y en ningún caso con un grado inferior al razonable.

    (e) Notificar de inmediato a la Parte Reveladora ante cualquier
        divulgación no autorizada o pérdida de Información
        Confidencial de la que tome conocimiento.

3.2 La Parte Receptora será responsable del incumplimiento de las
    obligaciones de confidencialidad por parte de sus Personas
    Autorizadas.

---

## CLÁUSULA 4 — PROTECCIÓN DE DATOS PERSONALES

4.1 En la medida en que la Información Confidencial incluya datos
    personales conforme a la Ley 19.628 y/o Ley 21.719 sobre
    Protección de Datos Personales, la Parte Receptora se
    compromete a:

    (a) Tratar dichos datos exclusivamente para los fines de este
        Acuerdo.

    (b) Implementar medidas técnicas y organizativas adecuadas
        para proteger los datos personales.

    (c) No transferir datos personales a terceros ni fuera de Chile
        sin consentimiento previo y las garantías legales aplicables.

    (d) Eliminar o devolver los datos personales al término de este
        Acuerdo conforme a la Cláusula 6.

---

## CLÁUSULA 5 — VIGENCIA Y DURACIÓN

5.1 Este Acuerdo entra en vigencia en la fecha de su firma y
    permanecerá vigente por un período de [12 / 24] meses,
    renovable automáticamente por períodos iguales salvo
    notificación escrita de cualquiera de las Partes con 30 días
    de anticipación al vencimiento.

5.2 Las obligaciones de confidencialidad establecidas en este
    Acuerdo sobrevivirán su término por un período adicional de
    2 (dos) años contados desde la fecha de expiración o
    terminación, cualquiera que ocurra primero.

---

## CLÁUSULA 6 — DEVOLUCIÓN Y DESTRUCCIÓN

6.1 Al término de este Acuerdo o a solicitud escrita de la Parte
    Reveladora, la Parte Receptora deberá, dentro de los 15 días
    hábiles siguientes:

    (a) Devolver toda la Información Confidencial en soporte
        físico o electrónico, o

    (b) Destruir toda la Información Confidencial y certificar
        dicha destrucción por escrito.

6.2 La Parte Receptora podrá retener una copia de la Información
    Confidencial únicamente cuando sea requerido por ley o
    regulación aplicable, manteniéndose las obligaciones de
    confidencialidad sobre dicha copia.

---

## CLÁUSULA 7 — PROPIEDAD INTELECTUAL

7.1 Este Acuerdo no otorga a la Parte Receptora ningún derecho
    de propiedad intelectual sobre la Información Confidencial
    de la Parte Reveladora.

7.2 Nada en este Acuerdo se interpretará como una licencia,
    cesión o transferencia de derechos de propiedad intelectual,
    marcas, patentes, know-how o derechos de autor de una Parte
    a la otra.

---

## CLÁUSULA 8 — REMEDIOS E INDEMNIZACIÓN

8.1 Las Partes reconocen que la divulgación no autorizada de
    Información Confidencial puede causar daños irreparables
    que no serían adecuadamente compensados con una indemnización
    monetaria.

8.2 En consecuencia, la Parte afectada tendrá derecho a solicitar
    medidas cautelares, acciones inhibitorias u otros remedios
    equitativos ante los tribunales competentes, además de
    cualquier otro recurso legal disponible.

8.3 La Parte que incumpla este Acuerdo deberá indemnizar a la
    otra Parte por todos los daños directos y costos razonables
    (incluidos honorarios de abogados) derivados del
    incumplimiento.

---

## CLÁUSULA 9 — DISPOSICIONES GENERALES

9.1 INDEPENDENCIA: Este Acuerdo no crea relación laboral,
    sociedad, joint venture, ni agencia entre las Partes.

9.2 NO OBLIGACIÓN: Nada en este Acuerdo obliga a las Partes a
    celebrar contratos futuros ni a consumar la relación
    comercial contemplada.

9.3 CESIÓN: Ninguna Parte podrá ceder este Acuerdo sin el
    consentimiento previo y por escrito de la otra Parte.

9.4 INTEGRIDAD: Este Acuerdo constituye el acuerdo completo
    entre las Partes respecto de su objeto y reemplaza cualquier
    acuerdo previo oral o escrito sobre la misma materia.

9.5 MODIFICACIONES: Cualquier modificación a este Acuerdo deberá
    constar por escrito y ser firmada por ambas Partes.

9.6 NOTIFICACIONES: Toda notificación bajo este Acuerdo se
    realizará por escrito a las direcciones de email indicadas
    en el encabezado. Se considerará entregada al momento de
    confirmación de recepción.

---

## CLÁUSULA 10 — LEY APLICABLE Y RESOLUCIÓN DE CONTROVERSIAS

10.1 Este Acuerdo se rige e interpreta conforme a las leyes de
     la República de Chile.

10.2 Cualquier controversia, diferencia o reclamación que surja
     de este Acuerdo o se relacione con él, incluyendo su
     existencia, validez, interpretación, cumplimiento o
     terminación, será resuelta mediante arbitraje administrado
     por el Centro de Arbitraje y Mediación de Santiago
     (CAM Santiago), de acuerdo con su Reglamento de Arbitraje
     vigente a la fecha de inicio del procedimiento.

10.3 El tribunal arbitral estará compuesto por un (1) árbitro
     designado de común acuerdo por las Partes. A falta de
     acuerdo dentro de los 30 días siguientes a la solicitud
     de arbitraje, el árbitro será designado por el CAM Santiago.

10.4 La sede del arbitraje será Santiago de Chile. El idioma
     del procedimiento será español.

10.5 El laudo arbitral será definitivo, vinculante e inapelable
     para las Partes.

═══════════════════════════════════════════════════════════════════

EN FE DE LO CUAL, las Partes firman el presente Acuerdo en dos
ejemplares de igual tenor y fecha.

PARTE A — SISTECO                  PARTE B — [EMPRESA]

_______________________             _______________________
Felipe Palma                        [NOMBRE REPRESENTANTE LEGAL]
Sisteco SpA                         [RAZÓN SOCIAL]
RUT: XX.XXX.XXX-X                   RUT: XX.XXX.XXX-X

Fecha: _____________                Fecha: _____________
Lugar: Santiago, Chile              Lugar: _____________
```

### Checklist para uso del NDA

```
ANTES de enviar NDA a prospecto/partner/proveedor:

1. [ ] Completar datos de la PARTE B (razón social, RUT, representante, domicilio, email)
2. [ ] Describir el propósito específico en el considerando (no dejar genérico)
3. [ ] Definir vigencia: 12 meses (exploración corta) o 24 meses (relación larga)
4. [ ] Revisar que las exclusiones apliquen al caso concreto
5. [ ] Enviar como PDF (no editable) — generar con: navegador → Print → Save as PDF
6. [ ] Registrar en Convex: tabla `documents`, tipo: "NDA", estado: "enviado"
7. [ ] Guardar copia firmada en Google Drive → Sisteco/Legal/NDAs/[empresa]-[fecha].pdf

CUÁNDO usar NDA:
- SIEMPRE antes de compartir: architecture docs, scoring algorithms, pricing internals
- SIEMPRE antes de recibir: datos de clientes del prospecto, CRM exports, info financiera
- NO necesario para: demos generales, propuestas comerciales estándar, info pública
```

---

*Skill actualizado: 2026-03-17 | Reemplaza abogado/compliance externo ($500K-2M CLP/mes)*
