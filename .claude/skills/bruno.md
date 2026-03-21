---
name: bruno
description: >
  Skill completa de Bruno API Client para Sisteco. Cubre: cuándo y cómo usar Bruno
  en workflows agénticos, CLI programático, escritura de colecciones .bru, mejores
  prácticas de organización, y guía interactiva para Felipe (el usuario).
---

# Bruno API Client — Skill de Sisteco

> Bruno es el cliente de API Git-nativo de Sisteco. Reemplaza Postman/Insomnia.
> Esta skill define cómo Claude lo usa y cómo Felipe puede aprovecharlo al máximo.

---

## 1. CUÁNDO USAR BRUNO (Triggers para Claude)

### Usar Bruno CLI automáticamente cuando:

| Situación | Acción |
|-----------|--------|
| Se modifica un endpoint de Convex (`convex/`) | Ejecutar `bruno-collections/convex-api/` |
| Se modifica `api/gemini-query.js` | Ejecutar `bruno-collections/gemini-api/` |
| Se agrega un nuevo Vercel Serverless function en `api/` | Crear request `.bru` para esa función |
| Se implementa un nuevo workflow n8n con webhook | Crear request `.bru` para el webhook |
| Se hace deploy con `npx vercel --prod` | Ejecutar colección con `--env production` |
| Se quiere verificar que una API externa funciona | Ejecutar request Bruno correspondiente |
| Se pide "prueba este endpoint" o "verifica que funcione" | Usar Bruno CLI, no curl |

### Usar Bruno para crear/modificar colecciones cuando:
- Se agrega una API nueva al stack (Convex, Gemini, n8n, Firecrawl, PhantomBuster, etc.)
- Se cambia la autenticación de un servicio
- Se agrega una función nueva a Convex
- Se implementa un webhook nuevo

---

## 2. INSTALACIÓN Y SETUP

```bash
# Instalar Bruno CLI (una vez)
npm install -g @usebruno/cli

# Verificar instalación
bru --version

# Bruno app de escritorio: https://www.usebruno.com/downloads
# Abrir colección: File → Open Collection → bruno-collections/
```

**Estructura de colecciones en Sisteco:**
```
bruno-collections/
├── bruno.json                          # Metadata de colección
├── environments/
│   ├── development.bru                 # Variables dev (process.env)
│   └── production.bru                  # Variables prod
├── convex-api/
│   ├── collection.bru                  # Auth de Convex
│   ├── list-leads.bru
│   └── update-lead-score.bru
├── gemini-api/
│   ├── collection.bru
│   ├── score-lead.bru
│   └── enrich-company.bru
├── firecrawl-api/
│   ├── collection.bru
│   ├── scrape-website.bru
│   └── map-domain.bru
└── phantombuster-api/
    ├── collection.bru
    ├── launch-agent.bru
    └── get-results.bru
```

---

## 3. CLI — COMANDOS PRINCIPALES

### Ejecutar colecciones desde Claude Code (Bash tool):

```bash
# Ejecutar toda la colección
cd bruno-collections && bru run --env development

# Ejecutar solo una carpeta de API
cd bruno-collections && bru run convex-api/ --env development

# Ejecutar un request específico
cd bruno-collections && bru run convex-api/list-leads.bru --env development

# Ejecutar con reporte JSON (para procesar resultados)
cd bruno-collections && bru run gemini-api/ --env development \
  --reporter-json /tmp/bruno-results.json

# Ejecutar y parar al primer fallo
cd bruno-collections && bru run --env development --bail

# Solo requests que tengan tests escritos
cd bruno-collections && bru run --env development --tests-only

# Pasar variables en tiempo de ejecución (para CI o secretos)
cd bruno-collections && bru run convex-api/ --env development \
  --env-var convex_url=https://animated-pika-122.convex.cloud
```

### Exit codes (para scripting):
- `0` → Todo OK
- `1` → Test/assertion falló
- `4` → No está en el root de la colección
- `6` → Environment no existe

