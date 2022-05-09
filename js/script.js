const tuningList = [ "Standard", "Drop D", "DADGAD", "Double Drop D", "Open D",
                    "Open E", "Open G", "Open A", "DGCGCD", "Open C6" ]


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


function getGuitar(tuning, numOfFrets) {
    const guitarApp = new GuitarApp({tuning: tuning, numOfFrets: numOfFrets});
    return guitarApp.yourGuitar.guitar;
}

function getMiniScreen(tuning, numOfFrets, stringNum, fretNum) {
    const guitarApp = new GuitarApp({tuning: tuning, numOfFrets: numOfFrets});
    return guitarApp.getMiniScreen(stringNum, fretNum);
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


function createFret(guitarAxisRow, accidentalType, guitarString, a, b) {
    let fretNum = guitarString[b][0][1];
    
    if (a === 0) {
        populateGuitarAxis(guitarAxisRow, fretNum);
    }

    let guitarFret = guitarString[b];
    let fret = document.createElement("div");
    fret.className = "guitar-fret";
    fret = addFretMarkId(fret, fretNum);
    fret.id = `${a},${b}`;
    fret.dataset.modalTarget = "#modal";
    let fretP = document.createElement("p");
    
    let fretText = getAccidentalFromFretText(guitarFret, {accidentalType: accidentalType});
    
    fretP.append(fretText);
    fret.append(fretP);
    return fret;
}


function createGuitarString(guitar, guitarStrings, guitarAxisRow, accidentalType, a) {
    let guitarString = guitar[a];
    let guitarStringRow = document.createElement("div");
    guitarStringRow.className = "guitar-string";
    guitarStringRow.id = a;
    for (let b = 0; b < guitarString.length; b++) {
        let fret = createFret(guitarAxisRow, accidentalType, guitarString, a, b)
        guitarStringRow.append(fret);
        guitarStrings.append(guitarStringRow);
    }
}


function getGuitarStrings(guitar, guitarElement, guitarAxisRow, accidentalType) {
    let guitarStrings = document.createElement("div");
    guitarStrings.className = "outer-guitar-div";
    guitarStrings.id = "guitar-strings";

    for (let a = 0; a < guitar.length; a++) {
        createGuitarString(guitar, guitarStrings, guitarAxisRow, accidentalType, a);
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

            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        })
    })
}


function updateGuitarDiv(screen, {stringNum = null, fretNum = null}) {
    params = getGuitarParameters();
    let tuning = params.tuningParam;
    let numOfFrets = parseInt(params.numOfFretsParam);
    let accidentalType = params.accidentalTypeParam;

    let guitar;
    let guitarElement;
    if (screen === "main-guitar") {
        guitar = getGuitar(tuning, numOfFrets);
        guitarElement = document.getElementById("main-guitar");
    } else {
        guitar = getMiniScreen(tuning, numOfFrets, stringNum, fretNum)
        mainGuitar = getGuitar(tuning, numOfFrets);
        guitarElement = document.getElementById("mini-screen");
        console.log(guitar);
        console.log(mainGuitar);
    }

    guitarElement.innerHTML = "";

    guitarAxisRow = getGuitarAxis(guitarElement);

    getGuitarStrings(guitar, guitarElement, guitarAxisRow, accidentalType);

    if (screen === "main-guitar") {
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
    const guitarApp = new GuitarApp({tuning: "standard", numOfFrets: 22});
    const cordList = Object.keys(guitarApp.cordDict);
    createDropdown("mini-screen-chord-dropdown", cordList, {textMethod: true});
    
    updateGuitarDiv("main-guitar", {});

    addCloseEventListenersToGuitar();
}


initializePage();