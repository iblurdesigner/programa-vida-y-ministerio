// State management
const defaultProgramState = {
    congregationName: "ALAMEDA",
    programDateStart: "",
    programDateEnd: "",
    weeklyReading: "LECTURA SEMANAL DE LA BIBLIA",
    chairman: "[Nombre]",
    auxCounselor: "Asdrúbal Ayala",

    openingSong: "[Número]",
    openingSongTime: "19:00",
    openingPrayer: "[Nombre]",
    openingPrayerTime: "19:04",

    treasures: {
        talkTitle: "[Título]",
        talkTime: "19:05",
        talkSpeaker: "[Nombre]",
        gemsSpeaker: "[Nombre]",
        gemsTime: "19:15",
        bibleReadingStudent: "[Nombre]",
        bibleReadingTime: "19:25"
    },

    ministryItemsAuditorio: [
        { type: "Asignación", title: "[Título]", time: "X mins.", student: "[Nombre/Nombre]", startTime: "19:30" },
        { type: "Asignación", title: "[Título]", time: "X mins.", student: "[Nombre/Nombre]", startTime: "19:34" },
        { type: "Asignación", title: "[Título]", time: "X mins.", student: "[Nombre/Nombre]", startTime: "19:38" }
    ],
    ministryItemsSalaAuxiliar: [
        { type: "Asignación", title: "[Título]", time: "X mins.", student: "[Nombre/Nombre]", startTime: "19:30" },
        { type: "Asignación", title: "[Título]", time: "X mins.", student: "[Nombre/Nombre]", startTime: "19:34" },
        { type: "Asignación", title: "[Título]", time: "X mins.", student: "[Nombre/Nombre]", startTime: "19:38" }
    ],

    christianLife: {
        middleSong: "[Número]",
        middleSongTime: "19:45",
        items: [
            { title: "[Título]", time: "XX mins.", speaker: "[Nombre]", startTime: "19:54" }
        ],
        conductor: "[Nombre]",
        studyTime: "20:03",
        reader: "[Nombre]",
        closingCommentsTime: "20:33",
        closingSong: "[Número]",
        closingSongTime: "20:36",
        closingPrayer: "[Nombre]"
    }
};

// Deep copy helper
function createInitialState() {
    return JSON.parse(JSON.stringify(defaultProgramState));
}

const state = {
    currentProgram: 'program1', // 'program1' or 'program2'
    program1: createInitialState(),
    program2: createInitialState()
};

// DOM Elements
const inputs = {
    congregationName: document.getElementById('congregationName'),
    programDateStart: document.getElementById('programDateStart'),
    programDateEnd: document.getElementById('programDateEnd'),
    weeklyReading: document.getElementById('weeklyReading'),
    chairman: document.getElementById('chairman'),
    auxCounselor: document.getElementById('auxCounselor'),

    openingSong: document.getElementById('openingSong'),
    openingSongTime: document.getElementById('openingSongTime'),
    openingPrayer: document.getElementById('openingPrayer'),
    openingPrayerTime: document.getElementById('openingPrayerTime'),

    treasuresTalkTitle: document.getElementById('treasuresTalkTitle'),
    treasuresTalkTime: document.getElementById('treasuresTalkTime'),
    treasuresTalkSpeaker: document.getElementById('treasuresTalkSpeaker'),
    gemsSpeaker: document.getElementById('gemsSpeaker'),
    gemsTime: document.getElementById('gemsTime'),
    bibleReadingStudent: document.getElementById('bibleReadingStudent'),
    bibleReadingTime: document.getElementById('bibleReadingTime'),

    middleSong: document.getElementById('middleSong'),
    middleSongTime: document.getElementById('middleSongTime'),

    congregationStudyConductor: document.getElementById('congregationStudyConductor'),
    congregationStudyTime: document.getElementById('congregationStudyTime'),
    congregationStudyReader: document.getElementById('congregationStudyReader'),

    closingSong: document.getElementById('closingSong'),
    closingSongTime: document.getElementById('closingSongTime'),
    closingPrayer: document.getElementById('closingPrayer'),
    closingCommentsTime: document.getElementById('closingCommentsTime')
};