### Verificar resultados desde Node.js:
```javascript
const { execSync } = require('child_process');

function runBrunoCollection(folder, env = 'development') {
  const resultsFile = '/tmp/bruno-results.json';
  try {
    execSync(
      `bru run ${folder} --env ${env} --reporter-json ${resultsFile}`,
      { cwd: 'bruno-collections', encoding: 'utf-8' }
    );
    return JSON.parse(require('fs').readFileSync(resultsFile, 'utf-8'));
  } catch (err) {
    // exit code !== 0 → tests fallaron
    return { failed: true, error: err.message };
  }
}
```

---

## 4. ESCRIBIR ARCHIVOS .BRU

### Formato estándar de un request:

```bru
meta {
  name: Nombre descriptivo del request
  type: http
  seq: 1
}

post {
  url: {{base_url}}/api/endpoint
  body: json
  auth: none
}

headers {
  Content-Type: application/json
  Authorization: Bearer {{clerk_jwt}}
}

body:json {
  {
    "campo": "valor",
    "orgId": "{{org_id}}"
  }
}

script:pre-request {
  // Pre-request: generar datos dinámicos
  const timestamp = new Date().toISOString();
  bru.setVar('timestamp', timestamp);
}

script:post-response {
  // Post-response: extraer datos para próximo request
  const body = res.getBody();
  if (body && body.token) {
    bru.setVar('authToken', body.token);
  }
}

tests {
  test("Status 200", function() {
    expect(res.getStatus()).to.equal(200);
  });

  test("Respuesta tiene datos", function() {
    const data = res.getBody();
    expect(data).to.be.an("array");
    expect(data.length).to.be.above(0);
  });
}
```

### Variables disponibles en scripts:

```javascript
// Leer variables
const url = bru.getVar('base_url');
const secret = bru.getVar('gemini_api_key');

// Escribir variables (disponibles para requests siguientes)
bru.setVar('resultado', value);

// Respuesta del request actual
const status = res.getStatus();       // número: 200, 404, etc.
const body = res.getBody();           // objeto JS parseado
const header = res.getHeader('x-id'); // string

// Encadenar requests
const loginResponse = await bru.runRequest("auth/login");
bru.setVar("token", loginResponse.body.token);
```

### Assertions con Chai (completo):

```javascript
// Igualdad
expect(value).to.equal(200);
expect(value).to.not.equal(null);
expect(obj).to.eql({ key: 'val' }); // deep equality

// Tipos
expect(value).to.be.a('string');
expect(arr).to.be.an('array');
expect(flag).to.be.true;
expect(val).to.be.null;

// Propiedades
expect(obj).to.have.property('leadId');
expect(obj).to.have.all.keys('id', 'score', 'name');

// Strings
expect(str).to.contain('Sisteco');
expect(str).to.match(/^AIzaSy/);

// Números
expect(score).to.be.above(0);
expect(score).to.be.within(0, 100);

// Arrays
expect(arr).to.have.lengthOf(3);
expect(arr).to.include('HOT');
expect(arr).to.be.empty;
```

---

## 5. COLECCIONES DE SISTECO — REFERENCIA RÁPIDA

### Convex API (DB reactiva)
- **Auth:** JWT de Clerk en header `Authorization: Bearer <token>`
- **Endpoint:** `{{convex_url}}/api/query` (GET-like via POST)
- **Funciones disponibles:**
  - `leads:getLeadsByOrg` — Lista todos los leads
  - `leads:getLeadsStats` — Stats del pipeline
  - `leads:getLeadsByStatus` — Filtra por estado

### Gemini API (AI scoring)
- **Auth:** API key en query param `?key={{gemini_api_key}}`
- **Modelo:** `gemini-2.5-flash-lite` ← IMPORTANTE: usar lite, no flash normal
- **Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent`

> ⚠️ **TRAMPA CONOCIDA — Gemini thinking models en Bruno:**
> `gemini-2.5-flash` es un *thinking model* — consume tokens de razonamiento invisibles
> antes de responder. Con `maxOutputTokens: 512`, el response llega truncado con
> `finishReason: MAX_TOKENS` porque los reasoning tokens se comen el budget.
> Siempre usar `gemini-2.5-flash-lite` en collections Bruno (no-thinking, free tier,
> `finishReason: STOP`, respuesta completa en ~1.2s).

### PhantomBuster API (Lead gen)
- **Auth:** `X-Phantombuster-Key: {{pb_api_key}}`
- **Endpoint base:** `https://api.phantombuster.com/api/v2`
- **Agentes:** LinkedIn Search (`{{pb_agent_id}}`), TD Chile (`{{pb_td_agent_id}}`)

