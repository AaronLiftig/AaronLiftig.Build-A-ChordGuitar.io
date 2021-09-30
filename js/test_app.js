"use strict";
import { GuitarApp } from "./guitar_app";

var guitarApp = new GuitarApp();

console.log("#################");
console.log("Website Homepage:");
console.log("#################");
console.log("Data Structure for Guitar:");
console.log("(string#,fret#),(note#,noteString)");
console.log("#################");
console.log("\n\n");

console.log("Guitar:","\n");
console.log("Tuning:",guitarApp.yourGuitar.tuning,"\n");
for (var num = 0; num < guitarApp.yourGuitar.guitar.length; num++) {
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

guitarApp.yourGuitar.TuneGuitar({tuning: "double drop d"});

console.log("Newly Tuned Guitar:","\n");
console.log("Tuning:",guitarApp.yourGuitar.tuning,"\n");
for (var num = 0; num < guitarApp.yourGuitar.guitar.length; num++) {
    console.log("String "+(num+1)+":",guitarApp.yourGuitar.guitar[num],"\n");
}
console.log("\n\n");


console.log("#################");
console.log("On Selecting Root:");
console.log("#################");
console.log("Mini Screen with Default Cord Applied (major cord):");
console.log("#################");
console.log("Data Structure for Mini Screen:");
console.log("(string#,fret#),(note#,noteString),(noteInterval#,noteIntervalString),noteIntervalColor");
console.log("#################");
console.log("\n\n");

var yourDefaultMiniScreen = guitarApp.GetMiniScreen(3,10);

console.log("Mini Screen:");
for (var num = 0; num < yourDefaultMiniScreen.length; num++){
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
var yourNewMiniScreen = guitarApp.ApplyCordToMiniScreen({cordString:"minor 13th"});

for (var num = 0; num < yourNewMiniScreen.length; num++) {
    console.log("String "+(num+1)+":",yourNewMiniScreen[num],"\n");
}