// Initialize
function init() {
    bindInputs();
    loadProgramStateToInputs(); // Load initial state to inputs
    renderMinistryInputsAuditorio();
    renderMinistryInputsSalaAuxiliar();
    renderChristianLifeInputs();
    renderPreview();
}

function switchProgram(programId) {
    state.currentProgram = programId;
    loadProgramStateToInputs();
    renderMinistryInputsAuditorio();
    renderMinistryInputsSalaAuxiliar();
    renderChristianLifeInputs();
    // No need to renderPreview here as inputs didn't change the preview, 
    // but we might want to highlight which one is being edited if we add that UI later.
}

function getCurrentState() {
    return state[state.currentProgram];
}

function loadProgramStateToInputs() {
    const currentState = getCurrentState();

    // Helper to set value or empty if matches placeholder
    const setVal = (input, val) => {
        if (!input) return;
        if (val === input.placeholder) {
            input.value = "";
        } else {
            input.value = val;
        }
    };

    // Map state to inputs
    inputs.congregationName.value = currentState.congregationName;
    inputs.programDateStart.value = currentState.programDateStart;
    inputs.programDateEnd.value = currentState.programDateEnd;
    inputs.weeklyReading.value = currentState.weeklyReading;
    setVal(inputs.chairman, currentState.chairman);
    inputs.auxCounselor.value = currentState.auxCounselor;

    setVal(inputs.openingSong, currentState.openingSong);
    inputs.openingSongTime.value = currentState.openingSongTime;
    setVal(inputs.openingPrayer, currentState.openingPrayer);
    inputs.openingPrayerTime.value = currentState.openingPrayerTime;

    setVal(inputs.treasuresTalkTitle, currentState.treasures.talkTitle);
    inputs.treasuresTalkTime.value = currentState.treasures.talkTime;
    setVal(inputs.treasuresTalkSpeaker, currentState.treasures.talkSpeaker);
    setVal(inputs.gemsSpeaker, currentState.treasures.gemsSpeaker);
    inputs.gemsTime.value = currentState.treasures.gemsTime;
    setVal(inputs.bibleReadingStudent, currentState.treasures.bibleReadingStudent);
    inputs.bibleReadingTime.value = currentState.treasures.bibleReadingTime;

    setVal(inputs.middleSong, currentState.christianLife.middleSong);
    inputs.middleSongTime.value = currentState.christianLife.middleSongTime;

    setVal(inputs.congregationStudyConductor, currentState.christianLife.conductor);
    inputs.congregationStudyTime.value = currentState.christianLife.studyTime;
    setVal(inputs.congregationStudyReader, currentState.christianLife.reader);

    setVal(inputs.closingSong, currentState.christianLife.closingSong);
    inputs.closingSongTime.value = currentState.christianLife.closingSongTime;
    setVal(inputs.closingPrayer, currentState.christianLife.closingPrayer);
    inputs.closingCommentsTime.value = currentState.christianLife.closingCommentsTime || "20:33";
}

function bindInputs() {
    // Bind static inputs
    Object.keys(inputs).forEach(key => {
        if (inputs[key]) {
            inputs[key].addEventListener('input', (e) => {
                updateStateFromInput(key, e.target.value);
            });
        }
    });
}

