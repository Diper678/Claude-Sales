---
name: send-outreach
description: >
  Generar mensajes personalizados listos para enviar a leads específicos o en batch.
  Produce email + LinkedIn notes en tiers (Claude / Gemini / templates) según score.
triggers:
  - send outreach
  - enviar outreach
  - draft messages
  - generar mensajes
  - contactar leads
  - personalizar mensajes
---

# Skill: Send Outreach — Generar mensajes listos para enviar

Genera mensajes personalizados de outreach (email + LinkedIn) para leads
específicos o en batch.

## Modos de uso

### Modo 1: Top N leads por ICP score
Si el usuario dice "send outreach top 10" o "generar mensajes para los mejores 10":

```bash
node scripts/personalize-messages.js batch --input pb-leads-enriched.json --limit 10
```

### Modo 2: Lead específico
Si el usuario menciona un nombre o empresa:

1. Buscar el lead en `pb-leads-enriched.json`:
```bash
node -e "const l = require('./pb-leads-enriched.json').find(x => x.company.toLowerCase().includes('EMPRESA')); console.log(JSON.stringify(l))"
```

2. Generar mensajes:
```bash
node scripts/personalize-messages.js generate --lead-file [temp file con lead JSON]
```

### Modo 3: Por industria
```bash
node -e "
const leads = require('./pb-leads-enriched.json').filter(l => (l.industry || '').toLowerCase().includes('INDUSTRIA') && l.email);
console.log('Leads en industria:', leads.length);
const fs = require('fs');
fs.writeFileSync('leads-lists/batch-industry.json', JSON.stringify(leads));
" && node scripts/personalize-messages.js batch --input leads-lists/batch-industry.json --limit 20
```

## Después de generar

1. Crear archivo `leads-lists/ready-to-send.md` formateado para copy-paste:
   - Para cada lead: nombre, email, empresa, cargo
   - Subject line + body de cada email
   - LinkedIn connection note
   - LinkedIn follow-ups

2. Informar al usuario:
   - Cuántos mensajes se generaron
   - Qué tier se usó (Claude / Gemini / Templates)
   - Archivo listo para copiar-pegar

## Tiers de personalización

- **Score >= 80 (HOT):** Claude Sonnet (si `ANTHROPIC_API_KEY` set) o Gemini Flash
- **Score 50-79 (WARM):** Gemini 2.5 Flash (reescritura de templates)
- **Score < 50 (NURTURE):** Templates determinísticos (sin API)

## Referencias

- Voz de marca y estructura de emails: `.claude/rules/content.md`
- Enriquecimiento previo: `.claude/skills/enrich-leads.md`
- Pipeline completo: `.claude/skills/prospect.md`
