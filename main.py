from guitar import Guitar

class GuitarApp:
    def __init__(self,numOfStrings=6,tuning="standard",numOfFrets=19): 
        self.cordDict = {
                         "major":[],
                         "minor":[],
                         "diminished":[],
                         "diminished 7th":[],
                         "half diminished":[],
                         "augmented":[],
                         "5th":[],
                         "7th":[],
                         "minor 7th":[],
                         "major 7th":[],
                         "minor/major 7th":[],
                         "suspended 4th":[],
                         "suspended 2nd":[],
                         "added 2nd":[],
                         "added 9th":[],
                         "added 4th":[],
                         "6th":[],
                         "minor 6th":[],
                         "6/9":[],
                         "9th":[],
                         "minor 9th":[],
                         "major 9th":[],
                         "11th":[],
                         "minor 11th":[],
                         "major 11th":[],
                         "13th":[],
                         "minor 13th":[],
                         "major 13th":[],
                         "7th sharp 9th":[],
                         "7th flat 9th":[],
                         "7th sharp 5th":[],
                         "7th flat 5th":[]
                         }
        
        self.noteList = [
                         "root",
                         "minor 2nd",
                         "major 2nd",
                         "minor 3rd",
                         "major 3rd",
                         "perfect 4th",
                         "aug/dim 4th/5th",
                         "perfect 5th",
                         "minor 6th",
                         "major 6th",
                         "minor 7th",
                         "major 7th",
                         "root+1",
                         "minor 2nd",
                         "major 2nd",
                         "minor 3rd",
                         "major 3rd",
                         "perfect 4th",
                         "aug/dim 4th/5th",
                         "perfect 5th",
                         "minor 6th",
                         "major 6th",
                         "minor 7th",
                         "major 7th"
                         ]

        self.noteListLenth = len(self.noteList)
        self.numOfFrets = numOfFrets
        
        self.guitarObject = Guitar(numOfStrings,tuning)
        for string in self.guitarObject.guitar:
            print(string,"\n")
        print("\n"*2)
        
        self.GetMiniScreen(5,18)
        for string in self.miniScreen:
            print(string,"\n")

    def ApplyCord(self,cordString="major"):
        pass
    
    def GetMiniScreen(self,stringNum,fretNum):
        self.miniScreen = []
        for string in range(len(self.guitarObject.guitar)):
            self.miniScreen.append([])
        if fretNum <= 3:
            low,high = fretNum,4
        elif fretNum >= 16:
            low,high = 4,len(self.guitarObject.guitar[0])-fretNum
        else:
            low,high = 4,4
        for string in range(len(self.guitarObject.guitar)):
            for fret in range(fretNum-low,fretNum+high):
                noteIndex = (fret-fretNum) % self.noteListLenth
                noteTup = self.guitarObject.guitar[string][fret]
                self.miniScreen[string].append((fret,noteTup,self.noteList[noteIndex]))
        # TODO Add logic to have noteList be correct across strings

GuitarApp()

        
