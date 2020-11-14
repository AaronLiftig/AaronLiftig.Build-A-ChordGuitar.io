from guitar_app import GuitarApp 


# On connecting to website 
guitarApp = GuitarApp()

print("#################")
print("Website Homepage:")
print("#################")
print("Data Structure for Guitar:")
print("(string#,fret#),(note#,noteString)")
print("#################")
print("\n"*2)

print("Guitar:","\n")
print("Tuning:",guitarApp.yourGuitar.tuning,"\n")
for num in range(len(guitarApp.yourGuitar.guitar)):
    print("String "+str(num+1)+":",guitarApp.yourGuitar.guitar[num],"\n")
print("\n"*2)


print("#################")
print("On Selecting New Tuning:")
print("#################")
print("Data Structure for Guitar:")
print("(string#,fret#),(note#,noteString)")
print("#################")
print("\n"*2)

guitarApp.yourGuitar.TuneGuitar(tuning="double drop d")

print("Newly Tuned Guitar:","\n")
print("Tuning:",guitarApp.yourGuitar.tuning,"\n")
for num in range(len(guitarApp.yourGuitar.guitar)):
    print("String "+str(num+1)+":",guitarApp.yourGuitar.guitar[num],"\n")
print("\n"*2)


print("#################")
print("On Selecting Root:")
print("#################")
print("Mini Screen with Default Cord Applied (major cord):")
print("#################")
print("Data Structure for Mini Screen:")
print("(string#,fret#),(note#,noteString),(noteInterval#,noteIntervalString),noteIntervalColor")
print("#################")
print("\n"*2)

yourDefaultMiniScreen = guitarApp.GetMiniScreen(3,10)

print("Mini Screen:")
for num in range(len(yourDefaultMiniScreen)):
    print("String "+str(num+1)+":",yourDefaultMiniScreen[num],"\n")
print("\n"*2)


print("#################")
print("On Selecting New Chord:")
print("#################")
print("Data Structure for New Mini Screen:")
print("(string#,fret#),(note#,noteString),(noteInterval#,noteIntervalString),noteIntervalColor")
print("#################")
print("\n"*2)

print("New Mini Screen:")
yourNewMiniScreen = guitarApp.ApplyCordToMiniScreen(cordString="minor 13th")

for num in range(len(yourNewMiniScreen)):
    print("String "+str(num+1)+":",yourNewMiniScreen[num],"\n")
