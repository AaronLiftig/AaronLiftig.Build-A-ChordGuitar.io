const tuningList = [ "Standard", "Drop D", "DADGAD", "Double Drop D", "Open D",
                    "Open E", "Open G", "Open A", "DGCGCD", "Open C6" ]


var guitarApp = new GuitarApp({numOfStrings: 6, tuning: "standard", numOfFrets:22});
console.log(guitarApp);
var guitar = guitarApp.yourGuitar.guitar;

function addFretMarkId(fretDiv, fretNum) {
    if ([3, 5, 7, 9, 15, 17, 19, 21].includes(fretNum)) {
        fretDiv.id = "single-fret-mark";
    } else if ([12, 24].includes(fretNum)) {
        fretDiv.id = "double-fret-mark";
    } else if (fretNum == 0) {
        fretDiv.id = "nut";
    }
    return fretDiv;
}

function createDropdown(selectTagId, optionsIterable, {defaultOption = null, 
                        textMethod = false, valueMethod = false}) {
    const selectTag = document.getElementById(selectTagId);

    for (var option of optionsIterable) {
        var optionTag = document.createElement("option");
        
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
    
    var note = fretData[1][1].split('/');
    
    if (note.length === 2) {
        var fretText = document.createTextNode(note[noteSplitIndex]);
    } else {
        var fretText = document.createTextNode(note);
    }
    return fretText;
}

function createGuitar(guitar) {
    const guitarElement = document.getElementById("main-guitar");

    var guitarAxis = document.createElement("div");
    guitarAxis.className = "outer-guitar-div";
    var guitarAxisRow = document.createElement("div");
    guitarAxisRow.id = "axis";
    guitarAxis.append(guitarAxisRow)
    guitarElement.append(guitarAxis);

    var guitarStrings = document.createElement("div");
    guitarStrings.className = "outer-guitar-div";
    guitarStrings.id = "guitar-strings";

    for (var a = 0; a < guitar.length; a++) {
        var guitarString = guitar[a];
        var guitarStringRow = document.createElement("div");
        guitarStringRow.className = "guitar-string";
        guitarStringRow.id = a;
        for (var b = 0; b < guitarString.length; b++) {
            if (a === 0) { // add row of fret numbers in axis div
                var axisRowFret = document.createElement("div");
                axisRowFret = addFretMarkId(axisRowFret, b)
                axisRowFret.className = "guitar-fret-axis";
                var axisRowFretP = document.createElement("p");
                var text = document.createTextNode(b);
                axisRowFretP.append(text);
                axisRowFret.append(axisRowFretP);
                guitarAxisRow.append(axisRowFret);
            }

            var guitarFret = guitarString[b];
            var fret = document.createElement("div");
            fret = addFretMarkId(fret, b)
            fret.className = "guitar-fret";
            var fretP = document.createElement("p");
            
            fretText = getAccidentalFromFretText(guitarFret, {});
            
            fretP.append(fretText);
            fret.append(fretP);
            guitarStringRow.append(fret);
            guitarStrings.append(guitarStringRow);
        }
        guitarElement.append(guitarStrings);
    }
}

function initializePage(guitar) {
    // Footer Copyright
    const today = new Date();
    const year = today.getFullYear();

    const footerPTag = document.getElementById("copyright");
    const footerText = document.createTextNode("© " + year + " - Free Build-A-Cord Guitar Learning");
    footerPTag.append(footerText);

    
    createDropdown("guitar-tuning-dropdown", tuningList, {valueMethod: true});

    createDropdown("guitar-fretNum-dropdown", [ 19, 20, 21, 22, 23, 24 ], {defaultOption: 22});

    createDropdown("guitar-accidentalType-dropdown", [ "#", "b" ], {});

    const cordList = Object.keys(guitarApp.cordDict);
    createDropdown("mini-screen-chord-dropdown", cordList, {textMethod: true});
    

    createGuitar(guitar);
}

initializePage(guitar);