### Firecrawl API (Enriquecimiento web)
- **Auth:** `Authorization: Bearer {{firecrawl_api_key}}`
- **Endpoint base:** `https://api.firecrawl.dev/v1`
- **Operaciones:** `/scrape`, `/map`, `/crawl`

### n8n Webhooks (Workflows)
- **Base:** `{{n8n_host}}/webhook/`
- **Webhooks activos:** `hot-lead-enqueue`, `lead-scoring`

---

## 6. MEJORES PRÁCTICAS EN SISTECO

### Seguridad y secretos:
```
✅ Usar {{process.env.KEY}} en archivos .bru (environment vars)
✅ Mantener .env en .gitignore (ya configurado)
✅ Usar vars:secret para variables sensibles en el environment
✅ Commitear .env.example como template
❌ Nunca hardcodear API keys en archivos .bru
```

> ⚠️ **TRAMPA: `process.env` NO fluye automáticamente al CLI de Bruno.**
> Las variables del shell/`.env` NO se inyectan via `{{process.env.KEY}}` al usar `bru run`.
> **Solución:** pasar explícitamente con `--env-var`:
> ```bash
> GEMINI_KEY=$(grep "^GEMINI_API_KEY=" .env | head -1 | cut -d= -f2)
> bru run gemini-api/ --env development --env-var "gemini_api_key=${GEMINI_KEY}"
> ```
> O usar el wrapper `bash scripts/bru-run.sh gemini-api/` que hace esto automáticamente.
>
> ⚠️ **TRAMPA: No usar `source .env` si el .env tiene valores con espacios.**
> `.env` de Sisteco tiene `FROM_EMAIL=Sisteco <hola@sisteco.cl>` — `source` falla.
> Usar `grep "^KEY=" .env | head -1 | cut -d= -f2-` en su lugar.

### Organización:
```
✅ Un folder por API externa
✅ collection.bru define la auth del folder
✅ seq: N para ordenar requests lógicamente
✅ Tests en CADA request (mínimo: status 200)
❌ NO poner comentarios // entre bloques de nivel raíz en .bru (Bruno v2 falla al parsear)
✅ Si necesitas documentar un request, usar bloque docs { ... } en lugar de // comentario
```

### Encadenamiento de requests:
```
✅ PhantomBuster: launch-agent → (espera) → get-results
✅ Convex: listar leads → actualizar score → verificar cambio
✅ Gemini: score-lead → extraer score → guardar en Convex
```

---

## 7. GUÍA PARA FELIPE — APROVECHAR BRUNO AL MÁXIMO

### ¿Qué es Bruno y por qué es mejor que Postman?

Bruno es un cliente de API (como Postman) pero con diferencias clave para Sisteco:

| Característica | Bruno | Postman |
|----------------|-------|---------|
| Almacenamiento | Archivos en Git | Cloud de Postman |
| Privacy | Todo local | Postman entrena IA con tus datos |
| Costo | Gratis siempre | $16-29/usuario/mes para features |
| Compliance | 100% local = Ley 21.719 ✓ | Datos van a servidores de EEUU |
| Git-friendly | Diff legible en PRs | JSON opaco |
| Offline | Funciona sin internet | Requiere cuenta |

### Workflow diario recomendado para Felipe:

**1. Abrir la app de escritorio:**
- Abre Bruno
- `File → Open Collection → bruno-collections/`
- Selecciona environment: `development`

**2. Probar un endpoint nuevo que implementaste:**
- Crea nueva request: `Cmd/Ctrl + N`
- Elige el folder correcto (convex-api, gemini-api, etc.)
- Llena URL, método, headers, body
- Guarda: se crea el `.bru` automáticamente en la carpeta

