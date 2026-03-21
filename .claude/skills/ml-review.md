---
name: ml-review
description: >
  Revisión de arquitectura AI/ML para scripts, workflows y pipelines en The Agentic Company.
  Despacha ai-engineer, ml-engineer, y condicionalmente computer-vision-engineer.
  Usar cuando se modifique lógica de scoring, modelos, APIs de AI, o pipelines de datos.
argument-hint: "[archivo o componente a revisar, ej: 'scripts/score-leads.js', 'n8n-workflows/']"
triggers:
  - ml review
  - arquitectura ai
  - scoring
  - modelos
  - gemini
  - pipeline datos
  - ai architecture
  - machine learning
  - ml pipeline
---

# ML Review — The Agentic Company

Orquestador de revisión de arquitectura AI/ML. Despacha agentes especializados
según los archivos involucrados y consolida un reporte de arquitectura.

## Protocolo

### 1. Determinar alcance

Leer los archivos relevantes pasados como argumento, o si no hay argumento,
revisar los archivos modificados en el último commit:

```bash
git diff --name-only HEAD~1
```

### 2. Detectar si aplica computer-vision-engineer

Revisar si los archivos contienen alguno de:
`.png`, `.jpg`, `image`, `vision`, `canvas`, `PIL`, `cv2`, `sharp`

Si **sí**: incluir `ai-ml-toolkit:computer-vision-engineer` en el dispatch.
Si **no**: omitirlo.

### 3. Despachar agentes en paralelo

Agentes base (siempre):

| Agente | subagent_type | Tarea |
|--------|--------------|-------|
| AI Engineer | `ai-ml-toolkit:ai-engineer` | Arquitectura, decisiones de modelo, trade-offs |
| ML Engineer | `ai-ml-toolkit:ml-engineer` | Pipelines training/serving, calidad del dato |

Agente condicional:

| Agente | subagent_type | Condición |
|--------|--------------|-----------|
| CV Engineer | `ai-ml-toolkit:computer-vision-engineer` | Solo si hay componentes visuales |

Prompt a cada agente:

```
Revisa el siguiente código de Sisteco (plataforma B2B SaaS Chile).
Contexto: automatización de ventas B2B, lead scoring con Gemini, n8n workflows.
Stack: Node.js, Google Gemini API, n8n, Convex, Vercel.

[pegar código relevante]

Evalúa:
1. Corrección arquitectónica
2. Calidad del pipeline de datos
3. Riesgos de producción
4. Mejoras recomendadas (con prioridad)

Retorna: lista de hallazgos con prioridad ALTA/MEDIA/BAJA.
```

### 4. Reporte consolidado

```
## ML Review Report — [fecha]

### ALTA PRIORIDAD
- [hallazgo] → [recomendación concreta]

### MEDIA PRIORIDAD
- [hallazgo] → [recomendación concreta]

### BAJA PRIORIDAD
- [hallazgo] → [recomendación concreta]
```