function updateStateFromInput(key, value) {
    const currentState = getCurrentState();
    const input = inputs[key];

    // If value is empty and input has a bracketed placeholder, restore placeholder to state
    let finalValue = value;
    if (value === "" && input && input.placeholder && input.placeholder.startsWith("[")) {
        finalValue = input.placeholder;
    }

    // Map flat inputs to state structure
    if (key.startsWith('treasures')) {
        const subKey = key.replace('treasures', '');
        const prop = subKey.charAt(0).toLowerCase() + subKey.slice(1);
        currentState.treasures[prop] = finalValue;
    } else if (key === 'gemsSpeaker') {
        currentState.treasures.gemsSpeaker = finalValue;
    } else if (key === 'gemsTime') {
        currentState.treasures.gemsTime = finalValue;
    } else if (key === 'bibleReadingStudent') {
        currentState.treasures.bibleReadingStudent = finalValue;
    } else if (key === 'bibleReadingTime') {
        currentState.treasures.bibleReadingTime = finalValue;
    } else if (key === 'congregationStudyConductor') {
        currentState.christianLife.conductor = finalValue;
    } else if (key === 'congregationStudyTime') {
        currentState.christianLife.studyTime = finalValue;
    } else if (key === 'congregationStudyReader') {
        currentState.christianLife.reader = finalValue;
    } else if (key === 'middleSong') {
        currentState.christianLife.middleSong = finalValue;
    } else if (key === 'middleSongTime') {
        currentState.christianLife.middleSongTime = finalValue;
    } else if (key === 'closingSong') {
        currentState.christianLife.closingSong = finalValue;
    } else if (key === 'closingSongTime') {
        currentState.christianLife.closingSongTime = finalValue;
    } else if (key === 'closingPrayer') {
        currentState.christianLife.closingPrayer = finalValue;
    } else if (key === 'closingCommentsTime') {
        currentState.christianLife.closingCommentsTime = finalValue;
    } else if (currentState.hasOwnProperty(key)) {
        currentState[key] = finalValue;
    }

    renderPreview();
}

// --- Dynamic Sections Logic ---

function renderMinistryInputsAuditorio() {
    const container = document.getElementById('ministryItemsAuditorio');
    if (!container) return;
    container.innerHTML = '';
    const currentState = getCurrentState();

    currentState.ministryItemsAuditorio.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'item-row';
        div.innerHTML = `
            <div style="display:flex; flex-direction:column; width:100%; gap:5px; border-bottom:1px solid #eee; padding-bottom:5px; margin-bottom:5px;">
                <div style="display:flex; gap:5px;">
                    <span style="font-weight:bold; color:#dfae26;">${index + 4}.</span>
                    <input type="time" value="${item.startTime || ''}" style="width:90px;" oninput="updateMinistryItemAuditorio(${index}, 'startTime', this.value)">
                    <input type="text" placeholder="[Título]" value="${item.title === '[Título]' ? '' : item.title}" oninput="updateMinistryItemAuditorio(${index}, 'title', this.value)">
                    <input type="text" placeholder="Tiempo" value="${item.time}" style="width:60px;" oninput="updateMinistryItemAuditorio(${index}, 'time', this.value)">
                    <button class="btn-remove" onclick="removeMinistryItemAuditorio(${index})">×</button>
                </div>
                <input type="text" placeholder="[Nombre/Nombre]" value="${item.student === '[Nombre/Nombre]' ? '' : item.student}" oninput="updateMinistryItemAuditorio(${index}, 'student', this.value)">
            </div>
        `;
        container.appendChild(div);
    });
}

function renderMinistryInputsSalaAuxiliar() {
    const container = document.getElementById('ministryItemsSalaAuxiliar');
    if (!container) return;
    container.innerHTML = '';
    const currentState = getCurrentState();

    currentState.ministryItemsSalaAuxiliar.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'item-row';
        div.innerHTML = `
            <div style="display:flex; flex-direction:column; width:100%; gap:5px; border-bottom:1px solid #eee; padding-bottom:5px; margin-bottom:5px;">
                <div style="display:flex; gap:5px;">
                    <span style="font-weight:bold; color:#dfae26;">${index + 4}.</span>
                    <input type="time" value="${item.startTime || ''}" style="width:90px;" oninput="updateMinistryItemSalaAuxiliar(${index}, 'startTime', this.value)">
                    <input type="text" placeholder="[Título]" value="${item.title === '[Título]' ? '' : item.title}" oninput="updateMinistryItemSalaAuxiliar(${index}, 'title', this.value)">
                    <input type="text" placeholder="Tiempo" value="${item.time}" style="width:60px;" oninput="updateMinistryItemSalaAuxiliar(${index}, 'time', this.value)">
                    <button class="btn-remove" onclick="removeMinistryItemSalaAuxiliar(${index})">×</button>
                </div>
                <input type="text" placeholder="[Nombre/Nombre]" value="${item.student === '[Nombre/Nombre]' ? '' : item.student}" oninput="updateMinistryItemSalaAuxiliar(${index}, 'student', this.value)">
            </div>
        `;
        container.appendChild(div);
    });
}

