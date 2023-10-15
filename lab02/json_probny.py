import sys
import json


try:  # wczytuje dane z pliku json zeby ew je wyswietlic przy pomocy --wykaz_ocen
    with open("oceny.json", "r") as file:
        oceny = json.load(file)
except (
    FileNotFoundError,
    json.JSONDecodeError,  # drugi error dotyczy pustego pliku json
):
    oceny = {}


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
    intro = "----------+----------+-------+\nPrzedmiot | Studenci | Oceny |\n----------+----------+-------+"
    print(intro)
    for i in range(1, len(args) - 1, 3):
        przedmiot = sys.argv[i]
        student = sys.argv[i + 1]
        ocena = sys.argv[i + 2]
        add_grade(przedmiot, student, ocena)
    display_grades()

    with open("oceny.json", "w") as file:   # zapisujemy zmiany do pliku json
        json.dump(
            oceny, file, indent=4   # indent dodaje spacje zeby bylo bardziej czytelne w oceny.json
        )  


if __name__ == "__main__":
    usos(sys.argv)
