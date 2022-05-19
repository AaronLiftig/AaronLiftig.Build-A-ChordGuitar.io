const tuningList = [ "Standard", "Drop D", "DADGAD", "Double Drop D", "Open D",
                    "Open E", "Open G", "Open A", "DGCGCD", "Open C6" ]

var userLocation; // Global for future updates of mini-screen chords 


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


function createCopyright() {
    const today = new Date();
    const year = today.getFullYear();

    const footerPTag = document.getElementById("copyright");
    const footerText = document.createTextNode("© " + year + " - Free Build-A-Chord Guitar Learning");
    footerPTag.append(footerText);
}


function adjustTextColorToBackground(element, backgroundColor) {
    if (["black", "blue", "navy"].includes(backgroundColor)) {
        element.style.color = "white";
    } else if (["yellow"].includes(backgroundColor)) {
        element.style.color = "black";
    }
    return element
}


function initializePage() {
    createCopyright();

    createDropdown("guitar-tuning-dropdown", tuningList, {valueMethod: true});
    createDropdown("guitar-numOfFrets-dropdown", [ 19, 20, 21, 22, 23, 24 ], {defaultOption: 22});
    createDropdown("guitar-accidentalType-dropdown", [ "#", "b" ], {});
    
    updateGuitarDiv("main-guitar", {});

    addCloseEventListenersToButtonAndOverlay();
}


initializePage();