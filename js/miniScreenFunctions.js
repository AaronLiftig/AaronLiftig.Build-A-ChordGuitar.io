function getMiniScreen(guitarApp, stringNum, fretNum, {chordName = "major"}) {
    return guitarApp.getMiniScreen(stringNum, fretNum, {chordName: chordName});
}


function applyNewChord() {
    const miniScreenDropdown = document.getElementById("mini-screen-chord-dropdown");
    const chordName = miniScreenDropdown.value;

    updateGuitarDiv("mini-screen", {stringNum: userLocation[0], 
                    fretNum: userLocation[1], chordName: chordName});
}


function extractNumber(text) {
    return parseInt(text.match(/\d+/g));
}


function fixTextContent(text, previousText) {
    if (previousText == null) return text;

    let textNumber = extractNumber(text);
    let previousTextNumber = extractNumber(previousText);

    if (previousTextNumber > textNumber) {
        textNumber += 7;
        let firstWord = text.split(" ")[0];
        return firstWord + " " + textNumber + "th";
    }
    else {
        return text;
    }
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

    let previousText = null;
    for (let noteInfo of uniqueNoteNames) {
        const listItem = document.createElement("li");
        listItem.style.backgroundColor = noteInfo[1];
        let fixedText = fixTextContent(noteInfo[0], previousText);
        previousText = fixedText;
        listItem.textContent = fixedText;
        adjustTextColorToBackground(listItem, listItem.style.backgroundColor);
        legendList.append(listItem);
    }
}