function updateMinistryItemAuditorio(index, field, value) {
    const currentState = getCurrentState();
    const defaults = { title: "[Título]", time: "X mins.", student: "[Nombre/Nombre]", startTime: "" };

    // If value is empty, restore default
    let finalValue = value;
    if (value === "" && defaults[field]) {
        finalValue = defaults[field];
    }

    currentState.ministryItemsAuditorio[index][field] = finalValue;
    renderPreview();
}

function addMinistryItemAuditorio() {
    const currentState = getCurrentState();
    currentState.ministryItemsAuditorio.push({ type: "Asignación", title: "[Título]", time: "X mins.", student: "[Nombre/Nombre]", startTime: "" });
    renderMinistryInputsAuditorio();
    renderPreview();
}

function removeMinistryItemAuditorio(index) {
    const currentState = getCurrentState();
    currentState.ministryItemsAuditorio.splice(index, 1);
    renderMinistryInputsAuditorio();
    renderPreview();
}

function updateMinistryItemSalaAuxiliar(index, field, value) {
    const currentState = getCurrentState();
    const defaults = { title: "[Título]", time: "X mins.", student: "[Nombre/Nombre]", startTime: "" };

    // If value is empty, restore default
    let finalValue = value;
    if (value === "" && defaults[field]) {
        finalValue = defaults[field];
    }

    currentState.ministryItemsSalaAuxiliar[index][field] = finalValue;
    renderPreview();
}

function addMinistryItemSalaAuxiliar() {
    const currentState = getCurrentState();
    currentState.ministryItemsSalaAuxiliar.push({ type: "Asignación", title: "[Título]", time: "X mins.", student: "[Nombre/Nombre]", startTime: "" });
    renderMinistryInputsSalaAuxiliar();
    renderPreview();
}

function removeMinistryItemSalaAuxiliar(index) {
    const currentState = getCurrentState();
    currentState.ministryItemsSalaAuxiliar.splice(index, 1);
    renderMinistryInputsSalaAuxiliar();
    renderPreview();
}

function renderChristianLifeInputs() {
    const container = document.getElementById('christianLifeItems');
    container.innerHTML = '';
    const currentState = getCurrentState();

    // Start numbering after ministry items (3 + max length of both rooms) + 1 (middle song) -> actually numbering continues
    let startIndex = 3 + Math.max(currentState.ministryItemsAuditorio.length, currentState.ministryItemsSalaAuxiliar.length);

    currentState.christianLife.items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'item-row';
        div.innerHTML = `
            <div style="display:flex; flex-direction:column; width:100%; gap:5px;">
                <div style="display:flex; gap:5px; width:100%; align-items:center;">
                    <span style="font-weight:bold; color:#8a1c34;">${startIndex + index + 1}.</span>
                    <input type="time" value="${item.startTime || ''}" style="width:90px;" oninput="updateChristianLifeItem(${index}, 'startTime', this.value)">
                    <input type="text" placeholder="[Título]" value="${item.title === '[Título]' ? '' : item.title}" oninput="updateChristianLifeItem(${index}, 'title', this.value)">
                    <input type="text" placeholder="Tiempo" value="${item.time}" style="width:60px;" oninput="updateChristianLifeItem(${index}, 'time', this.value)">
                    <button class="btn-remove" onclick="removeChristianLifeItem(${index})">×</button>
                </div>
                <input type="text" placeholder="[Nombre]" value="${item.speaker === '[Nombre]' ? '' : item.speaker}" style="margin-left: 20px; width: calc(100% - 20px);" oninput="updateChristianLifeItem(${index}, 'speaker', this.value)">
            </div>
        `;
        container.appendChild(div);
    });
}

