oceny = {'Math': {'Alice': [95.0, 88.5, 92.0], 'Krystek': [95.0, 88.5, 92.0]}}


for przedmiot, students in oceny.items():
    for i, (student,grades) in enumerate(students.items(), start=1):
        output = f"{przedmiot}    {i}.  "
        output += f"{student}   " + " ".join(map(str, grades))
        print(output)