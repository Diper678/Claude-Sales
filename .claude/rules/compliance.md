---
paths:
  - "docs/legal/**"
  - "convex/**"
  - "**/*privac*"
  - "**/*consent*"
  - "**/*gdpr*"
---

# Reglas de Compliance — Sisteco

## Ley 21.719 (Chile)
- SIEMPRE referir como "Ley 21.719" — NO solo "GDPR"
- Chile tiene su propia ley de protección de datos personales
- Aplica a TODO tratamiento de datos de personas en Chile
- NINGÚN competidor (Apollo, Instantly, Clay) cumple Ley 21.719 → moat competitivo

## Datos Personales
- Consentimiento ANTES de recolectar datos
- Banner de consent obligatorio en frontend
- Registro de actividades de tratamiento (RAT) en `docs/legal/RAT.md`
- EIPD para scoring AI en `docs/legal/EIPD-scoring-ia.md`
- DPA template para proveedores en `docs/legal/DPA-template.md`

## Seguridad
- Security headers en todas las respuestas HTTP
- MFA habilitado en Clerk para admin
- npm audit regular
- NUNCA almacenar tokens de sesión en localStorage
- Credenciales SOLO en `.env`, NUNCA en código

## Métricas y Contenido
- NUNCA inventar testimonios, métricas o estadísticas
- NUNCA fabricar datos de clientes
- Solo usar métricas verificadas con fuente
