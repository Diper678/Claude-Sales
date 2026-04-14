---
name: prospect
description: >
  Dashboard de prospección B2B — lanzar scrape LinkedIn, ver estado del pipeline,
  encolar leads HOT. Controla el pipeline completo desde el CLI unificado del proyecto.
triggers:
  - prospect
  - prospectar
  - pipeline
  - outreach status
  - lanzar scrape
  - scrape linkedin
  - estado prospección
---

# Skill: Prospect — Prospección B2B desde Terminal

Controla el pipeline de prospección completo usando el CLI del proyecto.

> Requiere que `scripts/sisteco-cli.js` (o tu equivalente) esté configurado con
> tu instancia n8n, PhantomBuster y Convex. Ver `.env.example`.

## Al invocar

1. **Ver estado del pipeline:**
```bash
node scripts/sisteco-cli.js leads status
```

2. **Lanzar scrape LinkedIn (si necesitas más leads):**
```bash
node scripts/sisteco-cli.js leads prospect
# Con URL personalizada:
node scripts/sisteco-cli.js leads prospect --url "https://linkedin.com/search/..." --count 30
```

3. **Ver ejecuciones recientes de n8n:**
```bash
node scripts/sisteco-cli.js workflow status
```

4. **Encolar HOT leads para email sequences:**
```bash
# Preview primero
node scripts/sisteco-cli.js leads enqueue --dry-run
# Encolar real
node scripts/sisteco-cli.js leads enqueue --min-score 70
```

5. **Presentar resumen al usuario:**

```
PIPELINE DE PROSPECCIÓN
========================
[output de leads status]

Workflows n8n activos:
[output de workflow list]

Acciones disponibles:
  leads prospect        → Nuevo scrape LinkedIn
  leads enqueue         → Encolar HOT leads
  workflow run score    → Forzar scoring ahora
  api test gemini       → Verificar APIs
```

## Referencia rápida

- Skill con comandos completos del CLI: `.claude/skills/cli-tooling.md`
- Workflows disponibles: `node scripts/sisteco-cli.js workflow list`
- Configuración: `.env` (ver `.env.example`)
