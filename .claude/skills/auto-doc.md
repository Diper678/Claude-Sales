---
name: auto-doc
description: Protocolo de auto-documentación y mejora continua. Se activa automáticamente al completar trabajo significativo. OBLIGATORIO — Claude debe ejecutarlo sin que el usuario lo pida.
tools: Read, Write, Edit, Glob, Grep
triggerPatterns:
  - "workflow.*creado"
  - "integracion.*nueva"
  - "deploy.*completado"
  - "bug.*resuelto"
  - "skill.*creado"
---

# Protocolo de Auto-Documentación [EMPRESA]

> **OBLIGATORIO.** Ejecutar automáticamente al final de cada tarea significativa.
> El usuario NO debe pedirlo — es responsabilidad de Claude hacerlo siempre.

## Trigger: Cuándo se activa

Se activa automáticamente cuando la sesión incluye cualquiera de:
- Crear o modificar un workflow (n8n, script, automatización)
- Implementar una integración nueva (API, MCP, servicio externo)
- Configurar infraestructura (deploy, auth, DB, keys)
- Diseñar o construir UI/UX (mockups, dashboard, landing)
- Resolver un bug o problema técnico significativo
- Tomar una decisión arquitectónica o estratégica
- Crear o modificar un skill de Claude Code
- Cualquier proceso que otro humano necesitaría documentar para replicar

## Paso 1: Clasificar el trabajo

```
EVALUAR al final de la tarea:
1. ¿Es un proceso NUEVO? → Crear documentación
2. ¿Es una MEJORA a proceso existente? → Actualizar documentación existente
3. ¿Es trabajo rutinario sin proceso replicable? → No documentar (skip)
```

## Paso 2: Documentar en Memory Vault

Según `vault/skill-vault-manager.md` sección 6, elegir archivo destino:
- Proceso/workflow → `vault/process-registry.md`
- Decisión → `vault/decisions.md`
- Lección aprendida → `vault/metacognition.md`
- Infraestructura → `vault/infrastructure.md`
- Skill nuevo/modificado → `vault/skills-catalog.md`

Formato estándar para procesos:
```markdown
### [Nombre del Proceso]
- **Tipo:** workflow | integración | deployment | design | data-pipeline | compliance | skill
- **Estado:** activo | draft | deprecado
- **Fecha:** YYYY-MM-DD
- **Qué hace:** [1 línea]
- **Dónde vive:** [path al código/config/workflow]
- **Dependencias:** [servicios, APIs, keys necesarias]
- **Nota Obsidian:** [path en vault Obsidian]
```

## Paso 3: Sincronizar a Obsidian

Usar el MCP de Obsidian para mantener la base de conocimiento sincronizada:

**Para procesos/workflows:**
1. Buscar en Obsidian si existe nota del proceso (`obsidian_search`)
2. Si existe → `obsidian_write_note` mode:"append" con changelog
3. Si no existe → `obsidian_create_note` en la carpeta correcta:
   - `procesos/` → Procesos y SOPs
   - `integraciones/` → APIs e integraciones
   - `Tech/` → Arquitectura técnica
   - `agentes/` → Workflows de agentes/AI
   - `Logs/` → Diagnósticos y debugging
   - `[EMPRESA]/` → Decisiones estratégicas

**Para decisiones estratégicas:**
→ Append a `estrategia/Resumen Estrategia 2026.md`

**Tags Obsidian obligatorios:**
- `#sisteco` + `#tipo` (workflow, integración, proceso, decisión)
- `#fecha-YYYY-MM`
- `#estado` (activo, draft, deprecado)

## Paso 4: Auto-evaluación

Al documentar, reflexionar brevemente:
- ¿Este proceso podría hacerse mejor? → Anotar mejora en metacognition.md
- ¿Hay un patrón que se repite? → Abstraer como skill o template
- ¿Algo que aprendí que no sabía? → Agregar a metacognition.md "Lecciones"
- ¿Algo que supuse y resultó diferente? → Actualizar supuestos

## Reglas Críticas

```
NO-1: NUNCA preguntar al usuario "¿quieres que documente esto?" — SOLO HACERLO
NO-2: NUNCA crear notas duplicadas — siempre buscar primero
NO-3: NUNCA documentar sin haber completado el trabajo (documenta resultados, no intenciones)
NO-4: NUNCA dejar Obsidian desincronizado del vault de memoria
SI-1: SI el proceso es nuevo y significativo, mencionarlo brevemente al usuario al final
SI-2: SI se mejoró un proceso existente, indicar que se actualizó la documentación
SI-3: SI se detecta inconsistencia entre memoria y Obsidian, corregir silenciosamente
```
