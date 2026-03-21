---
name: google-workspace
description: >
  Google Workspace CLI integration — Create, read, update spreadsheets, docs, and drive files
  autonomously. Connected to n8n for automation workflows. Use when working with Google Sheets,
  Docs, Drive, Gmail, Calendar, or any Google Workspace service. Also use when building
  n8n workflows that need Google credentials or Sheets data sources.
triggers:
  - google sheets
  - spreadsheet
  - google workspace
  - google drive
  - google docs
  - gmail
  - google calendar
  - gws
  - crear planilla
  - crear hoja de calculo
  - sheets api
  - google api
  - workspace credentials
  - n8n google
  - automatizacion google
---

# Google Workspace CLI — Integracion Autonoma para Sisteco

> CLI: `C:/npm-global/gws` (v0.9.1)
> Auth: OAuth2 via GCP project
> Servicios: Sheets, Drive, Docs, Gmail, Calendar, Slides, Tasks, Forms, Meet

---

## 1. Setup (una sola vez)

### Prerequisitos

- Google Cloud project con APIs habilitadas
- OAuth 2.0 Client ID (tipo Desktop)
- `client_secret.json` en `~/.config/gws/`

### Comandos de setup

```bash
# Opcion A: Setup automatico (requiere gcloud CLI)
C:/npm-global/gws auth setup --login

# Opcion B: Manual
# 1. Ir a https://console.cloud.google.com/apis/credentials
# 2. Crear OAuth 2.0 Client ID (Desktop app)
# 3. Descargar JSON y guardar como:
#    C:/Users/Dell 5520/.config/gws/client_secret.json
# 4. Login:
C:/npm-global/gws auth login -s sheets,drive,docs,gmail,calendar

# Verificar
C:/npm-global/gws auth status
```

### APIs que habilitar en GCP Console

```
Google Sheets API
Google Drive API
Google Docs API
Gmail API
Google Calendar API
```

---

## 2. Google Sheets — Operaciones Comunes

### Crear spreadsheet nuevo

```bash
C:/npm-global/gws sheets spreadsheets create --json '{
  "properties": {"title": "Leads Pipeline - Sisteco"},
  "sheets": [
    {"properties": {"title": "Leads"}},
    {"properties": {"title": "Scoring"}},
    {"properties": {"title": "Outreach"}}
  ]
}'
```

### Leer datos

```bash
# Leer rango especifico
C:/npm-global/gws sheets +read \
  --params '{"spreadsheetId": "SHEET_ID", "range": "Leads!A1:F100"}'

# Leer toda la hoja
C:/npm-global/gws sheets spreadsheets values get \
  --params '{"spreadsheetId": "SHEET_ID", "range": "Sheet1"}'
```

### Escribir datos

```bash
# Append (agregar fila al final)
C:/npm-global/gws sheets +append \
  --params '{"spreadsheetId": "SHEET_ID", "range": "Leads!A:F"}' \
  --json '{"values": [["Empresa X", "Juan Perez", "CEO", "juan@empresa.cl", "85", "HOT"]]}'

# Update (escribir en rango especifico)
C:/npm-global/gws sheets spreadsheets values update \
  --params '{"spreadsheetId": "SHEET_ID", "range": "Leads!A1:F1", "valueInputOption": "USER_ENTERED"}' \
  --json '{"values": [["Empresa", "Contacto", "Cargo", "Email", "Score", "Categoria"]]}'
```

### Batch update (multiples operaciones)

```bash
C:/npm-global/gws sheets spreadsheets values batchUpdate \
  --params '{"spreadsheetId": "SHEET_ID"}' \
  --json '{
    "valueInputOption": "USER_ENTERED",
    "data": [
      {"range": "Leads!A1:F1", "values": [["Empresa","Contacto","Cargo","Email","Score","Cat"]]},
      {"range": "Scoring!A1:D1", "values": [["Lead","Score","Razon","Fecha"]]}
    ]
  }'
```

---

## 3. Google Drive — Operaciones

```bash
# Listar archivos
C:/npm-global/gws drive files list --params '{"pageSize": 10, "q": "mimeType=\"application/vnd.google-apps.spreadsheet\""}'

# Crear carpeta
C:/npm-global/gws drive files create --json '{
  "name": "Sisteco Automations",
  "mimeType": "application/vnd.google-apps.folder"
}'

# Compartir archivo
C:/npm-global/gws drive permissions create \
  --params '{"fileId": "FILE_ID"}' \
  --json '{"role": "writer", "type": "user", "emailAddress": "contacto@sisteco.cl"}'
```

---

## 4. Gmail — Operaciones

```bash
# Listar mensajes recientes
C:/npm-global/gws gmail users messages list --params '{"userId": "me", "maxResults": 5}'

# Leer mensaje
C:/npm-global/gws gmail users messages get --params '{"userId": "me", "id": "MSG_ID"}'
```

---

## 5. Integracion con n8n

### Patron: Claude Code crea Sheet → n8n lo usa como data source

