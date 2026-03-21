#!/usr/bin/env node

/**
 * init-project.js — Inicializa un proyecto Sisteco desde el template.
 * Personaliza CLAUDE.md, AGENTS.md, README.md y package.json.
 * No requiere dependencias externas — solo Node.js built-ins.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = path.resolve(__dirname, '..');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

function toSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quitar acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');
  for (const [search, replace] of Object.entries(replacements)) {
    content = content.split(search).join(replace);
  }
  fs.writeFileSync(filePath, content, 'utf-8');
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function main() {
  console.log('\n=== Sisteco Project Init ===\n');

  const projectName = await ask('Nombre del proyecto: ');
  if (!projectName) {
    console.error('Error: nombre del proyecto es requerido.');
    process.exit(1);
  }

  const projectType = await ask('Tipo de proyecto (landing/saas/workflows/api): ');
  const useGSD = await ask('¿Usar GSD? (s/n): ');

  rl.close();

  const slug = toSlug(projectName);
  const replacements = {
    '{{PROJECT_NAME}}': projectName,
    '{{PROJECT_NAME_SLUG}}': slug,
  };

  // --- Reemplazar placeholders en archivos principales ---
  const filesToPatch = [
    path.join(ROOT, 'CLAUDE.md'),
    path.join(ROOT, 'AGENTS.md'),
    path.join(ROOT, 'README.md'),
    path.join(ROOT, 'package.json'),
  ];

  for (const file of filesToPatch) {
    replaceInFile(file, replacements);
    console.log(`  [OK] Personalizado: ${path.relative(ROOT, file)}`);
  }

  // --- GSD: crear .planning/ si corresponde ---
  if (useGSD.toLowerCase() === 's' || useGSD.toLowerCase() === 'si') {
    const planningDir = path.join(ROOT, '.planning');
    ensureDir(planningDir);

    const projectMd = path.join(planningDir, 'PROJECT.md');
    fs.writeFileSync(
      projectMd,
      `# ${projectName}\n\n**Tipo:** ${projectType || 'sin especificar'}\n**Fecha:** ${new Date().toISOString().slice(0, 10)}\n`,
      'utf-8'
    );

    const roadmapMd = path.join(planningDir, 'ROADMAP.md');
    fs.writeFileSync(
      roadmapMd,
      `# Roadmap — ${projectName}\n\n## Fases\n\n1. [ ] Fase 1: ...\n2. [ ] Fase 2: ...\n`,
      'utf-8'
    );

    console.log('  [OK] Creado: .planning/PROJECT.md');
    console.log('  [OK] Creado: .planning/ROADMAP.md');
  }

  // --- Crear .mcp.json ---
  const mcpPath = path.join(ROOT, '.mcp.json');
  if (!fs.existsSync(mcpPath)) {
    fs.writeFileSync(mcpPath, JSON.stringify({ mcpServers: {} }, null, 2) + '\n', 'utf-8');
    console.log('  [OK] Creado: .mcp.json');
  }

  // --- Crear .env.example si no existe (ya debería existir del template) ---
  const envExample = path.join(ROOT, '.env.example');
  if (!fs.existsSync(envExample)) {
    fs.writeFileSync(
      envExample,
      [
        '# === INFRA ===',
        'CONVEX_DEPLOYMENT=',
        'CONVEX_URL=',
        '',
        '# === AUTH ===',
        'CLERK_PUBLISHABLE_KEY=',
        'CLERK_SECRET_KEY=',
        '',
        '# === AI ===',
        'GEMINI_API_KEY=',
        '',
        '# === WORKFLOWS ===',
        'N8N_BASE_URL=',
        'N8N_API_KEY=',
        '',
        '# === LEADS ===',
        'PB_API_KEY=',
        'PB_LINKEDIN_AGENT_ID=',
        '',
        '# === EMAIL ===',
        'RESEND_API_KEY=',
        '',
        '# === PAGOS ===',
        'REVENIU_API_KEY=',
        '',
        '# === OBSERVABILITY ===',
        'POSTHOG_API_KEY=',
        'SENTRY_DSN=',
        '',
      ].join('\n'),
      'utf-8'
    );
    console.log('  [OK] Creado: .env.example');
  }

  // --- Resumen ---
  console.log('\n=== Proyecto inicializado ===');
  console.log(`  Nombre:  ${projectName}`);
  console.log(`  Slug:    ${slug}`);
  console.log(`  Tipo:    ${projectType || 'sin especificar'}`);
  console.log(`  GSD:     ${useGSD.toLowerCase() === 's' || useGSD.toLowerCase() === 'si' ? 'sí' : 'no'}`);
  console.log('\nSiguiente paso: revisar CLAUDE.md y empezar a trabajar.\n');
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
