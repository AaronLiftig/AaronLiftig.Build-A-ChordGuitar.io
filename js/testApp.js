"use strict";

let guitarApp = new GuitarApp();

console.log("#################");
console.log("Website Homepage:");
console.log("#################");
console.log("Data Structure for Guitar:");
console.log("(string#,fret#),(note#,noteString)");
console.log("#################");
console.log("\n\n");

console.log("Guitar:","\n");
console.log("Tuning:",guitarApp.yourGuitar.tuning,"\n");
for (let num = 0; num < guitarApp.yourGuitar.guitar.length; num++) {
    console.log("String "+(num+1)+":",guitarApp.yourGuitar.guitar[num],"\n");
}
console.log("\n\n");


console.log("#################");
console.log("On Selecting New Tuning:");
console.log("#################");
console.log("Data Structure for Guitar:");
console.log("(string#,fret#),(note#,noteString)");
console.log("#################");
console.log("\n\n");

guitarApp.yourGuitar.tuneGuitar({tuning: "double drop d"});

console.log("Newly Tuned Guitar:","\n");
console.log("Tuning:",guitarApp.yourGuitar.tuning,"\n");
for (let num = 0; num < guitarApp.yourGuitar.guitar.length; num++) {
    console.log("String "+(num+1)+":",guitarApp.yourGuitar.guitar[num],"\n");
}
console.log("\n\n");


console.log("#################");
console.log("On Selecting Root:");
console.log("#################");
console.log("Mini Screen with Default Chord Applied (major chord):");
console.log("#################");
console.log("Data Structure for Mini Screen:");
console.log("(string#,fret#),(note#,noteString),(noteInterval#,noteIntervalString),noteIntervalColor");
console.log("#################");
console.log("\n\n");

let yourDefaultMiniScreen = guitarApp.getMiniScreen(3,10);

console.log("Mini Screen:");
for (let num = 0; num < yourDefaultMiniScreen.length; num++){
    console.log("String "+(num+1)+":",yourDefaultMiniScreen[num],"\n")
}
console.log("\n\n");


console.log("#################");
console.log("On Selecting New Chord:");
console.log("#################");
console.log("Data Structure for New Mini Screen:");
console.log("(string#,fret#),(note#,noteString),(noteInterval#,noteIntervalString),noteIntervalColor");
console.log("#################");
console.log("\n\n");

console.log("New Mini Screen:");
let yourNewMiniScreen = guitarApp.applyChordToMiniScreen({chordString: "minor 13th"});

for (let num = 0; num < yourNewMiniScreen.length; num++) {
    console.log("String "+(num+1)+":",yourNewMiniScreen[num],"\n");
}