function updateChristianLifeItem(index, field, value) {
    const currentState = getCurrentState();
    const defaults = { title: "[Título]", time: "XX mins.", speaker: "[Nombre]", startTime: "" };

    // If value is empty, restore default
    let finalValue = value;
    if (value === "" && defaults[field]) {
        finalValue = defaults[field];
    }

    currentState.christianLife.items[index][field] = finalValue;
    renderPreview();
}

function addChristianLifeItem() {
    const currentState = getCurrentState();
    currentState.christianLife.items.push({ title: "[Título]", time: "XX mins.", speaker: "[Nombre]", startTime: "" });
    renderChristianLifeInputs();
    renderPreview();
}

function removeChristianLifeItem(index) {
    const currentState = getCurrentState();
    currentState.christianLife.items.splice(index, 1);
    renderChristianLifeInputs();
    renderPreview();
}

// --- Rendering Preview ---

function renderPreview() {
    document.getElementById('programCopy1').innerHTML = generateProgramHTML(state.program1);
    document.getElementById('programCopy2').innerHTML = generateProgramHTML(state.program2);
}

function formatDateRange(startStr, endStr) {
    if (!startStr) return "FECHA";

    const getParts = (s) => {
        const p = s.split('-');
        return { year: parseInt(p[0]), month: parseInt(p[1]) - 1, day: parseInt(p[2]) };
    };

    const start = getParts(startStr);
    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    if (!endStr) {
        return `${start.day} de ${monthNames[start.month]} de ${start.year}`;
    }

    const end = getParts(endStr);

    if (start.month === end.month) {
        return `${start.day}-${end.day} de ${monthNames[start.month]}`;
    } else {
        return `${start.day} de ${monthNames[start.month]} a ${end.day} de ${monthNames[end.month]}`;
    }
}

