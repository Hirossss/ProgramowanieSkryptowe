import sys

oceny = {}  # tu bedzie słownik w stylu: przedmiot, studenci, oceny
przedmioty = {"Matematyka": 2, "Fizyka": 3}

def add_grade(subject, student, grade):
    if subject in przedmioty:
        if subject not in oceny:
            oceny[subject] = {}
        if student not in oceny[subject]:
            if len(oceny[subject]) < przedmioty[subject]:
                oceny[subject][student] = []
            else:
                print(f"Max number of students reached for {subject}")
                return
        oceny[subject][student].append(float(grade))
    else:
        print(f"Invalid subject: {subject}")

def display_grades():
    for subject, students in oceny.items():
        for i, (student, grades) in enumerate(students.items(), start=1):
            output = f"{subject}    {i}. "
            output += f"{student}   " + " ".join(map(str, grades))
            print(output)

def usos(args):
    if args[-1] != "--wykaz_ocen":
        print("Please provide --wykaz_ocen at the end to generate the report.")
        return
    intro = "----------+----------+-------+\nPrzedmiot | Studenci | Oceny |\n----------+----------+-------+"  # noqa: E501
    print(intro)
    for i in range(1, len(args) - 1, 3):
        przedmiot = sys.argv[i]
        student = sys.argv[i + 1]
        ocena = sys.argv[i + 2]
        add_grade(przedmiot, student, ocena)
    display_grades()

if __name__ == "__main__":
    usos(sys.argv)