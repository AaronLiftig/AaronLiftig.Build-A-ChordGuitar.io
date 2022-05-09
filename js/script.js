const tuningList = [ "Standard", "Drop D", "DADGAD", "Double Drop D", "Open D",
                    "Open E", "Open G", "Open A", "DGCGCD", "Open C6" ]

var userLocation;

function addFretMarkId(fretDiv, fretNum) {
    if ([3, 5, 7, 9, 15, 17, 19, 21].includes(fretNum)) {
        fretDiv.className += " single-fret-mark";
    } else if ([12, 24].includes(fretNum)) {
        fretDiv.className += " double-fret-mark";
    } else if (fretNum == 0) {
        fretDiv.className += " nut";
    }
    return fretDiv;
}


function createDropdown(selectTagId, optionsIterable, {defaultOption = null, 
                        textMethod = false, valueMethod = false}) {
    const selectTag = document.getElementById(selectTagId);
    selectTag.innerHTML = "";

    for (let option of optionsIterable) {
        let optionTag = document.createElement("option");
        
        if (textMethod === false) {
            optionTag.text = option;
        } else {
            optionTag.text = option.replace(/(^\w|\s\w|\/\w)/g, m => m.toUpperCase());
        }
        
        if (valueMethod === false) {
            optionTag.value = option;
        } else {
            optionTag.value = option.toLowerCase()
        }

        if (defaultOption != null) {
            if (option === defaultOption) {
                optionTag.selected = true;
            }
        }

        selectTag.append(optionTag);
    }  
}


function getAccidentalFromFretText(fretData, {accidentalType="#"}) {
    accidentalDict = { "b": 0, "#": 1 };
    noteSplitIndex = accidentalDict[accidentalType];
    
    let note = fretData[1][1].split('/');
    
    let fretText;
    if (note.length === 2) {
        fretText = document.createTextNode(note[noteSplitIndex]);
    } else {
        fretText = document.createTextNode(note);
    }
    return fretText;
}


function getGuitarParameters() {
    const tuningParam = document.getElementById("guitar-tuning-dropdown").value;
    const numOfFretsParam = document.getElementById("guitar-numOfFrets-dropdown").value;
    const accidentalTypeParam = document.getElementById("guitar-accidentalType-dropdown").value;

    return {tuningParam, numOfFretsParam, accidentalTypeParam};
}


function getGuitar(guitarApp) {
    return guitarApp.yourGuitar.guitar;
}

function getMiniScreen(guitarApp, stringNum, fretNum, {chordName = "major"}) {
    return guitarApp.getMiniScreen(stringNum, fretNum, {chordName: chordName});
}


function getGuitarAxis(guitarElement) {
    let guitarAxis = document.createElement("div");
    guitarAxis.className = "outer-guitar-div";
    let guitarAxisRow = document.createElement("div");
    guitarAxisRow.id = "axis";
    guitarAxis.append(guitarAxisRow);
    guitarElement.append(guitarAxis);
    return guitarAxisRow;
}


function populateGuitarAxis(guitarAxisRow, b) {
    let axisRowFret = document.createElement("div");
    axisRowFret.className = "guitar-fret-axis";
    axisRowFret = addFretMarkId(axisRowFret, b);
    let axisRowFretP = document.createElement("p");
    let text = document.createTextNode(b);
    axisRowFretP.append(text);
    axisRowFret.append(axisRowFretP);
    guitarAxisRow.append(axisRowFret);
}


function adjustTextColorToBackground(element, backgroundColor) {
    if (["black", "blue", "navy"].includes(backgroundColor)) {
        element.style.color = "white";
    } else if (["yellow"].includes(backgroundColor)) {
        element.style.color = "black";
    }
    return element
}


function createFret(guitarAxisRow, accidentalType, guitarString, stringNum, b, view) {
    let fretNum = guitarString[b][0][1];
    
    if (stringNum === 0) {
        populateGuitarAxis(guitarAxisRow, fretNum);
    }

    let guitarFret = guitarString[b];
    let fret = document.createElement("div");
    fret.className = "guitar-fret";
    fret = addFretMarkId(fret, fretNum);
    fret.id = `${stringNum},${fretNum}`;

    if (view === "mini-screen" && guitarString[b][3] !== "dropped") {
        fret.style.backgroundColor = guitarString[b][3];
        
        fret = adjustTextColorToBackground(fret, guitarString[b][3])
    }

    fret.dataset.modalTarget = "#modal";
    let fretP = document.createElement("p");
    
    let fretText = getAccidentalFromFretText(guitarFret, {accidentalType: accidentalType});
    
    fretP.append(fretText);
    fret.append(fretP);
    return fret;
}


function createGuitarString(guitar, guitarStrings, guitarAxisRow, accidentalType, stringNum, view) {
    let guitarString = guitar[stringNum];
    let guitarStringRow = document.createElement("div");
    guitarStringRow.className = "guitar-string";
    guitarStringRow.id = stringNum;
    for (let b = 0; b < guitarString.length; b++) {
        let fret = createFret(guitarAxisRow, accidentalType, guitarString, stringNum, b, view)
        guitarStringRow.append(fret);
        guitarStrings.append(guitarStringRow);
    }
}


