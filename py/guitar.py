class Guitar:
    def __init__(self,numberOfStrings=6,tuning="standard",numberOfFrets=19):
        self.numToNoteDict = {
                                0:"A",
                                1:"A#/Bb",
                                2:"B",
                                3:"C",
                                4:"Db/C#",
                                5:"D",
                                6:"Eb/D#",
                                7:"E",
                                8:"F",
                                9:"Gb/F#",
                                10:"G",
                                11:"Ab/G#"
                              }
        
        self.TuneGuitar(numberOfStrings,tuning,numberOfFrets)
    
    def TuneGuitar(self,numberOfStrings=6,tuning="standard",numberOfFrets=19):
        self.tuning = tuning
        if numberOfStrings == 6:
            if tuning == "standard":
                self.stringNotes = [7,2,10,5,0,7]
            elif tuning == "drop d":
                self.stringNotes = [7,2,10,5,0,5]
            elif tuning == "dadgad":
                self.stringNotes = [5,0,10,5,0,5]
            elif tuning == "double drop d":
                self.stringNotes = [5,2,10,5,0,5]
            elif tuning == "open d":
                self.stringNotes = [5,0,9,5,0,5]
            elif tuning == "open e":
                self.stringNotes = [7,2,11,7,2,7]
            elif tuning == "open g":
                self.stringNotes = [5,2,10,5,10,5]
            elif tuning == "open a":
                self.stringNotes = [7,4,0,7,0,7]
            elif tuning == "dgcgcd":
                self.stringNotes = [5,3,10,3,10,5]
            elif tuning == "open c6":
                self.stringNotes = [7,3,10,3,0,3]
        elif numberOfStrings == 12:
            if tuning == "standard":
                self.stringNotes = [7,7,2,2,10,10,5,5,0,0,7,7]
            
        self.CreateGuitar(numberOfStrings,numberOfFrets)
    
    def CreateGuitar(self,numberOfStrings=6,numberOfFrets=19): # Called by itself if tuning not changed
        self.guitar = []
        for stringNum in range(numberOfStrings):
            noteNum = self.stringNotes[stringNum]
            leadNoteString = self.numToNoteDict[noteNum]
            self.guitar.append([((stringNum,0),(noteNum,leadNoteString))])
        for stringNum in range(numberOfStrings):
            for fretNum in range(1,numberOfFrets+1):
                openNoteNum = self.guitar[stringNum][0][1][0]
                fretNoteNum = (openNoteNum+fretNum) % 12
                neckNoteString = self.numToNoteDict[fretNoteNum]
                self.guitar[stringNum].append(((stringNum,fretNum),(fretNoteNum,neckNoteString)))
