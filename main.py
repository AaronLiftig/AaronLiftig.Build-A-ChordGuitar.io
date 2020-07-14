from guitar import Guitar

class GuitarApp:
    def __init__(self,numOfStrings=6,tuning="standard",numOfFrets=19): 
        self.cordDict = {
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
                         ]
        
        self.numOfFrets = numOfFrets
        self.guitarObject = Guitar(numOfStrings,tuning)
        for num in range(len(self.guitarObject.guitar)):
            print("String"+str(num)+":",self.guitarObject.guitar[num],"\n")
        print("\n"*2)
        
        self.GetMiniScreen(5,18)
        for num in range(len(self.miniScreen)):
            print("String"+str(num)+":",self.miniScreen[num],"\n")
        print("\n"*2)
        
        self.ApplyCord()

        self.GetMiniScreen(5,18)
        for num in range(len(self.modedMiniScreen)):
            print("String"+str(num)+":",self.modedMiniScreen[num],"\n")
    
    def GetMiniScreen(self,stringNum,fretNum):
        rootNoteNum = self.guitarObject.guitar[stringNum][fretNum][1][0]
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
                noteTup = self.guitarObject.guitar[string][fret]
                noteDiff = (noteTup[1][0] - rootNoteNum) % len(self.noteList)
                self.miniScreen[string].append((noteTup[0],noteTup[1],(noteDiff,self.noteList[noteDiff])))
        # TODO Add logic to have noteList be correct across strings

    def ApplyCord(self,cordString="major"):
        self.modedMiniScreen = self.miniScreen.copy()
        cordNoteList = self.cordDict["major"]
        for i in range(len(self.miniScreen)):
            string = self.miniScreen[i]
            for j in range(len(string)):
                fret = string[j]
                if fret[2][0] not in cordNoteList:
                    self.modedMiniScreen[i][j] = (fret[0],fret[1],(fret[2][0],"dropped"))
 

GuitarApp()