function getGuitarStrings(guitar, guitarElement, guitarAxisRow, accidentalType, view) {
    let guitarStrings = document.createElement("div");
    guitarStrings.className = "outer-guitar-div";
    guitarStrings.id = "guitar-strings";

    for (let stringNum = 0; stringNum < guitar.length; stringNum++) {
        createGuitarString(guitar, guitarStrings, guitarAxisRow, accidentalType, stringNum, view);
        }
        guitarElement.append(guitarStrings);
}


function openModal(modal) {
    if (modal == null) return
    modal.classList.add("active");
    overlay.classList.add("active");
}


function addOpenEventListenersToGuitar() {
    const openModalButtons = document.querySelectorAll("[data-modal-target]");
    openModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            let [stringNum, fretNum] = button.id.split(",");
            stringNum = parseInt(stringNum);
            fretNum = parseInt(fretNum);
            updateGuitarDiv("mini-screen", {stringNum: stringNum, fretNum: fretNum})

            userLocation = [stringNum, fretNum] // Global for future updates of mini-screen chords 

            const guitarApp = new GuitarApp({tuning: "standard", numOfFrets: 22});
            const chordList = Object.keys(guitarApp.chordDict);
            createDropdown("mini-screen-chord-dropdown", chordList, {textMethod: true});

            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        })
    })
}


function applyNewChord() {
    const miniScreenDropdown = document.getElementById("mini-screen-chord-dropdown");
    const chordName = miniScreenDropdown.value;

    updateGuitarDiv("mini-screen", {stringNum: userLocation[0], 
                    fretNum: userLocation[1], chordName: chordName});
}


function createMiniScreenNoteColorLegend(guitarApp, chordName) {
    const chordDict = guitarApp.chordDict;
    const noteNumberList = chordDict[chordName];
    const noteColorDict = guitarApp.noteColorDict;
    const noteNameList = guitarApp.noteList;
    const uniqueNoteNames = new Set();

    for (let noteNumber of noteNumberList) {
        let noteName = noteNameList[noteNumber];
        let noteColor = noteColorDict[noteName];
        uniqueNoteNames.add([noteName, noteColor]);
    }

    const legendList = document.getElementById("chord-legend");
    legendList.innerHTML = "";

    for (let noteInfo of uniqueNoteNames) {
        const listItem = document.createElement("li");
        listItem.style.backgroundColor = noteInfo[1];
        listItem.textContent = noteInfo[0];
        adjustTextColorToBackground(listItem, listItem.style.backgroundColor);
        legendList.append(listItem);
    }
}


function updateGuitarDiv(view, {stringNum = null, fretNum = null, chordName = "major"}) {
    params = getGuitarParameters();
    let tuning = params.tuningParam;
    let numOfFrets = parseInt(params.numOfFretsParam);
    let accidentalType = params.accidentalTypeParam;

    const guitarApp = new GuitarApp({tuning: tuning, numOfFrets: numOfFrets});

    let guitar;
    let guitarElement;
    if (view === "main-guitar") {
        guitar = getGuitar(guitarApp);
        guitarElement = document.getElementById("main-guitar");
    } else if (view === "mini-screen") {
        guitar = getMiniScreen(guitarApp, stringNum, fretNum, {chordName: chordName})
        guitarElement = document.getElementById("mini-screen");
        createMiniScreenNoteColorLegend(guitarApp, chordName);
    }

    guitarElement.innerHTML = "";

    guitarAxisRow = getGuitarAxis(guitarElement);

    getGuitarStrings(guitar, guitarElement, guitarAxisRow, accidentalType, view);

    if (view === "main-guitar") {
        addOpenEventListenersToGuitar();
    }
}


function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove("active");
    overlay.classList.remove("active");
}


function addCloseEventListenersToGuitar() {
    const closeModalButtons = document.querySelectorAll("[data-close-button]");
    const overlay = document.getElementById("overlay");

    overlay.addEventListener("click", () => {
        const modals = document.querySelectorAll(".modalDiv.active");
        modals.forEach(modal => {
            closeModal(modal);
        })
    })

    closeModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modalDiv");
            closeModal(modal);
        })
    })
}


function initializePage() {
    // Footer Copyright
    const today = new Date();
    const year = today.getFullYear();

    const footerPTag = document.getElementById("copyright");
    const footerText = document.createTextNode("© " + year + " - Free Build-A-Cord Guitar Learning");
    footerPTag.append(footerText);

    createDropdown("guitar-tuning-dropdown", tuningList, {valueMethod: true});
    createDropdown("guitar-numOfFrets-dropdown", [ 19, 20, 21, 22, 23, 24 ], {defaultOption: 22});
    createDropdown("guitar-accidentalType-dropdown", [ "#", "b" ], {});
    
    updateGuitarDiv("main-guitar", {});

    addCloseEventListenersToGuitar();
}


initializePage();