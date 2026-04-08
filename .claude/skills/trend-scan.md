---
name: trend-scan
description: Escanea tendencias en AI, automatización y tech para identificar oportunidades de contenido viral
---

# Skill: Trend Scan

## Trigger
"tendencias", "trends", "qué está trending", "oportunidades contenido"

## Qué hace
1. Escanea Reddit, YouTube, X, Hacker News en tiempo real
2. Identifica temas trending en el nicho AI/automation
3. Puntúa potencial viral + relevancia para [EMPRESA]
4. Sugiere ángulo de contenido

## Comando
```bash
node scripts/content-cli.js research trends
```

## Fuentes de Tendencias
- Reddit: top posts 24h en subreddits target
- YouTube: videos trending en categoría tech
- X/Twitter: hashtags y topics trending
- Hacker News: front page
- Product Hunt: launches del día
- Google Trends: queries relacionadas

## Scoring
| Criterio | Peso |
|----------|------|
| Volumen de conversación | 25% |
| Relevancia para [EMPRESA] | 30% |
| Potencial educativo | 20% |
| Timing (primer mover) | 15% |
| Facilidad de producción | 10% |

## Output
```json
{
  "trends": [
    {
      "topic": "Claude Code MCP plugins",
      "score": 92,
      "sources": ["reddit", "x", "hn"],
      "suggested_format": "carrusel + video",
      "angle": "5 MCP plugins que cambian cómo desarrollas"
    }
  ]
}
```