**3. Ver resultados de una corrida:**
- Selecciona un folder → `Run` button arriba a la derecha
- Ve el panel de resultados con pass/fail por test
- Exporta como HTML si quieres compartir

**4. Correr desde terminal (más rápido):**
```bash
# En el root del proyecto:
cd bruno-collections
bru run gemini-api/ --env development
```

### Casos de uso de alto valor para Felipe:

**A. Verificar antes de demos:**
```bash
bru run --env production --tests-only --reporter-html /tmp/pre-demo-check.html
```
→ Abre `pre-demo-check.html` en el browser para ver si todo está verde.

**B. Debuggear un error de API:**
- Abre el request en Bruno app
- Ejecuta manualmente y ve el request/response completo
- Mucho mejor que agregar `console.log` al código

**C. Documentar una API nueva:**
- Crea los requests en Bruno
- Agrega comentarios `//` en los archivos `.bru`
- El archivo `.bru` ES la documentación (vive en Git)

**D. Probar webhooks de n8n:**
```bash
bru run n8n-webhooks/ --env development
```
→ Dispara el webhook y verifica que n8n lo procesa.

**E. Testing con datos reales:**
```bash
# CSV con múltiples leads para testear scoring
bru run gemini-api/score-lead.bru \
  --csv-file-path test-data/leads-muestra.csv \
  --env development
```

### Atajos de teclado en Bruno app:
- `Cmd/Ctrl + N` — Nueva request
- `Cmd/Ctrl + Enter` — Ejecutar request
- `Cmd/Ctrl + Shift + E` — Abrir environment editor
- `Cmd/Ctrl + /` — Toggle comentario en script

---

## 8. WORKFLOWS AGÉNTICOS CON BRUNO

### Patrón: Verificar API después de modificar código

Cuando Claude modifica un endpoint, ejecuta automáticamente:

```bash
# 1. Modificar código
# ... (edit files)

# 2. Verificar con Bruno
cd bruno-collections && bru run convex-api/ --env development \
  --reporter-json /tmp/results.json --bail

# 3. Leer resultados
node -e "
const r = require('/tmp/results.json');
const failed = r.results?.filter(t => t.status === 'fail');
if (failed?.length) console.log('FALLOS:', JSON.stringify(failed, null, 2));
else console.log('✓ Todos los tests pasaron');
"
```

### Patrón: Generar nuevo .bru para endpoint nuevo

Cuando se crea `api/nuevo-endpoint.js`:

```javascript
// Template para crear .bru programáticamente
const template = (name, method, url, body) => `meta {
  name: ${name}
  type: http
  seq: 1
}

${method.toLowerCase()} {
  url: ${url}
  body: ${body ? 'json' : 'none'}
  auth: none
}

headers {
  Content-Type: application/json
}
${body ? `\nbody:json {\n  ${JSON.stringify(body, null, 2)}\n}` : ''}

tests {
  test("Status 200", function() {
    expect(res.getStatus()).to.equal(200);
  });
}
`;
```

### Patrón: CI pre-deploy

En el futuro, antes de `npx vercel --prod`:
```bash
# Ejecutar smoke tests contra staging
bru run --env staging --tags=smoke --bail --reporter-junit /tmp/ci.xml
echo "Exit code: $?"
```

---

## 9. AGREGAR NUEVAS COLECCIONES

Cuando Sisteco integra una nueva API (ej: PostHog, Sentry, Reveniu):

### Estructura mínima:

```bash
# 1. Crear carpeta
mkdir bruno-collections/nueva-api/

# 2. collection.bru (auth del folder)
cat > bruno-collections/nueva-api/collection.bru << 'EOF'
meta {
  name: NuevaAPI
  type: collection
}

auth: bearer {
  token: {{nueva_api_key}}
}
EOF

# 3. Primer request
cat > bruno-collections/nueva-api/health-check.bru << 'EOF'
meta {
  name: Health Check
  type: http
  seq: 1
}

get {
  url: {{nueva_api_base_url}}/health
  auth: inherit
}

tests {
  test("API está viva", function() {
    expect(res.getStatus()).to.equal(200);
  });
}
EOF

# 4. Agregar variable al environment
# Editar environments/development.bru y añadir:
#   nueva_api_key: {{process.env.NUEVA_API_KEY}}
#   nueva_api_base_url: https://api.nueva.com
```

