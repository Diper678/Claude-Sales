---
name: community-respond
description: Monitorea y responde comentarios, menciones y mensajes en RRSS y email con AutoResearch activado
---

# Skill: Community Respond

## Trigger
"responder comentarios", "community", "menciones", "engagement", "respuestas multicanal"

## Qué hace
1. Monitorea menciones y comentarios en todas las plataformas
2. Clasifica por prioridad (pregunta, queja, oportunidad, spam)
3. Genera respuesta usando AutoResearch para contexto
4. Responde manteniendo voz de marca

## Comandos
```bash
# Ver menciones pendientes
node scripts/content-cli.js community inbox

# Responder mención específica
node scripts/content-cli.js community respond --id=mention-001

# Respuesta automática (AutoResearch)
node scripts/content-cli.js community auto-respond

# Estado engagement
node scripts/content-cli.js community stats
```

## AutoResearch Integration
- Lee transcripciones de calls en `sisteco-autoresearch/transcripts/`
- Usa contexto de ventas reales para respuestas informadas
- Prioriza argumentos que resuenan con clientes reales

## Clasificación de Menciones
| Tipo | Prioridad | Tiempo respuesta |
|------|-----------|-----------------|
| Pregunta técnica | Alta | < 1 hora |
| Queja/problema | Crítica | < 30 min |
| Oportunidad lead | Alta | < 1 hora |
| Comentario positivo | Media | < 4 horas |
| Spam/irrelevante | Baja | Ignorar |

## Voz en Respuestas
- Directa, técnica, empática
- NO buzzwords
- SIEMPRE agregar valor (no solo "gracias")
- Redirigir a [TU_DOMINIO] o booking link cuando aplique
