const tuningList = [ "Standard", "Drop D", "DADGAD", "Double Drop D", "Open D",
                    "Open E", "Open G", "Open A", "DGCGCD", "Open C6" ]


var guitarApp = new GuitarApp();
var guitar = guitarApp.yourGuitar.guitar;

function onPageLoad(guitar) {
    // Footer Copyright
    const today = new Date();
    const year = today.getFullYear();

    const footerPTag = document.getElementById("copyright");
    const footerText = document.createTextNode("© " + year + " - Free Build-A-Cord Guitar Learning");
    footerPTag.append(footerText);


    // Tuning Dropdown
    const tuningDropdown = document.getElementById("guitar-tuning-dropdown");

    for (var tuningOption of tuningList) {
        var tuningOptionElement = document.createElement("option");
        tuningOptionElement.text = tuningOption;
        tuningOptionElement.value = tuningOption.toLowerCase();
        tuningDropdown.append(tuningOptionElement);
    }


    // Number of Frets Dropdown
    const numOfFretsDropdown = document.getElementById("guitar-fretNum-dropdown");

    for (var numOfFretsOption of [ 19, 20, 21, 22, 23, 24 ]) {
        var numOfFretsOptionElement = document.createElement("option");
        numOfFretsOptionElement.text = numOfFretsOption;
        numOfFretsOptionElement.value = numOfFretsOption;
        if (numOfFretsOption === 22) {
            numOfFretsOptionElement.selected = true;
        }
        numOfFretsDropdown.append(numOfFretsOptionElement);
    }


    // Accidental Dropdown
    const accidentalDropdown = document.getElementById("guitar-accidentalType-dropdown");

    for (var accidentalOption of [ "#", "b" ]) {
        var accidentalOptionElement = document.createElement("option");
        accidentalOptionElement.text = accidentalOption;
        accidentalOptionElement.value = accidentalOption;
        accidentalDropdown.append(accidentalOptionElement);
    }


    // Chord Dropdown
    const cordList = Object.keys(guitarApp.cordDict);
    const chordOptionDropdown = document.getElementById("mini-screen-dropdown");

    for (var chordOption of cordList) {
        var chordOptionElement = document.createElement("option");
        chordOptionText =  chordOption.replace(/(^\w|\s\w|\/\w)/g, m => m.toUpperCase());
        chordOptionElement.text = chordOptionText;
        chordOptionElement.value = chordOption;
        chordOptionDropdown.append(chordOptionElement);
    }


    // Create Guitar
    const guitarElement = document.getElementById("main-guitar");

    var guitarAxisRow = document.createElement("div", { className: "row guitar-string", id: "axis" });
    guitarElement.append(guitarAxisRow);

    for (var a = 0; a < guitar.length; a++) {
        var guitarString = guitar[a];
        var guitarStringRow = document.createElement("div", { className: "row guitar-string", id: a });
        for (var b = 0; b < guitarString.length; b++) {
            if (a === 0) {
                var axisRowFret = document.createElement("div", { className: "guitar-fret-axis" });
                var axisRowFretP = document.createElement("p");
                var text = document.createTextNode(b);
                axisRowFretP.append(text);
                axisRowFret.append(axisRowFretP);
                guitarAxisRow.append(axisRowFret);
            }

            var guitarFret = guitarString[b];
            var fret = document.createElement("div", { className: "guitar-fret" });
            var fretP = document.createElement("p");
            var note = guitarFret[1][1].split('/');

            if (note.length === 2) {
                var fretText = document.createTextNode(note[1]);
            }
            else {
                var fretText = document.createTextNode(note);
            }
            
            fretP.append(fretText);
            fret.append(fretP);
            guitarStringRow.append(fret);
            guitarElement.append(guitarStringRow);
        }
    }
}

onPageLoad(guitar);


function changeSharpOrFlat(sharpOrFlat = "#") {

}