function generateProgramHTML(programState) {
    // Helper to render ministry items for Auditorio Principal
    let ministryHTMLAuditorio = '';
    programState.ministryItemsAuditorio.forEach((item, index) => {
        ministryHTMLAuditorio += `
            <div class="program-item">
                <div class="time">${item.startTime || '0:00'}</div>
                <div><strong>${index + 4}. ${item.title}</strong> (${item.time})</div>
                <div class="role-label">Estudiante/Ayudante:</div>
                <div class="name">${item.student}</div>
            </div>
        `;
    });

    // Helper to render ministry items for Sala Auxiliar
    let ministryHTMLSalaAuxiliar = '';
    programState.ministryItemsSalaAuxiliar.forEach((item, index) => {
        ministryHTMLSalaAuxiliar += `
            <div class="program-item">
                <div class="time">${item.startTime || '0:00'}</div>
                <div><strong>${index + 4}. ${item.title}</strong> (${item.time})</div>
                <div class="role-label">Estudiante/Ayudante:</div>
                <div class="name">${item.student}</div>
            </div>
        `;
    });

    // Helper to render christian life items
    let christianLifeHTML = '';
    let clStartIndex = 3 + Math.max(programState.ministryItemsAuditorio.length, programState.ministryItemsSalaAuxiliar.length);
    programState.christianLife.items.forEach((item, index) => {
        christianLifeHTML += `
            <div class="program-item">
                <div class="time">${item.startTime || '0:00'}</div>
                <div><strong>${clStartIndex + index + 1}. ${item.title}</strong> (${item.time})</div>
                <div class="role-label"></div>
                <div class="name">${item.speaker}</div>
            </div>
        `;
    });

    // Calculate next number for Congregation Study
    let studyNumber = clStartIndex + programState.christianLife.items.length + 1;

    return `
        <div class="header-row">
            <div class="congregation-name">${programState.congregationName}</div>
            <div class="program-title">Programa para la reunión de entre semana</div>
        </div>
        
        <div class="top-info">
            <div class="label">Presidente:</div>
            <div class="value">${programState.chairman}</div>
            <div class="label">Consejero de la sala auxiliar:</div>
            <div class="value">${programState.auxCounselor}</div>
        </div>

        <div class="date-row">
            <div>${formatDateRange(programState.programDateStart, programState.programDateEnd)} | ${programState.weeklyReading}</div>
        </div>

        <div class="program-item song">
            <div class="time">${programState.openingSongTime}</div>
            <div>• Canción ${programState.openingSong}</div>
        </div>
        <div class="program-item">
            <div class="time">${programState.openingPrayerTime}</div>
            <div>• Palabras de introducción (1 min.)</div>
            <div class="role-label">Oración:</div>
            <div class="name">${programState.openingPrayer}</div>
        </div>

        <!-- TESOROS -->
        <div class="section-header bg-grey">
            <span>TESOROS DE LA BIBLIA</span>
        </div>
        <div class="treasures-grid">
            <div class="program-item">
                <div class="time">${programState.treasures.talkTime}</div>
                <div><strong>1. ${programState.treasures.talkTitle}</strong> (10 mins.)</div>
                <div class="role-label"></div>
                <div class="name">${programState.treasures.talkSpeaker}</div>
            </div>
            <div class="program-item">
                <div class="time">${programState.treasures.gemsTime}</div>
                <div><strong>2. Busquemos perlas escondidas</strong> (10 mins.)</div>
                <div class="role-label"></div>
                <div class="name">${programState.treasures.gemsSpeaker}</div>
            </div>
            <div class="program-item">
                <div class="time">${programState.treasures.bibleReadingTime}</div>
                <div><strong>3. Lectura de la Biblia</strong> (4 mins.)</div>
                <div class="role-label">Estudiante:</div>
                <div class="name">${programState.treasures.bibleReadingStudent}</div>
            </div>
        </div>

        <!-- MAESTROS -->
        <div class="section-header bg-gold">
            <span>SEAMOS MEJORES MAESTROS</span>
        </div>
        <div class="ministry-grid">
            <div style="font-weight: bold; margin-top: 2px; margin-bottom: 2px; color: #333;">Auditorio Principal</div>
            ${ministryHTMLAuditorio}
            <div style="font-weight: bold; margin-top: 4px; margin-bottom: 2px; color: #333;">Sala Auxiliar</div>
            ${ministryHTMLSalaAuxiliar}
        </div>

        <!-- VIDA CRISTIANA -->
        <div class="section-header bg-red">
            <span>NUESTRA VIDA CRISTIANA</span>
        </div>
        <div class="christian-life-grid">
            <div class="program-item song">
                <div class="time">${programState.christianLife.middleSongTime}</div>
                <div>• Canción ${programState.christianLife.middleSong}</div>
            </div>
            ${christianLifeHTML}
            <div class="program-item">
                <div class="time">${programState.christianLife.studyTime}</div>
                <div><strong>${studyNumber}. Estudio bíblico de la congregación</strong> (30 mins.)</div>
                <div class="role-label">Conductor/Lector:</div>
                <div class="name">${programState.christianLife.conductor}<br>${programState.christianLife.reader}</div>
            </div>
            <div class="program-item">
                <div class="time">${programState.christianLife.closingCommentsTime || '20:33'}</div>
                <div>• Palabras de conclusión (3 min.)</div>
            </div>
            <div class="program-item song">
                <div class="time">${programState.christianLife.closingSongTime}</div>
                <div>• Canción ${programState.christianLife.closingSong}</div>
                <div class="role-label">Oración:</div>
                <div class="name">${programState.christianLife.closingPrayer}</div>
            </div>
        </div>
    `;
}

