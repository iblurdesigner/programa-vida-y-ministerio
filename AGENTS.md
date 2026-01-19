# AGENTS.md - Contexto del Proyecto

## 1. Descripción del Proyecto
Este proyecto es una aplicación web (SPA) para generar y editar cronogramas de reuniones religiosas ("Vida y Ministerio").
La función principal es permitir al usuario ingresar datos en un formulario y ver en tiempo real una previsualización de una hoja A4 lista para imprimir.

### Objetivo Principal
Generar una hoja A4 que contiene **2 copias idénticas (o distintas)** del programa verticalmente, separadas por líneas de corte, para facilitar la impresión y distribución masiva en la congregación.

## 2. Tech Stack
* **Core:** HTML5, CSS3, JavaScript (Vanilla - ES6+).
* **Dependencias (CDN):**
    * `html2pdf.js`: Para renderizar el DOM a PDF.
    * `html-docx-js`: Para convertir HTML a formato Word (.docx).
    * `FileSaver.js`: Para gestionar la descarga de archivos.
* **Estilos:** CSS nativo con Variables CSS (`:root`) para theming. No se usan preprocesadores ni frameworks CSS (como Tailwind o Bootstrap).

## 3. Arquitectura de la Interfaz (UI)
La pantalla se divide en dos paneles principales (`index.html`):

1.  **Panel Izquierdo (Editor - `.editor-panel`):**
    * Contiene el formulario de entrada de datos.
    * Permite alternar entre editar `Programa 1` o `Programa 2` mediante Radio Buttons.
    * Maneja secciones dinámicas donde se pueden agregar/eliminar filas (ej. "Seamos Mejores Maestros" con dos salas independientes).

2.  **Panel Derecho (Preview - `.preview-container`):**
    * Muestra una hoja A4 visual (`.sheet-a4`).
    * Dentro de la hoja hay 2 contenedores: `#programCopy1`, `#programCopy2`.
    * La previsualización NO son inputs, es HTML estático regenerado cada vez que cambia el estado.

## 4. Gestión del Estado (`script.js`)
El estado es la única fuente de verdad. No se lee del DOM para generar reportes, se lee del objeto `state`.

### Estructura del Estado
El objeto global `state` contiene:
* `currentProgram`: String ('program1', 'program2').
* `program1`, `program2`: Objetos independientes con la misma estructura de datos.

**Modelo de Datos de un Programa:**
```javascript
{
    congregationName: String,
    programDateStart: String,
    // ... campos básicos ...
    treasures: { /* Datos de la sección Tesoros */ },
    ministryItemsAuditorio: [ /* Array dinámico de asignaciones para Auditorio Principal */ ],
    ministryItemsSalaAuxiliar: [ /* Array dinámico de asignaciones para Sala Auxiliar */ ],
    christianLife: { 
        items: [ /* Array dinámico de partes */ ],
        // ... otros campos ...
    }
}


### Flujo de Datos
Input Event: El usuario escribe en el formulario.

Update State: Se actualiza la propiedad correspondiente en state[state.currentProgram].

Render Preview: Se llama a renderPreview(), que regenera el HTML de los 2 programas en la derecha basándose en el estado actualizado.

5. Secciones del Cronograma
El programa se divide estrictamente en 3 bloques lógicos (reflejados en UI y exportación):

Tesoros de la Biblia (Color Gris):

Discurso, Perlas Escondidas, Lectura de la Biblia.

Seamos Mejores Maestros (Color Dorado):

Sección duplicada con dos subsalas independientes:
* **Auditorio Principal** (ministryItemsAuditorio): Array dinámico de asignaciones.
* **Sala Auxiliar** (ministryItemsSalaAuxiliar): Array dinámico de asignaciones.

Cada sala tiene numeración independiente (empieza en 4 para cada una).
Campos por asignación: Hora inicio, Título, Duración, Estudiante/Ayudante.

Nuestra Vida Cristiana (Color Rojo):

Canción intermedia.

Sección dinámica (christianLife.items) para partes varias.

Estudio Bíblico, Palabras de conclusión, Canción final y Oración.

6. Lógica de Exportación
Exportar a PDF (generatePDF)
Clona el nodo DOM .sheet-a4.

Lo coloca en un contenedor temporal invisible.

Usa html2pdf con configuración scale: 2 para alta calidad.

Importante: El PDF es una "foto" exacta de la previsualización HTML.

Exportar a Word (exportToWord)
No usa la previsualización del DOM.

Construye una cadena de HTML string cruda (generateWordMarkup) usando tablas HTML antiguas (para compatibilidad con Word).

Genera un documento que concatena los 2 programas separados por saltos de línea visuales.

7. Reglas para el Agente (Instrucciones de Codificación)
Preservar Vanilla JS: No introduzca React, Vue o TypeScript. Mantener la simplicidad del archivo único script.js.

Manejo de Arrays: Al modificar la lógica de "Mejores Maestros" o "Vida Cristiana", recuerde que son arrays en el estado y requieren regenerar el DOM completo de esa sección en el formulario. Para "Mejores Maestros" existen funciones separadas para cada sala (renderMinistryInputsAuditorio, renderMinistryInputsSalaAuxiliar, etc.).

Estilos de Impresión: Cualquier cambio visual debe verificarse contra @media print en styles.css para asegurar que quepa en una hoja A4.

No romper la estructura de 2 copias: La funcionalidad core es imprimir 2 programas por hoja. Cualquier nueva feature debe replicarse en las 2 copias. La numeración de "Vida Cristiana" se calcula usando el máximo entre las dos salas de "Mejores Maestros" para mantener consistencia.