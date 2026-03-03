---
name: project-core
description: Core architecture and rules for the Vida y Ministerio project
---

# Skill: project-core

Esta skill contiene las reglas fundamentales y la arquitectura del proyecto "Vida y Ministerio". **Debe ser consultada antes de realizar cualquier cambio en el código.**

## Arquitectura

- **Single Page Application (SPA):** Todo el proyecto vive en `index.html`, `styles.css` y `script.js`.
- **Estado como Fuente de Verdad:** El objeto `state` en `script.js` maneja toda la información. Nunca leas directamente del DOM para obtener datos del programa.
- **Sincronización:** Cada cambio en el estado debe disparar `renderPreview()`.

## Reglas de Oro

1.  **Mantener Vanilla JS:** No añadir frameworks como React o Tailwind. Usar JS y CSS nativo.
2.  **Doble Programa:** El sistema debe manejar siempre dos programas independientes (`program1` y `program2`) en una sola hoja A4.
3.  **PDF Vectorial:** La exportación a PDF se realiza con `pdfmake`. Cualquier cambio visual en la previsualización HTML debe ser replicado manualmente en la definición de `pdfmake` en `script.js`.
4.  **Numeración Dinámica:** La numeración de la sección "Nuestra Vida Cristiana" debe calcularse dinámicamente basándose en la longitud de las secciones anteriores para mantener la correlación.
5.  **Lectura de la Biblia (Tesoros):** El punto 3 de la sección "Tesoros de la Biblia" siempre debe permitir dos asignaciones simultáneas (Auditorio Principal y Sala Auxiliar) cuando sea necesario, manteniendo el mismo número de actividad.

## Despliegue

- El proyecto se despliega automáticamente en GitHub Pages mediante GitHub Actions (`.github/workflows/static.yml`).