// --- Export Logic ---

function generatePDF() {
    // The .sheet-a4 element already contains the rendered preview (static HTML, not inputs)
    // We just need to clone it and generate the PDF
    const element = document.querySelector('.sheet-a4');

    if (!element) {
        alert('No se encontró contenido para exportar.');
        return;
    }

    // Clone the element
    const clone = element.cloneNode(true);

    // Create a temporary container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '210mm';
    container.style.background = 'white';

    // Style the clone
    clone.style.width = '210mm';
    clone.style.minHeight = '297mm';
    clone.style.margin = '0';
    clone.style.boxShadow = 'none';
    clone.style.transform = 'none';

    container.appendChild(clone);
    document.body.appendChild(container);

    const opt = {
        margin: 0,
        filename: 'programa_vida_ministerio.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            logging: false
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: 'avoid-all' }
    };

    html2pdf().set(opt).from(clone).save().then(() => {
        document.body.removeChild(container);
    }).catch(err => {
        console.error("PDF generation error:", err);
        alert("Error al generar el PDF. Por favor, intente de nuevo.");
        if (document.body.contains(container)) {
            document.body.removeChild(container);
        }
    });
}

function generateWordMarkup(programState) {
    const tableStyle = 'width: 100%; border-collapse: collapse; font-family: Helvetica, Arial, sans-serif; font-size: 9pt;';
    const tdStyle = 'padding: 1px 2px; vertical-align: top;';
    const headerStyle = 'background-color: #5f6368; color: white; font-weight: bold; padding: 2px; font-size: 9pt; text-transform: uppercase;';
    const goldStyle = 'background-color: #dfae26; color: white; font-weight: bold; padding: 2px; font-size: 9pt; text-transform: uppercase;';
    const redStyle = 'background-color: #8a1c34; color: white; font-weight: bold; padding: 2px; font-size: 9pt; text-transform: uppercase;';

    // Helper to format rows
    const createRow = (time, content, role, name, boldRole = false) => `
        <tr>
            <td style="${tdStyle} width: 45px; color:#555;">${time}</td>
            <td style="${tdStyle}">${content}</td>
            <td style="${tdStyle} text-align: right; color: #666; font-size: 9pt; width: 100px;">${role}</td>
            <td style="${tdStyle} width: 140px;">${name}</td>
        </tr>
    `;

    let html = `<table style="${tableStyle}">`;

    // Header
    html += `
        <tr>
            <td colspan="4" style="border-bottom: 2px solid black; padding-bottom: 3px;">
                <table style="width:100%;">
                    <tr>
                        <td style="font-size:11pt; font-weight:bold; text-transform:uppercase;">${programState.congregationName}</td>
                        <td style="font-size:10pt; font-weight:bold; text-align:right; font-family:serif;">Programa para la reunión de entre semana</td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="4" style="text-align: right; padding-top: 1px; padding-bottom: 1px; font-size: 6pt; color: #555;">
                <table style="width:100%">
                    <tr>
                        <td style="text-align:right;">
                            Presidente: <span style="color:black; font-weight:normal;">${programState.chairman}</span><br>
                            Consejero de la sala auxiliar: <span style="color:black; font-weight:normal;">${programState.auxCounselor}</span>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="4" style="border-bottom: 1px solid #ccc; font-weight: bold; padding: 2px 0;">
                ${formatDateRange(programState.programDateStart, programState.programDateEnd)} | ${programState.weeklyReading}
            </td>
        </tr>
        <tr><td colspan="4" style="height: 1px;"></td></tr>
    `;

    // Opening
    html += createRow(programState.openingSongTime, `<b>• Canción ${programState.openingSong}</b>`, '', '');
    html += createRow(programState.openingPrayerTime, '• Palabras de introducción (1 min.)', 'Oración:', programState.openingPrayer);

    // Treasures
    html += `<tr><td colspan="4" style="${headerStyle}">TESOROS DE LA BIBLIA</td></tr>`;
    html += createRow(programState.treasures.talkTime, `<b>1. ${programState.treasures.talkTitle}</b> (10 mins.)`, '', programState.treasures.talkSpeaker);
    html += createRow(programState.treasures.gemsTime, `<b>2. Busquemos perlas escondidas</b> (10 mins.)`, '', programState.treasures.gemsSpeaker);
    html += createRow(programState.treasures.bibleReadingTime, `<b>3. Lectura de la Biblia</b> (4 mins.)`, 'Estudiante:', programState.treasures.bibleReadingStudent);

    // Ministry
    html += `<tr><td colspan="4" style="${goldStyle}">SEAMOS MEJORES MAESTROS</td></tr>`;
    html += `<tr><td colspan="4" style="padding: 1px 4px; font-weight: bold; color: #333; font-size: 9pt;">Auditorio Principal</td></tr>`;
    programState.ministryItemsAuditorio.forEach((item, index) => {
        html += createRow(
            item.startTime || '0:00',
            `<b>${index + 4}. ${item.title}</b> (${item.time})`,
            'Estudiante/Ayudante:',
            item.student
        );
    });
    html += `<tr><td colspan="4" style="padding: 2px 4px 1px 4px; font-weight: bold; color: #333; font-size: 9pt;">Sala Auxiliar</td></tr>`;
    programState.ministryItemsSalaAuxiliar.forEach((item, index) => {
        html += createRow(
            item.startTime || '0:00',
            `<b>${index + 4}. ${item.title}</b> (${item.time})`,
            'Estudiante/Ayudante:',
            item.student
        );
    });

    // Christian Life
    html += `<tr><td colspan="4" style="${redStyle}">NUESTRA VIDA CRISTIANA</td></tr>`;
    html += createRow(programState.christianLife.middleSongTime, `<b>• Canción ${programState.christianLife.middleSong}</b>`, '', '');

    let clStartIndex = 3 + Math.max(programState.ministryItemsAuditorio.length, programState.ministryItemsSalaAuxiliar.length);
    programState.christianLife.items.forEach((item, index) => {
        html += createRow(
            item.startTime || '0:00',
            `<b>${clStartIndex + index + 1}. ${item.title}</b> (${item.time})`,
            '',
            item.speaker
        );
    });

    let studyNumber = clStartIndex + programState.christianLife.items.length + 1;
    html += createRow(programState.christianLife.studyTime, `<b>${studyNumber}. Estudio bíblico de la congregación</b> (30 mins.)`, 'Conductor/Lector:', `${programState.christianLife.conductor}<br>${programState.christianLife.reader}`);
    html += createRow(programState.christianLife.closingCommentsTime || '20:33', '• Palabras de conclusión (3 min.)', '', '');
    html += createRow(programState.christianLife.closingSongTime, `<b>• Canción ${programState.christianLife.closingSong}</b>`, 'Oración:', programState.christianLife.closingPrayer);

    html += `</table>`;
    return html;
}

function exportToWord() {
    const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                @page {
                    size: A4;
                    margin: 0.5cm; /* Minimal margins to fit 2 programs on one page */
                }
                body { 
                    font-family: 'Helvetica', 'Arial', sans-serif; 
                    margin: 0; 
                    padding: 0;
                }
            </style>
        </head>
        <body>
            ${generateWordMarkup(state.program1)}
            <div style="height: 5px; border-bottom: 1px dashed #999; margin: 8px 0;"></div>
            ${generateWordMarkup(state.program2)}
        </body>
        </html>
    `;

    const converted = htmlDocx.asBlob(content, { orientation: 'portrait' });
    saveAs(converted, 'programa_vida_ministerio.docx');
}

// Start
init();
