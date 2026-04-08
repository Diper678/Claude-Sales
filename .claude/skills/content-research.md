---
name: content-research
description: Absorbe data de Reddit, YouTube, Claude Code, Google Labs y competencia para alimentar el Content Engine
---

# Skill: Content Research

## Trigger
"investigar contenido", "research", "absorber data", "escanear fuentes", "tendencias"

## Qué hace
1. Escanea fuentes configuradas (Reddit, YouTube, RSS, docs)
2. Extrae tendencias, noticias, actualizaciones relevantes
3. Genera resumen estructurado con potencial de contenido
4. Almacena en Convex para el planning

## Fuentes

### Reddit (via snoowrap o Reddit API)
```bash
node scripts/content-cli.js research reddit
```
Subreddits: r/ClaudeAI, r/artificial, r/SaaS, r/automation, r/LocalLLaMA

### YouTube (via YouTube Data API v3)
```bash
node scripts/content-cli.js research youtube
```
Canales: AI tech, Google Developers, herramientas AI

### Claude Code Updates
```bash
node scripts/content-cli.js research claude-code
```
Changelogs, plugins, MCP, releases

### Google Labs
```bash
node scripts/content-cli.js research google-labs
```
Stitch, AI Studio, embeddings, herramientas experimentales

### Competencia
```bash
node scripts/content-cli.js research competitors
```
Instantly, Apollo, Clay, HubSpot — blogs, changelogs, pricing

## Scan Completo
```bash
node scripts/content-cli.js research scan
```
Ejecuta TODAS las fuentes y genera `docs/research/YYYY-MM-DD-daily-scan.md`

## Output
```json
{
  "date": "2026-03-22",
  "sources_scanned": 5,
  "items_found": 42,
  "high_potential": 8,
  "topics": ["claude-code-update", "google-stitch", "n8n-mcp"],
  "next_step": "Revisar high_potential y asignar a calendario"
}
```
