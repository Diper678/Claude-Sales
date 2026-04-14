---
name: lead-status
description: >
  Dashboard rápido del estado de leads y pipeline n8n. Trigger con "lead status",
  "estado leads", "dashboard leads", "cuántos leads", "cómo va el pipeline".
triggers:
  - lead status
  - estado leads
  - dashboard leads
  - cuántos leads
  - pipeline
  - cómo va el pipeline
---

# Skill: Lead Status — Dashboard de Leads

Muestra el estado completo del pipeline de leads.

## Al invocar

Ejecutar:
```bash
node scripts/sisteco-cli.js leads status
```

Esto muestra automáticamente:
- Últimas 5 ejecuciones de n8n (con estado OK / ERROR / RUN)
- Estado actual de PhantomBuster (último run, créditos)
- Conteo de leads en listas locales (verified + guessed)

Para detalle de n8n:
```bash
node scripts/sisteco-cli.js workflow list
node scripts/sisteco-cli.js workflow status
```

## Presentar al usuario

```
ESTADO DEL PIPELINE
====================
[output de leads status]

Para acciones:
  sisteco-cli leads prospect           → Nuevo scrape LinkedIn
  sisteco-cli leads enqueue --dry-run  → Preview HOT leads listos para enviar
  sisteco-cli workflow list            → Ver workflows activos/inactivos
```

## Referencia completa

- Comandos del CLI: `.claude/skills/cli-tooling.md`
- Prospección: `.claude/skills/prospect.md`
- Outreach: `.claude/skills/send-outreach.md`