---

## 10. COLECCIONES PENDIENTES DE CREAR

| API | Estado | Prioridad |
|-----|--------|-----------|
| Reveniu webhooks | ❌ Pendiente | ALTA — pagos activos |
| Convex mutations (onboarding) | ❌ Pendiente | ALTA — Fase 5 |
| n8n webhooks activos | ❌ Pendiente | MEDIA |
| PostHog events | ❌ Pendiente | MEDIA — cuando se implemente |
| Clerk API (gestión usuarios) | ❌ Pendiente | MEDIA |

---

## 11. CLI-ANYTHING — Complemento para herramientas más complejas

### ¿Qué es CLI-Anything?

CLI-Anything (HKUDS/CLI-Anything) genera harnesses Python+Click completos para cualquier
software, haciéndolo "agent-native". Instalado en `~/.claude/plugins/cli-anything`.

### Bruno vs CLI-Anything — cuándo usar cada uno

| Criterio | Bruno | CLI-Anything |
|----------|-------|--------------|
| **APIs REST/HTTP** | ✅ Nativo | No aplica |
| **Software sin API HTTP** | No aplica | ✅ Nativo |
| **Git-friendly / compartible** | ✅ Archivos .bru | ✅ Python modules |
| **Tests en colección** | ✅ Chai assertions | ✅ pytest |
| **Output JSON para agentes** | Requiere script | ✅ `--json` flag nativo |
| **Modo REPL interactivo** | No | ✅ Nativo |
| **Caso de uso Sisteco** | APIs (Gemini, Convex, PB, Firecrawl) | GUIs locales (Blender, GIMP, etc.) |

**Regla práctica:** Si tiene endpoint HTTP → Bruno. Si es software de escritorio/CLI nativo → CLI-Anything.

### Comandos CLI-Anything disponibles

```bash
# Generar harness completo para un software
/cli-anything <nombre-software>
/cli-anything /path/to/software

# Refinar harness existente
/cli-anything:refine /path/to/software
/cli-anything:refine /path/to/software "área específica"

# Correr tests del harness
/cli-anything:test <software>

# Validar calidad del harness
/cli-anything:validate <software>
```

### En Sisteco — cuándo activar CLI-Anything

Actualmente las integraciones de Sisteco son todas APIs HTTP → Bruno las cubre.
CLI-Anything se activaría si en el futuro se necesita:
- Automatizar software de desktop (LibreOffice para generar propuestas PDF)
- Controlar herramientas de diseño (GIMP, Inkscape para assets visuales)
- Integrar software que no tiene API pública

---

## REFERENCIA RÁPIDA — CHEATSHEET

```bash
# Usar el wrapper (recomendado — carga .env automáticamente)
bash scripts/bru-run.sh gemini-api/
bash scripts/bru-run.sh convex-api/ development --bail

# Correr todo (manual con key explícita)
GEMINI_KEY=$(grep "^GEMINI_API_KEY=" .env | head -1 | cut -d= -f2)
cd bruno-collections && bru run --env development --env-var "gemini_api_key=${GEMINI_KEY}"

# Correr una API específica
bru run gemini-api/ --env development --env-var "gemini_api_key=${GEMINI_KEY}"

# Correr un request individual
bru run gemini-api/score-lead.bru --env development --env-var "gemini_api_key=${GEMINI_KEY}"

# Con reporte HTML
bru run --env development --reporter-html /tmp/report.html

# En producción (¡cuidado!)
bru run --env production --tests-only

# Ver ayuda
bru run --help
```

---

*Skill actualizada: 2026-03-19 (v2) | Bruno CLI: 3.x | Docs: https://docs.usebruno.com*
