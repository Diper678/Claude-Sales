---
name: doc-framework
description: Gestión y validación del framework de documentación jerárquica. Audita estructura, detecta problemas, sugiere ubicaciones para docs nuevos. Trigger con "auditar docs", "revisar estructura", "doc health", "dónde pongo este doc".
tools: Read, Glob, Grep, Bash
triggerPatterns:
  - "auditar.*doc"
  - "revisar.*estructura"
  - "doc.*health"
  - "donde.*pongo"
  - "donde.*va.*este"
---

# Doc Framework Manager — Sisteco

Gestiona el framework de documentación jerárquica de 3 tiers de Sisteco.

## Arquitectura de 3 Tiers (Progressive Disclosure)

### Tier 1 — Siempre Cargado (auto-load)
| Archivo | Límite | Propósito |
|---------|--------|-----------|
| `CLAUDE.md` | <100 líneas | Índice + reglas críticas + @imports |
| `AGENTS.md` | <80 líneas | Cross-tool (Codex, Cursor, Copilot) |
| `.claude/rules/*.md` | <50 líneas c/u | Reglas path-specific |
| `MEMORY.md` | <200 líneas | Índice de memoria persistente |

### Tier 2 — Bajo Demanda
| Directorio | Propósito |
|-----------|-----------|
| `.claude/skills/` | Skills invocados por trigger o request |
| `.claude/agents/` | Subagentes especializados |
| `.claude/commands/` | Comandos CLI custom |
| `vault/` | Memoria detallada por tópico |

### Tier 3 — Referencia Profunda
| Directorio | Propósito | Volatilidad |
|-----------|-----------|-------------|
| `docs/` | Documentación operativa | ALTA (cambia seguido) |
| `sisteco-knowledge/` | Conocimiento de empresa | BAJA (cambia poco) |

## Regla de Separación: ¿docs/ o sisteco-knowledge/?

```
¿El documento cambia frecuentemente?
  SI → docs/
    ¿Es una guía de setup/uso? → docs/guides/
    ¿Es un spec de diseño? → docs/specs/
    ¿Es un plan de implementación? → docs/impl-plans/
    ¿Es una auditoría? → docs/audits/
    ¿Es documentación legal operativa? → docs/legal/
    ¿Es investigación técnica? → docs/research/
  NO → sisteco-knowledge/
    ¿Es sobre la empresa/marca? → sisteco-knowledge/empresa/
    ¿Es estrategia/mercado? → sisteco-knowledge/estrategia/
    ¿Es pricing/financiero? → sisteco-knowledge/financiero/
    ¿Es arquitectura/stack? → sisteco-knowledge/tech-stack/
    ¿Es sobre integraciones? → sisteco-knowledge/integraciones/
    ¿Es sobre MCPs/herramientas? → sisteco-knowledge/mcps/
    ¿Es sobre operaciones? → sisteco-knowledge/operaciones/
```

## Comandos de Auditoría

Cuando el usuario pida auditar docs, ejecutar estos checks:

### 1. Check de Tamaño
```bash
wc -l CLAUDE.md  # debe ser <100
wc -l AGENTS.md  # debe ser <80
# MEMORY.md se carga solo primeras 200 líneas
```

### 2. Check de Estructura
Verificar que existen:
- `.claude/rules/` con archivos: general, frontend, backend, compliance, content, workflows
- `.claude/agents/` con al menos: code-reviewer, doc-auditor, researcher
- `.claude/skills/auto-doc.md` y `.claude/skills/doc-framework.md`
- `docs/` con subcarpetas: guides/, specs/, impl-plans/, audits/, legal/, research/
- `sisteco-knowledge/` con subcarpetas: empresa/, estrategia/, financiero/, tech-stack/

### 3. Check de Cross-References
- Verificar que cada @import en CLAUDE.md apunta a un archivo que existe
- Verificar que cada [[link]] en MEMORY.md apunta a un archivo que existe

### 4. Check de Huérfanos
- Buscar .md files no referenciados desde ningún índice
- Reportar para review (no borrar automáticamente)

### 5. Check de Duplicación
- Buscar contenido similar entre docs/ y sisteco-knowledge/
- Sugerir consolidación si hay overlap >50%

## Output de Auditoría

```markdown
## Doc Framework Health Report — YYYY-MM-DD

### Score: XX/100

### Tier 1 (Siempre Cargado)
- [ ] CLAUDE.md: XX líneas (target: <100) — PASS/FAIL
- [ ] AGENTS.md: XX líneas (target: <80) — PASS/FAIL
- [ ] .claude/rules/: X/6 archivos — PASS/FAIL
- [ ] MEMORY.md: XX líneas (target: <200) — PASS/FAIL

### Tier 2 (Bajo Demanda)
- [ ] Skills: X archivos — OK
- [ ] Agents: X archivos — OK
- [ ] Commands: X archivos — OK

### Tier 3 (Referencia)
- [ ] docs/ subcarpetas: X/6 — PASS/FAIL
- [ ] sisteco-knowledge/ subcarpetas: X/N — PASS/FAIL

### Issues
- CRITICAL: [lista]
- WARNING: [lista]
- INFO: [lista]

### Huérfanos Detectados
- [lista de archivos sin referencia]
```
