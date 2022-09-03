"use strict";

class GuitarApp {
    constructor({numOfStrings=6, tuning="standard", numOfFrets=20} = {}) { 
        this.chordDict = {
                         "major":[0,4,7],
                         "minor":[0,3,7],
                         "diminished":[0,3,6],
                         "diminished 7th":[0,3,6,9],
                         "half diminished":[0,3,6,10],
                         "augmented":[0,4,8],
                         "5th":[0,7],
                         "7th":[0,4,7,10],
                         "minor 7th":[0,3,7,10],
                         "major 7th":[0,4,7,11],
                         "minor/major 7th":[0,3,7,11],
                         "suspended 4th":[0,5,7],
                         "suspended 2nd":[0,2,7],
                         "7th suspended 4th":[0,5,7,10],
                         "7th suspended 2nd":[0,2,7,10],
                         "added 2nd":[0,2,4,7],
                         "added 9th":[0,4,7,2],
                         "added 4th":[0,4,5,7],
                         "6th":[0,4,7,9],
                         "minor 6th":[0,3,7,9],
                         "6/9":[0,4,7,9,2],
                         "9th":[0,4,7,10,2],
                         "minor 9th":[0,3,7,10,2],
                         "major 9th":[0,4,7,11,2],
                         "11th":[0,4,7,10,2,5],
                         "minor 11th":[0,3,7,10,2,5],
                         "major 11th":[0,4,7,11,2,5],
                         "13th":[0,4,7,10,2,5],
                         "minor 13th":[0,3,7,10,2,5,9],
                         "major 13th":[0,4,7,11,2,5,9],
                         "7th sharp 9th":[0,4,7,10,3],
                         "7th flat 9th":[0,4,7,10,1],
                         "7th sharp 5th":[0,4,8,10],
                         "7th flat 5th":[0,4,6,10]
                         };
        
        this.noteList = [
                         "Root",
                         "Minor 2nd",
                         "Major 2nd",
                         "Minor 3rd",
                         "Major 3rd",
                         "Perfect 4th",
                         "Aug/Dim 4th/5th",
                         "Perfect 5th",
                         "Minor 6th",
                         "Major 6th",
                         "Minor 7th",
                         "Major 7th",
                         ];

        this.noteColorDict = {
                              "Root":"black",
                              "Minor 2nd":"dodgerBlue",
                              "Major 2nd":"darkSalmon",
                              "Minor 3rd":"navy",
                              "Major 3rd":"firebrick",
                              "Perfect 4th":"lime",
                              "Aug/Dim 4th/5th":"violet",
                              "Perfect 5th":"yellow",
                              "Minor 6th":"skyBlue",
                              "Major 6th":"lightCoral",
                              "Minor 7th":"blue",
                              "Major 7th":"red"
                              };

        this.yourGuitar = new Guitar({numberOfStrings: numOfStrings, tuning: tuning, numberOfFrets: numOfFrets});
    }
  
    getMiniScreen(stringNum, fretNum, {chordName = "major"}) {
        let rootNoteNum = this.yourGuitar.guitar[stringNum][fretNum][1][0];
        let guitarStringLen = this.yourGuitar.guitar.length;
        this.miniScreen = [];
        for (let string = 0; string < guitarStringLen; string++) {
            this.miniScreen.push([]);
        }

        let low;
        let high;
        if (fretNum <= 3) { // Allows for miniScreen to always have 9 frets
            low = fretNum;
            high = 9 - low;
            this.currentFret = [stringNum,fretNum];
        }
        else if (fretNum >= this.yourGuitar.numberOfFrets - 3) {
            let guitarFretLen = this.yourGuitar.guitar[0].length;
            high = guitarFretLen-fretNum;
            low = 9 - high;
            this.currentFret = [stringNum,8-guitarFretLen+fretNum];
        }
        else {
            low = 4;
            high = 5;
            this.currentFret = [stringNum,4];
        }

        let i;
        let noteTup;
        let noteDiff;
        let noteString;
        for (let string = 0; string < guitarStringLen; string++) {
            i = 0;
            for (let fret = fretNum-low; fret < fretNum+high; fret++) {
                noteTup = this.yourGuitar.guitar[string][fret];
                noteDiff = (noteTup[1][0] - rootNoteNum) % this.noteList.length;
                noteDiff = (noteDiff + this.noteList.length) % this.noteList.length;
                noteString = this.noteList[noteDiff];
                console.log([stringNum,fretNum]);
                console.log(noteTup[0]);
                if (stringNum == noteTup[0][0] && fretNum == noteTup[0][1]) {
                    this.miniScreen[string].push([noteTup[0],noteTup[1],
                        [noteDiff,noteString],
                        "purple",
                        i]);
                } else {
                    this.miniScreen[string].push([noteTup[0],noteTup[1],
                                                [noteDiff,noteString],
                                                this.noteColorDict[noteString],
                                                i]);
                }
                i = (i+1) % 9; // miniScreen has constant fret length of 9
            }
        }

        return this._applyChordToMiniScreen(chordName);
    }

    _applyChordToMiniScreen(chordString) {
        this.chordAppliedMiniScreen = structuredClone(this.miniScreen);
        let chordNoteList = this.chordDict[chordString];
        
        for (let i = 0; i < this.miniScreen.length; i++) {
            let miniString = this.miniScreen[i];
            for (let j = 0; j < miniString.length; j++) {
                let fret = miniString[j];
                if (!(chordNoteList.includes(fret[2][0]))) {
                    this.chordAppliedMiniScreen[i][j] = [fret[0],fret[1],
                                                        fret[2],"dropped"
                                                        ,fret[4]];
                }
            }
        }
        return this.chordAppliedMiniScreen;
    }
}