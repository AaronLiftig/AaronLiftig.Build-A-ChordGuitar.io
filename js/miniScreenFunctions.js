function getMiniScreen(guitarApp, stringNum, fretNum, {chordName = "major"}) {
    return guitarApp.getMiniScreen(stringNum, fretNum, {chordName: chordName});
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