```
1. Claude Code: gws sheets spreadsheets create (crea sheet con estructura)
2. Claude Code: gws sheets +append (llena con datos iniciales)
3. Claude Code: gws drive permissions create (comparte con service account de n8n)
4. n8n: Google Sheets node lee/escribe del mismo spreadsheet
```

### Service Account de n8n

Para que n8n pueda acceder a los mismos sheets:
- n8n usa credenciales Google Sheets (OAuth o Service Account) configuradas en la instancia
- El sheet creado por gws debe compartirse con el email del service account de n8n
- Esto permite que ambos (Claude Code via gws + n8n via API) lean/escriban el mismo sheet

### Workflow pattern: Crear sheet para automatizacion

Cuando necesites crear un spreadsheet para una automatizacion n8n:

1. **Definir estructura** — columnas y hojas segun la automatizacion
2. **Crear sheet** — `gws sheets spreadsheets create`
3. **Agregar headers** — `gws sheets spreadsheets values update`
4. **Compartir** — `gws drive permissions create`
5. **Conectar en n8n** — usar el spreadsheetId en el nodo Google Sheets
6. **Guardar ID** — registrar en Convex o en variables de entorno de n8n

---

## 6. Script Helper — sheets-manager.js

Para operaciones complejas, usar el script en `scripts/sheets-manager.js`:

```bash
node scripts/sheets-manager.js create --title "Mi Sheet" --sheets "Hoja1,Hoja2"
node scripts/sheets-manager.js append --id SHEET_ID --range "A:D" --data '[["a","b","c","d"]]'
node scripts/sheets-manager.js read --id SHEET_ID --range "A1:Z100"
node scripts/sheets-manager.js share --id SHEET_ID --email user@domain.com
```

---

## 7. Templates de Sheets para Sisteco

### Lead Pipeline Sheet

```
Hoja "Leads":     Empresa | Contacto | Cargo | Email | LinkedIn | Score | Cat | Status | Fecha
Hoja "Scoring":   Lead | Score | Categoria | Razon | Confianza | ScoredAt
Hoja "Outreach":  Lead | Canal | Step | Mensaje | EnviadoAt | Respondio
Hoja "Metricas":  Semana | LeadsNuevos | HOT | WARM | Contactados | Reuniones
```

### Client Tracker Sheet

```
Hoja "Clientes":  Empresa | Plan | MRR | FechaInicio | Estado | Contacto
Hoja "Onboarding": Cliente | Step | Completado | Fecha | Notas
Hoja "Soporte":   Cliente | Ticket | Prioridad | Estado | Resolucion
```

### Financial Tracker Sheet

```
Hoja "Ingresos":  Mes | MRR | Nuevos | Churn | NetMRR
Hoja "Gastos":    Mes | Concepto | Monto | Categoria
Hoja "Metricas":  Mes | CAC | LTV | LTV/CAC | Churn% | NPS
```

---

## 8. Autonomia — Flujo para crear sheets automaticamente

Cuando Claude Code necesite crear un spreadsheet para una tarea:

1. **Verificar auth:** `C:/npm-global/gws auth status`
2. **Crear sheet con estructura apropiada** segun el template
3. **Llenar headers y datos iniciales**
4. **Compartir con cuentas necesarias**
5. **Retornar el spreadsheetId y URL** al usuario
6. **Opcionalmente:** crear/actualizar workflow n8n que use este sheet

### URL del sheet creado

```
https://docs.google.com/spreadsheets/d/{spreadsheetId}/edit
```

---

## 9. Referencia rapida

| Accion | Comando |
|--------|---------|
| Auth status | `gws auth status` |
| Login | `gws auth login -s sheets,drive` |
| Crear sheet | `gws sheets spreadsheets create --json '{...}'` |
| Leer datos | `gws sheets +read --params '{...}'` |
| Escribir datos | `gws sheets +append --params '{...}' --json '{...}'` |
| Listar archivos | `gws drive files list --params '{...}'` |
| Compartir | `gws drive permissions create --params '{...}' --json '{...}'` |
| Schema API | `gws schema sheets.spreadsheets.create` |

### Variables de entorno opcionales

```
GWS_DEFAULT_SPREADSHEET=<id>    # Sheet default para operaciones
GWS_FOLDER_ID=<id>              # Carpeta default en Drive
GWS_SANITIZE_TEMPLATE=<tmpl>    # Model Armor template (opcional)
```

---

## 10. Troubleshooting

| Error | Solucion |
|-------|----------|
| `auth_method: none` | Correr `gws auth login` |
| `insufficient_scope` | Re-login con scopes correctos: `gws auth login -s sheets,drive,docs` |
| `file not found` | Verificar spreadsheetId, verificar permisos |
| `quota exceeded` | Rate limit de Google API, esperar 60s |
| `invalid_grant` | Token expirado, re-login |

---

*El CLI gws se ubica en `C:/npm-global/gws` y se puede usar directamente desde Claude Code para todas las operaciones de Google Workspace.*
