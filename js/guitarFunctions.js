function getGuitar(guitarApp) {
    return guitarApp.yourGuitar.guitar;
}


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


function createGuitarString(guitar, guitarAxisRow, accidentalType, stringNum, view) {
    let guitarString = guitar[stringNum];
    let guitarStringRow = document.createElement("div");
    guitarStringRow.className = "guitar-string";
    guitarStringRow.id = stringNum;
    for (let b = 0; b < guitarString.length; b++) {
        let fret = createFret(guitarAxisRow, accidentalType, guitarString, stringNum, b, view)
        guitarStringRow.append(fret);    
    }
    return guitarStringRow;
}


function getGuitarStrings(guitar, guitarAxisRow, accidentalType, view) {
    let guitarStrings = document.createElement("div");
    guitarStrings.className = "outer-guitar-div";
    guitarStrings.id = "guitar-strings";

    let guitarStringRow;
    for (let stringNum = 0; stringNum < guitar.length; stringNum++) {
        guitarStringRow = createGuitarString(guitar, guitarAxisRow, accidentalType, stringNum, view);
        guitarStrings.append(guitarStringRow);
    }
    return guitarStrings;
}


function addOpenEventListenersToGuitar() {
    const openModalButtons = document.querySelectorAll("[data-modal-target]");
    openModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            let [stringNum, fretNum] = button.id.split(",");
            stringNum = parseInt(stringNum);
            fretNum = parseInt(fretNum);
            updateGuitarDiv("mini-screen", {stringNum: stringNum, fretNum: fretNum})

            userLocation = [stringNum, fretNum] 

            const guitarApp = new GuitarApp({tuning: "standard", numOfFrets: 22});
            const chordList = Object.keys(guitarApp.chordDict);
            createDropdown("mini-screen-chord-dropdown", chordList, {textMethod: true});

            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        })
    })
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
    } else {
        guitar = getMiniScreen(guitarApp, stringNum, fretNum, {chordName: chordName})
        guitarElement = document.getElementById("mini-screen");
        createMiniScreenNoteColorLegend(guitarApp, chordName);
    }
    guitarElement.innerHTML = "";

    guitarAxisRow = getGuitarAxis(guitarElement);

    const guitarStrings = getGuitarStrings(guitar, guitarAxisRow, accidentalType, view);
    guitarElement.append(guitarStrings);

    if (view === "main-guitar") {
        addOpenEventListenersToGuitar();
    }
}