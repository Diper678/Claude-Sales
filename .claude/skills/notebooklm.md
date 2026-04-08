---
name: notebooklm
description: >
  Google NotebookLM programmatic access via notebooklm-py. Use when syncing Obsidian vault
  to NotebookLM, generating audio overviews/podcasts, creating quizzes/flashcards/reports,
  chatting with documents, or managing notebooks and sources programmatically.
  Triggers: notebooklm, notebook lm, podcast from docs, audio overview, study materials,
  knowledge base, base de conocimiento, sync obsidian, research synthesis.
triggers:
  - notebooklm
  - notebook lm
  - podcast
  - audio overview
  - quiz
  - flashcards
  - study guide
  - knowledge base
  - base de conocimiento
  - sync obsidian
  - research synthesis
  - generar podcast
  - materiales de estudio
---

# NotebookLM — Integracion Programatica

> Acceso completo a Google NotebookLM via `notebooklm-py` (v0.3.4).
> Notebooks, fuentes, artifacts (audio/video/quiz/slides), chat, research.
> Auth compartida en `~/.notebooklm/` — funciona en todos los proyectos.

---

## 1. Estado de la Integracion

```
Package:     notebooklm-py v0.3.4 (pip, global Python 3.14)
Auth:        ~/.notebooklm/storage_state.json (cookies Google, ~400 dias)
CLI:         C:\Users\Dell 5520\AppData\Roaming\Python\Python314\Scripts\notebooklm.exe
Bridge:      scripts/notebooklm-bridge.py (Obsidian [EMPRESA] <-> NotebookLM)
Vault orig:  C:\Users\Dell 5520\Documents\Obsidian\Ing Civil Bioquimica (proyecto original)
Vault [EMPRESA]: C:\Users\Dell 5520\Documents\Obsidian de [EMPRESA]\[EMPRESA]\
```

## 2. Arquitectura

```
Obsidian Vault ([EMPRESA])          NotebookLM (Google)
  procesos/                        Notebook: "[EMPRESA] - Procesos"
  integraciones/          sync     Notebook: "[EMPRESA] - Integraciones"
  Tech/                  ------>   Notebook: "[EMPRESA] - Tech"
  agentes/                         Notebook: "[EMPRESA] - Agentes"
  [EMPRESA]/                         Notebook: "[EMPRESA] - Estrategia"

                    |
                    v
           Artifacts generados:
           - Audio Overview (podcast MP3)
           - Quiz (JSON/MD)
           - Flashcards (JSON/MD)
           - Study Guide (MD)
           - Slide Deck (PDF/PPTX)
           - Infographic (PNG)
           - Mind Map (JSON)
           - Data Table (CSV)
```

## 3. Comandos Rapidos

### CLI (terminal)

```bash
# Auth (primera vez o re-login)
notebooklm login
notebooklm login --browser msedge    # SSO/corporate

# Listar notebooks
notebooklm list

# Crear notebook y agregar fuentes
notebooklm create "Mi Notebook"
notebooklm use <notebook_id>
notebooklm source add "https://example.com"
notebooklm source add-file ./documento.pdf

# Generar audio overview
notebooklm generate audio "Instrucciones opcionales" --format debate --wait
notebooklm download audio ./podcast.mp3

# Chat
notebooklm chat "Resume los temas principales"
```

### Bridge [EMPRESA] (Python)

```bash
# Verificar auth
python scripts/notebooklm-bridge.py check

# Sync vault completo de [EMPRESA] a NotebookLM
python scripts/notebooklm-bridge.py sync

# Sync solo una carpeta
python scripts/notebooklm-bridge.py sync --folder "procesos"
python scripts/notebooklm-bridge.py sync --folder "Tech"

# Generar materiales de estudio
python scripts/notebooklm-bridge.py study --notebook "[EMPRESA] - Procesos"

# Preguntar a tus documentos
python scripts/notebooklm-bridge.py ask "Como funciona el pipeline de leads?"

# Generar MOC en Obsidian
python scripts/notebooklm-bridge.py concepts
```

## 4. API Python (async)

