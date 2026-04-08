#!/usr/bin/env node

/**
 * content-cli.js — CLI unificado del [EMPRESA] Content Engine.
 * Gestiona research, planning, creation, distribution y community.
 *
 * Uso: node scripts/content-cli.js <modulo> <accion> [flags]
 *
 * Módulos:
 *   research   — Absorción de data (reddit, youtube, claude-code, google-labs, competitors, scan, trends)
 *   plan       — Calendario editorial (generate, view, move)
 *   create     — Producción de contenido (carousel, video, post, article)
 *   distribute — Publicación (publish, schedule, queue, status)
 *   community  — Respuestas multicanal (inbox, respond, auto-respond, stats)
 *   status     — Dashboard general del Content Engine
 */

try { require('dotenv').config(); } catch (e) { /* dotenv opcional */ }

const fs = require('fs');
const path = require('path');

const [,, modulo, accion, ...flags] = process.argv;

// --- Parsear flags ---
function parseFlags(flagList) {
  const parsed = {};
  for (const flag of flagList) {
    const [key, ...valueParts] = flag.replace(/^--/, '').split('=');
    parsed[key] = valueParts.join('=') || true;
  }
  return parsed;
}

const opts = parseFlags(flags);

// --- Módulos ---
const modules = {
  research: {
    description: 'Absorción de data de fuentes externas',
    actions: {
      reddit:       () => research('reddit'),
      youtube:      () => research('youtube'),
      'claude-code': () => research('claude-code'),
      'google-labs': () => research('google-labs'),
      competitors:  () => research('competitors'),
      scan:         () => researchScanAll(),
      trends:       () => trendScan(),
    },
  },
  plan: {
    description: 'Calendario editorial',
    actions: {
      generate: () => planGenerate(opts.period || 'week'),
      view:     () => planView(),
      move:     () => planMove(opts.from, opts.to),
    },
  },
  create: {
    description: 'Producción de contenido',
    actions: {
      carousel: () => createCarousel(opts),
      video:    () => createVideo(opts),
      post:     () => createPost(opts),
      article:  () => createArticle(opts),
    },
  },
  distribute: {
    description: 'Publicación y distribución',
    actions: {
      publish:  () => distributePublish(opts),
      schedule: () => distributeSchedule(opts),
      queue:    () => distributeQueue(),
      status:   () => distributeStatus(),
    },
  },
  community: {
    description: 'Respuestas multicanal',
    actions: {
      inbox:        () => communityInbox(),
      respond:      () => communityRespond(opts.id),
      'auto-respond': () => communityAutoRespond(),
      stats:        () => communityStats(),
    },
  },
  status: {
    description: 'Dashboard del Content Engine',
    actions: {
      _default: () => showStatus(),
    },
  },
};

// --- Router principal ---
function main() {
  if (!modulo || modulo === 'help') {
    showHelp();
    return;
  }

  if (modulo === 'status' && !accion) {
    showStatus();
    return;
  }

  const mod = modules[modulo];
  if (!mod) {
    console.error(`Error: módulo "${modulo}" no existe.`);
    console.log('Módulos disponibles:', Object.keys(modules).join(', '));
    process.exit(1);
  }

  const handler = mod.actions[accion];
  if (!handler) {
    console.error(`Error: acción "${accion}" no existe en módulo "${modulo}".`);
    console.log('Acciones disponibles:', Object.keys(mod.actions).join(', '));
    process.exit(1);
  }

  handler();
}

// --- Implementaciones ---

function showHelp() {
  console.log('\n=== [EMPRESA] Content Engine CLI ===\n');
  for (const [name, mod] of Object.entries(modules)) {
    console.log(`  ${name.padEnd(12)} — ${mod.description}`);
    if (mod.actions) {
      const actions = Object.keys(mod.actions).filter(a => a !== '_default');
      if (actions.length) {
        console.log(`${''.padEnd(17)}Acciones: ${actions.join(', ')}`);
      }
    }
  }
  console.log('\nUso: node scripts/content-cli.js <modulo> <accion> [--flag=valor]\n');
}

