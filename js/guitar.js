"use strict";

class Guitar {
    constructor({numberOfStrings=6, tuning="standard", numberOfFrets=20} = {}) {
        this.numToNoteDict = [ "A","Bb/A#","B","C","Db/C#","D","Eb/D#","E","F","Gb/F#","G","Ab/G#" ];

        this._tuneGuitar({numberOfStrings: numberOfStrings, tuning: tuning, numberOfFrets: numberOfFrets});
    }

    _tuneGuitar({numberOfStrings=6, tuning="standard", numberOfFrets=20}) {
        this.tuning = tuning;
        if (numberOfStrings === 6) {
            if (tuning === "standard") {
                this.stringNotes = [7,2,10,5,0,7];
            }
            else if (tuning === "drop d") {
                this.stringNotes = [7,2,10,5,0,5];
            }
            else if (tuning === "dadgad") {
                this.stringNotes = [5,0,10,5,0,5];
            }
            else if (tuning === "double drop d") {
                this.stringNotes = [5,2,10,5,0,5];
            }
            else if (tuning === "open d") {
                this.stringNotes = [5,0,9,5,0,5];
            }
            else if (tuning === "open e") {
                this.stringNotes = [7,2,11,7,2,7];
            }
            else if (tuning === "open g") {
                this.stringNotes = [5,2,10,5,10,5];
            }
            else if (tuning === "open a") {
                this.stringNotes = [7,4,0,7,0,7];
            }
            else if (tuning === "dgcgcd") {
                this.stringNotes = [5,3,10,3,10,5];
            }
            else if (tuning === "open c6") {
                this.stringNotes = [7,3,10,3,0,3];
            }
        }
        else if (numberOfStrings === 12) {
            if (tuning === "standard") {
                this.stringNotes = [7,7,2,2,10,10,5,5,0,0,7,7];
            }
        }
            
        this._createGuitar({numberOfStrings: numberOfStrings, numberOfFrets: numberOfFrets});
    }

    _createGuitar({numberOfStrings=6, numberOfFrets=24}) {
    //Called by itself if tuning not changed
        this.guitar = [];
        this.numberOfFrets = numberOfFrets
        let noteNum;
        let leadNoteString;
        // Add open string information to guitar
        for (let stringNum = 0; stringNum < numberOfStrings; stringNum++) {
            noteNum = this.stringNotes[stringNum];
            leadNoteString = this.numToNoteDict[noteNum];
            this.guitar.push([[[stringNum,0],[noteNum,leadNoteString]]]);
        }

        let openNoteNum;
        let fretNoteNum;
        let neckNoteString;
        // Add remaining string information
        for (let stringNum = 0; stringNum < numberOfStrings; stringNum++) {
            for (let fretNum = 1; fretNum < numberOfFrets+1; fretNum++) {
                openNoteNum = this.guitar[stringNum][0][1][0];
                fretNoteNum = (openNoteNum+fretNum) % 12;
                neckNoteString = this.numToNoteDict[fretNoteNum];
                this.guitar[stringNum].push([[stringNum,fretNum],
                                            [fretNoteNum,neckNoteString]]);
            }
        }
    }
}