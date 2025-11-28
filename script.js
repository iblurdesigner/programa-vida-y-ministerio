// State management
const defaultProgramState = {
    congregationName: "ALAMEDA",
    programDateStart: "",
    programDateEnd: "",
    weeklyReading: "LECTURA SEMANAL DE LA BIBLIA",
    chairman: "[Nombre]",
    auxCounselor: "Asdrúbal Ayala",

    openingSong: "[Número]",
    openingSongTime: "0:00",
    openingPrayer: "[Nombre]",
    openingPrayerTime: "0:00",

    treasures: {
        talkTitle: "[Título]",
        talkTime: "0:00",
        talkSpeaker: "[Nombre]",
        gemsSpeaker: "[Nombre]",
        gemsTime: "0:00",
        bibleReadingStudent: "[Nombre]",
        bibleReadingTime: "0:00"
    },

    ministryItems: [
        { type: "Asignación", title: "[Título]", time: "X mins.", student: "[Nombre/Nombre]" },
        { type: "Asignación", title: "[Título]", time: "X mins.", student: "[Nombre/Nombre]" },
        { type: "Asignación", title: "[Título]", time: "X mins.", student: "[Nombre/Nombre]" }
    ],

    christianLife: {
        middleSong: "[Número]",
        middleSongTime: "0:00",
        items: [
            { title: "[Título]", time: "XX mins.", speaker: "[Nombre]" },
            { title: "[Título]", time: "XX mins.", speaker: "[Nombre]" }
        ],
        conductor: "[Nombre/Nombre]",
        studyTime: "0:00",
        reader: "[Nombre/Nombre]",
        closingSong: "[Número]",
        closingSongTime: "0:00",
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
    closingPrayer: document.getElementById('closingPrayer')
};

// Initialize
function init() {
    bindInputs();
    loadProgramStateToInputs(); // Load initial state to inputs
    renderMinistryInputs();
    renderChristianLifeInputs();
    renderPreview();
}

function switchProgram(programId) {
    state.currentProgram = programId;
    loadProgramStateToInputs();
    renderMinistryInputs();
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
    } else if (currentState.hasOwnProperty(key)) {
        currentState[key] = finalValue;
    }

    renderPreview();
}

// --- Dynamic Sections Logic ---

function renderMinistryInputs() {
    const container = document.getElementById('ministryItems');
    container.innerHTML = '';
    const currentState = getCurrentState();

    currentState.ministryItems.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'item-row';
        div.innerHTML = `
            <div style="display:flex; flex-direction:column; width:100%; gap:5px; border-bottom:1px solid #eee; padding-bottom:5px; margin-bottom:5px;">
                <div style="display:flex; gap:5px;">
                    <span style="font-weight:bold; color:#dfae26;">${index + 4}.</span>
                    <input type="text" placeholder="[Título]" value="${item.title === '[Título]' ? '' : item.title}" oninput="updateMinistryItem(${index}, 'title', this.value)">
                    <input type="text" placeholder="Tiempo" value="${item.time}" style="width:60px;" oninput="updateMinistryItem(${index}, 'time', this.value)">
                    <button class="btn-remove" onclick="removeMinistryItem(${index})">×</button>
                </div>
                <input type="text" placeholder="[Nombre/Nombre]" value="${item.student === '[Nombre/Nombre]' ? '' : item.student}" oninput="updateMinistryItem(${index}, 'student', this.value)">
            </div>
        `;
        container.appendChild(div);
    });
}

function updateMinistryItem(index, field, value) {
    const currentState = getCurrentState();
    const defaults = { title: "[Título]", time: "X mins.", student: "[Nombre/Nombre]" };

    // If value is empty, restore default
    let finalValue = value;
    if (value === "" && defaults[field]) {
        finalValue = defaults[field];
    }

    currentState.ministryItems[index][field] = finalValue;
    renderPreview();
}

function addMinistryItem() {
    const currentState = getCurrentState();
    currentState.ministryItems.push({ type: "Asignación", title: "[Título]", time: "X mins.", student: "[Nombre/Nombre]" });
    renderMinistryInputs();
    renderPreview();
}