function research(source) {
  console.log(`\n[Research] Escaneando ${source}...`);

  const envMap = {
    reddit: 'REDDIT_CLIENT_ID',
    youtube: 'YOUTUBE_API_KEY',
    'claude-code': null,
    'google-labs': null,
    competitors: null,
  };

  const envVar = envMap[source];
  if (envVar && !process.env[envVar]) {
    console.log(`  [WARN] Variable ${envVar} no configurada. Configurar en .env`);
    console.log(`  Modo: research manual (sin API).`);
  }

  const today = new Date().toISOString().slice(0, 10);
  const outDir = path.join(__dirname, '..', 'docs', 'research');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const outFile = path.join(outDir, `${today}-${source}.md`);
  const template = `# Research: ${source}\n**Fecha:** ${today}\n\n## Hallazgos\n\n- [ ] TODO: implementar scraping de ${source}\n\n## Potencial de Contenido\n\n| Tema | Score | Formato Sugerido |\n|------|-------|------------------|\n| ... | ... | ... |\n`;

  fs.writeFileSync(outFile, template, 'utf-8');
  console.log(`  [OK] Template creado: docs/research/${today}-${source}.md`);
  console.log(`  Siguiente paso: implementar connector para ${source}\n`);
}

function researchScanAll() {
  console.log('\n[Research] Scan completo de TODAS las fuentes...\n');
  const sources = ['reddit', 'youtube', 'claude-code', 'google-labs', 'competitors'];
  for (const s of sources) {
    research(s);
  }
  console.log('[Research] Scan completo finalizado.\n');
}

function trendScan() {
  console.log('\n[Trends] Escaneando tendencias...');
  console.log('  Fuentes: Reddit, YouTube, X, Hacker News, Product Hunt, Google Trends');
  console.log('  TODO: implementar trend aggregation');
  console.log('  Siguiente paso: configurar APIs de trending\n');
}

function planGenerate(period) {
  console.log(`\n[Plan] Generando calendario editorial (${period})...`);

  const calDir = path.join(__dirname, '..', 'calendar');
  if (!fs.existsSync(calDir)) fs.mkdirSync(calDir, { recursive: true });

  const today = new Date();
  const weekNum = Math.ceil((today.getDate()) / 7);
  const fileName = `${today.getFullYear()}-W${String(today.getMonth() * 4 + weekNum).padStart(2, '0')}.md`;
  const outFile = path.join(calDir, fileName);

  const template = `# Calendario Editorial — Semana ${weekNum}, ${today.toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}

## Lunes
- [ ] Carrusel Canva: [tema]
- [ ] Post LinkedIn: [tema]
- [ ] Post X: [tema]

## Martes
- [ ] Carrusel Canva: [tema]
- [ ] Video corto Remotion: [tema]
- [ ] Post LinkedIn: [tema]
- [ ] Post X: [tema]

## Miércoles
- [ ] Carrusel Canva: [tema]
- [ ] Newsletter semanal: [tema principal]
- [ ] Post LinkedIn: [tema]
- [ ] Post X: [tema]

## Jueves
- [ ] Carrusel Canva: [tema]
- [ ] Video corto Remotion: [tema]
- [ ] Post LinkedIn: [tema]
- [ ] Post X: [tema]

## Viernes
- [ ] Carrusel Canva: [tema]
- [ ] Artículo blog: [tema]
- [ ] Post LinkedIn: [tema]
- [ ] Post X: [tema]

## Pilares de Contenido
- Flujos agénticos (30%)
- Herramientas AI (25%)
- Automatización B2B Chile (20%)
- Industria y competencia (15%)
- Tutoriales técnicos (10%)
`;

  fs.writeFileSync(outFile, template, 'utf-8');
  console.log(`  [OK] Calendario creado: calendar/${fileName}`);
  console.log(`  Siguiente paso: llenar temas basado en research reciente\n`);
}

function planView() {
  const calDir = path.join(__dirname, '..', 'calendar');
  if (!fs.existsSync(calDir)) {
    console.log('\n[Plan] No hay calendarios creados. Ejecutar: plan generate\n');
    return;
  }
  const files = fs.readdirSync(calDir).filter(f => f.endsWith('.md')).sort().reverse();
  if (files.length === 0) {
    console.log('\n[Plan] No hay calendarios. Ejecutar: plan generate\n');
    return;
  }
  console.log(`\n[Plan] Último calendario: calendar/${files[0]}`);
  console.log(fs.readFileSync(path.join(calDir, files[0]), 'utf-8'));
}