```python
from notebooklm import NotebookLMClient

async with await NotebookLMClient.from_storage() as client:
    # --- Notebooks ---
    nbs = await client.notebooks.list()
    nb = await client.notebooks.create("Titulo")
    await client.notebooks.delete(nb.id)
    await client.notebooks.rename(nb.id, "Nuevo Titulo")

    # --- Fuentes ---
    await client.sources.add_url(nb.id, "https://...", wait=True)
    await client.sources.add_text(nb.id, "Titulo", "Contenido...", wait=True)
    await client.sources.add_file(nb.id, "./doc.pdf", wait=True)
    sources = await client.sources.list(nb.id)
    fulltext = await client.sources.get_fulltext(nb.id, src.id)

    # --- Artifacts ---
    # Audio: DEEP_DIVE | BRIEF | CRITIQUE | DEBATE
    status = await client.artifacts.generate_audio(nb.id, language="es",
        audio_format=AudioFormat.DEBATE, audio_length=AudioLength.LONG)
    await client.artifacts.wait_for_completion(nb.id, status.task_id)
    await client.artifacts.download_audio(nb.id, "podcast.mp3")

    # Quiz / Flashcards
    status = await client.artifacts.generate_quiz(nb.id,
        difficulty=QuizDifficulty.HARD, quantity=QuizQuantity.MORE)
    await client.artifacts.download_quiz(nb.id, "quiz.json")

    # Report / Study Guide
    status = await client.artifacts.generate_study_guide(nb.id, language="es")
    await client.artifacts.download_report(nb.id, "guia.md")

    # Slides / Infographic / Mind Map / Data Table
    await client.artifacts.generate_slide_deck(nb.id, language="es")
    await client.artifacts.generate_infographic(nb.id, language="es")
    mind_map = await client.artifacts.generate_mind_map(nb.id)
    await client.artifacts.generate_data_table(nb.id, language="es")

    # --- Chat ---
    result = await client.chat.ask(nb.id, "Pregunta aqui")
    print(result.answer)
    for ref in result.references:
        print(f"  [{ref.citation_number}] {ref.cited_text[:80]}")

    # --- Research ---
    res = await client.research.start(nb.id, "query", source="web", mode="deep")
```

## 5. Formatos de Artifact

| Artifact | Formatos | Opciones |
|----------|----------|----------|
| Audio | MP3/MP4 | DEEP_DIVE, BRIEF, CRITIQUE, DEBATE × SHORT/DEFAULT/LONG |
| Video | MP4 | EXPLAINER, BRIEF × 11 estilos visuales |
| Cinematic | MP4 | Veo 3 (cuota diaria limitada) |
| Report | Markdown | BRIEFING_DOC, STUDY_GUIDE, BLOG_POST, CUSTOM |
| Quiz | JSON/MD/HTML | FEWER/STANDARD/MORE × EASY/MEDIUM/HARD |
| Flashcards | JSON/MD/HTML | FEWER/STANDARD/MORE × EASY/MEDIUM/HARD |
| Infographic | PNG | LANDSCAPE/PORTRAIT/SQUARE × CONCISE/STANDARD/DETAILED |
| Slides | PDF/PPTX | DETAILED_DECK, PRESENTER_SLIDES × DEFAULT/SHORT |
| Data Table | CSV | Estructura libre via instrucciones |
| Mind Map | JSON | Sincrono (no requiere poll) |

## 6. Limites y Consideraciones

| Limite | Valor |
|--------|-------|
| Fuentes por notebook | 50 |
| Chars por fuente texto | ~500K |
| Archivo max upload | ~20MB |
| Vida de cookies | Dias a semanas (~400 dias actual) |
| Rate limit audio | Cuota diaria (variable) |
| Rate limit video | Cuota horaria/diaria |

## 7. Integracion con Flujos [EMPRESA]

### Flujo 1: Onboarding de cliente → Knowledge Base

```
1. Cliente nuevo firma contrato
2. Recopilar docs del cliente (propuestas, procesos, ICP)
3. python scripts/notebooklm-bridge.py sync --vault [ruta_cliente]
4. Generar study guide con contexto del cliente
5. Usar chat para Q&A rapido sobre el cliente
```

### Flujo 2: Research → Podcast para equipo

```
1. Investigar tema (Perplexity/Firecrawl)
2. Guardar findings en Obsidian
3. Sync a NotebookLM
4. Generar Audio Overview formato DEBATE
5. Compartir MP3 via Discord/Telegram
```

### Flujo 3: Documentacion interna → Quiz de verificacion

```
1. Escribir SOPs/procesos en Obsidian
2. Sync carpeta "procesos/" a NotebookLM
3. Generar quiz HARD + flashcards
4. Usar como material de training interno
```

### Flujo 4: Compliance → Estudio guiado

```
1. Cargar Ley 21.719 y docs compliance
2. Generar study guide en espanol
3. Generar flashcards para equipo
4. Chat para consultas rapidas de compliance
```

## 8. Troubleshooting

| Problema | Solucion |
|----------|----------|
| `FileNotFoundError` en auth | `notebooklm login` o `python scripts/notebooklm-bridge.py login` |
| `AuthError` / cookies expiradas | Re-login: `notebooklm login` |
| `RateLimitError` | Esperar retry_after. Videos tienen cuota diaria |
| `SourceProcessingError` | Fuente muy grande o formato no soportado |
| Paquetes faltantes | `pip install python-frontmatter obsidiantools networkx` |
| Windows event loop | notebooklm-py lo maneja automaticamente |
| Import falla | `pip install "notebooklm-py[browser]"` para login |

## 9. Variables de Entorno

```env
# NotebookLM (auth)
# Dashboard: https://notebooklm.google.com
# Docs: https://github.com/teng-lin/notebooklm-py
NOTEBOOKLM_HOME=~/.notebooklm
NOTEBOOKLM_LOG_LEVEL=WARNING
# NOTEBOOKLM_AUTH_JSON=  # Solo para CI/CD (inline JSON)
```
