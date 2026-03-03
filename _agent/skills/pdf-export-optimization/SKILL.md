---
name: pdf-export-optimization
description: Specialized rules for single-page PDF layout with high occupancy
---

# Skill: pdf-export-optimization

Esta skill describe los parámetros y reglas necesarios para asegurar que los programas de "Vida y Ministerio" se exporten correctamente en una sola página A4, manteniendo un equilibrio entre legibilidad y espacio libre.

## Parámetros de Diseño (pdfmake)

Para lograr que dos programas quepan en una sola página (ocupando aproximadamente el 80% de la misma), se deben seguir estos lineamientos:

### 1. Márgenes de Página
- **Ideal:** `[25, 20, 25, 20]` (Izquierda, Arriba, Derecha, Abajo).
- Reducir el margen superior e inferior permite ganar espacio crítico para las secciones dinámicas.

### 2. Jerarquía de Fuentes
- **Congregación:** 11pt (Negrita).
- **Título de Programa:** 9.5pt (Negrita).
- **Cabeceras de Sección:** 9pt (Negrita).
- **Títulos de Tareas:** 9pt (Negrita).
- **Nombres y Detalles:** 8.5pt.
- **Etiquetas de Rol:** 7.5pt.

### 3. Espaciado Vertical (Margins)
- **Filas de Tareas (`renderPdfRow`):** `[0, 0.5, 0, 0.5]`.
- **Cabeceras de Bloque:** `[0, 3, 0, 3]`.
- **Línea de Corte (Separación entre programas):** Margen vertical de `8`.

## Regla de Ocupación del 80%

- El diseño final de los dos programas combinados **no debe exceder el 80-85% de la altura total** de la página A4.
- Este espacio libre es intencional y permite al usuario realizar anotaciones manuales o añadir asignaciones imprevistas después de la impresión.
- Si se añaden más filas dinámicas y el PDF empieza a crear una segunda página, se deben reducir proporcionalmente los márgenes verticales de las filas (`renderPdfRow`).