function planMove(from, to) {
  if (!from || !to) {
    console.error('[Plan] Uso: plan move --from=YYYY-MM-DD --to=YYYY-MM-DD');
    process.exit(1);
  }
  console.log(`\n[Plan] Moviendo contenido de ${from} a ${to}...`);
  console.log('  TODO: implementar move en calendario\n');
}

function createCarousel(opts) {
  console.log('\n[Create] Generando carrusel Canva...');
  if (!process.env.CANVA_API_KEY) {
    console.log('  [WARN] CANVA_API_KEY no configurada.');
    console.log('  Modo: generación de contenido de slides (sin render Canva).');
  }
  const topic = opts.topic || 'tema por definir';
  console.log(`  Tema: ${topic}`);
  console.log('  Slides: 10 (hook + valor + resumen + CTA)');
  console.log('  TODO: implementar Canva API integration\n');
}

function createVideo(opts) {
  console.log('\n[Create] Generando video Remotion...');
  const format = opts.format || 'horizontal';
  console.log(`  Formato: ${format} (${format === 'vertical' ? '1080x1920' : '1920x1080'})`);
  console.log('  Siguiente paso: ejecutar npm run remotion:preview\n');
}

function createPost(opts) {
  console.log('\n[Create] Generando post...');
  const platform = opts.platform || 'linkedin';
  console.log(`  Plataforma: ${platform}`);
  console.log('  TODO: implementar generación de post\n');
}

function createArticle(opts) {
  console.log('\n[Create] Generando artículo...');
  console.log('  TODO: implementar generación de artículo largo\n');
}

function distributePublish(opts) {
  console.log('\n[Distribute] Publicando contenido agendado...');
  const platform = opts.platform || 'todas';
  console.log(`  Plataforma: ${platform}`);
  console.log('  TODO: implementar publicación via n8n webhooks\n');
}

function distributeSchedule(opts) {
  console.log('\n[Distribute] Agendando contenido...');
  console.log(`  Content: ${opts.content || 'no especificado'}`);
  console.log(`  Fecha: ${opts.date || 'no especificada'}`);
  console.log(`  Hora: ${opts.time || 'no especificada'}`);
  console.log('  TODO: implementar scheduling\n');
}

function distributeQueue() {
  console.log('\n[Distribute] Cola de publicación:');
  console.log('  (vacía — no hay contenido agendado)');
  console.log('  TODO: implementar queue desde Convex\n');
}

function distributeStatus() {
  console.log('\n[Distribute] Estado de publicaciones:');
  console.log('  Publicadas hoy: 0');
  console.log('  Agendadas: 0');
  console.log('  En cola: 0');
  console.log('  TODO: implementar tracking desde Convex\n');
}

function communityInbox() {
  console.log('\n[Community] Inbox de menciones:');
  console.log('  (vacío — no hay menciones pendientes)');
  console.log('  TODO: implementar monitoreo de menciones\n');
}

function communityRespond(id) {
  if (!id) {
    console.error('[Community] Uso: community respond --id=mention-001');
    process.exit(1);
  }
  console.log(`\n[Community] Respondiendo mención ${id}...`);
  console.log('  TODO: implementar respuesta con AutoResearch\n');
}

function communityAutoRespond() {
  console.log('\n[Community] Auto-respond activado...');
  console.log('  AutoResearch: ACTIVADO');
  console.log('  TODO: implementar auto-respond pipeline\n');
}

function communityStats() {
  console.log('\n[Community] Estadísticas de engagement:');
  console.log('  TODO: implementar métricas desde APIs de RRSS\n');
}

function showStatus() {
  const today = new Date().toISOString().slice(0, 10);
  console.log(`
=== [EMPRESA] Content Engine — Status ===
Fecha: ${today}

Producción:
  Carruseles: 0 creados
  Videos:     0 renderizados
  Posts:      0 escritos
  Newsletter: 0 enviadas
  Artículos:  0 publicados

Distribución:
  Publicados hoy: 0
  Agendados:      0
  En cola:        0

Community:
  Menciones pendientes: 0
  Respuestas hoy:       0

Estado: Proyecto inicializado — implementar connectors
Siguiente paso: configurar .env con API keys
`);
}

// --- Run ---
main();
