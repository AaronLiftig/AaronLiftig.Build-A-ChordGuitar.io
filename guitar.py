class Guitar:
    def __init__(self,numberOfStrings,tuning,numberOfFrets=19):
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
        self.CreateGuitar(numberOfStrings,tuning,numberOfFrets)
    
    def CreateGuitar(self,numberOfStrings,tuning,numberOfFrets):
        self.guitar = []
        if numberOfStrings == 6:
            if tuning == 'standard':
                self.stringNotes = [7,2,10,5,0,7]
            elif tuning == 'drop d':
                self.stringNotes = [7,2,10,5,0,5]
            elif tuning == 'dadgad':
                self.stringNotes = [5,0,10,5,0,5]
            elif tuning == 'double drop d':
                self.stringNotes = [5,2,10,5,0,5]
            self.GuitarCreationFunc(numberOfStrings,numberOfFrets)
    
    def GuitarCreationFunc(self,numberOfStrings,numberOfFrets):
        for stringNum in range(numberOfStrings):
            noteNum = self.stringNotes[stringNum]
            leadNoteString = self.numToNoteDict[noteNum]
            self.guitar.append([(noteNum,leadNoteString)])
        for stringNum in range(numberOfStrings):
            for fretNum in range(1,numberOfFrets+1):
                openNoteNum = self.guitar[stringNum][0][0]
                fretNoteNum = (openNoteNum+fretNum) % 12
                neckNoteString = self.numToNoteDict[fretNoteNum]
                self.guitar[stringNum].append((fretNoteNum,neckNoteString))

    @classmethod
    def ChangeGuitarTuning(cls,tuning):
        pass