function removeMinistryItem(index) {
    const currentState = getCurrentState();
    currentState.ministryItems.splice(index, 1);
    renderMinistryInputs();
    renderPreview();
}

function renderChristianLifeInputs() {
    const container = document.getElementById('christianLifeItems');
    container.innerHTML = '';
    const currentState = getCurrentState();

    // Start numbering after ministry items (3 + length) + 1 (middle song) -> actually numbering continues
    let startIndex = 3 + currentState.ministryItems.length;

    currentState.christianLife.items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'item-row';
        div.innerHTML = `
            <div style="display:flex; gap:5px; width:100%; align-items:center;">
                <span style="font-weight:bold; color:#8a1c34;">${startIndex + index + 1}.</span>
                <input type="text" placeholder="[Título]" value="${item.title === '[Título]' ? '' : item.title}" oninput="updateChristianLifeItem(${index}, 'title', this.value)">
                <input type="text" placeholder="Tiempo" value="${item.time}" style="width:60px;" oninput="updateChristianLifeItem(${index}, 'time', this.value)">
                <button class="btn-remove" onclick="removeChristianLifeItem(${index})">×</button>
            </div>
            <input type="text" placeholder="[Nombre]" value="${item.speaker === '[Nombre]' ? '' : item.speaker}" style="margin-left: 20px; width: calc(100% - 20px);" oninput="updateChristianLifeItem(${index}, 'speaker', this.value)">
        `;
        container.appendChild(div);
    });
}

function updateChristianLifeItem(index, field, value) {
    const currentState = getCurrentState();
    const defaults = { title: "[Título]", time: "XX mins.", speaker: "[Nombre]" };

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
    currentState.christianLife.items.push({ title: "[Título]", time: "XX mins.", speaker: "[Nombre]" });
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
    // Helper to render ministry items
    let ministryHTML = '';
    programState.ministryItems.forEach((item, index) => {
        ministryHTML += `
            <div class="program-item">
                <div class="time">0:00</div>
                <div><strong>${index + 4}. ${item.title}</strong> (${item.time})</div>
                <div class="role-label">Estudiante/Ayudante:</div>
                <div class="name">${item.student}</div>
            </div>
        `;
    });

    // Helper to render christian life items
    let christianLifeHTML = '';
    let clStartIndex = 3 + programState.ministryItems.length;
    programState.christianLife.items.forEach((item, index) => {
        christianLifeHTML += `
            <div class="program-item">
                <div class="time">0:00</div>
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
            <span style="font-size:0.8em; font-weight:normal;">Sala auxiliar</span>
            <span style="font-size:0.8em; font-weight:normal;">Auditorio principal</span>
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
            <span style="font-size:0.8em; font-weight:normal;">Sala auxiliar</span>
            <span style="font-size:0.8em; font-weight:normal;">Auditorio principal</span>
        </div>
        <div class="ministry-grid">
            ${ministryHTML}
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
                <div class="time">0:00</div>
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
    const element = document.querySelector('.sheet-a4');
    const opt = {
        margin: 0,
        filename: 'programa_vida_ministerio.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save().catch(err => {
        console.error("PDF generation failed:", err);
        alert("Error al generar el PDF. Por favor, intente de nuevo.");
    });
}

function exportToWord() {
    const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Arial', sans-serif; font-size: 10pt; }
                .header-row { border-bottom: 2px solid black; margin-bottom: 10px; }
                .section-header { background-color: #555; color: white; font-weight: bold; padding: 2px; margin-top: 10px; }
                .bg-gold { background-color: #dfae26; }
                .bg-red { background-color: #8a1c34; }
                table { width: 100%; border-collapse: collapse; }
                td { vertical-align: top; padding: 2px; }
            </style>
        </head>
        <body>
            ${generateProgramHTML(state.program1)}
            <br><br><hr><br><br>
            ${generateProgramHTML(state.program2)}
        </body>
        </html>
    `;

    const converted = htmlDocx.asBlob(content);
    saveAs(converted, 'programa_vida_ministerio.docx');
}

// Start
init();
