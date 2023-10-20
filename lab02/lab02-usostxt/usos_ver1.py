def load_grades(filename):
    try:
        with open(filename, "r") as file:
            lines = file.readlines()
            oceny = {}
            for line in lines:
                parts = line.strip().split(";")
                if len(parts) >= 3:
                    subject, student, grade = parts[0], parts[1], float(parts[2])
                    if subject not in oceny:
                        oceny[subject] = {}
                    if student not in oceny[subject]:
                        oceny[subject][student] = []
                    oceny[subject][student].append(grade)
            return oceny
    except FileNotFoundError:
        print(f"File {filename} not found.")
        return {}
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return {}


def save_grades(filename, oceny):
    try:
        with open(filename, "w") as file:
            for subject, students in oceny.items():
                for student, grades in students.items():
                    for grade in grades:
                        file.write(f"{subject};{student};{grade}\n")
        print("Data saved successfully.")
    except Exception as e:
        print(f"An error occurred: {str(e)}")


def display_grades(oceny):
    print("----------+----------+-------+")
    print("Przedmiot | Studenci | Oceny |")
    print("----------+----------+-------+")
    for subject, students in oceny.items():
        for student, grades in students.items():
            grade_str = " ".join(map(str, grades))
            print(f"{subject:<10}  {student:<10}  {grade_str}")
    print("----------+----------+-------+")


def add_grade(oceny, student, subject, grade):
    if subject not in oceny:
        print(f"Invalid subject: {subject}")
        return
    if student not in oceny[subject]:
        oceny[subject][student] = []
    oceny[subject][student].append(grade)
    print(f"Added grade {grade} for {student} in {subject}")


def remove_grade(oceny, student, subject, grade):
    if subject not in oceny:
        print(f"Invalid subject: {subject}")
        return
    if student not in oceny[subject]:
        print(f"Student {student} not found in {subject}")
        return
    if grade in oceny[subject][student]:
        oceny[subject][student].remove(grade)
        print(f"Removed grade {grade} for {student} in {subject}")
    else:
        print(f"Grade {grade} not found for {student} in {subject}")


if __name__ == "__main__":
    filename = input("Enter the filename: ")
    oceny = load_grades(filename)

    while True:
        command = input("> ")
        if not command:
            break

        parts = command.split("+=")
        if len(parts) == 2:
            student, subjects_and_grades = parts
            subject_grade_pairs = subjects_and_grades.split("|")
            for pair in subject_grade_pairs:
                subject, grade = pair.split("(")
                grade = float(grade.rstrip(")"))
                add_grade(oceny, student, subject, grade)
        elif command == "grades":
            display_grades(oceny)
        elif command.startswith("remove"):
            parts = command.split("-=")
            if len(parts) == 2:
                student, subjects_and_grades = parts[1], parts[0]
                subject_grade_pairs = subjects_and_grades.split("|")
                for pair in subject_grade_pairs:
                    subject, grade = pair.split("(")
                    grade = float(grade.rstrip(")"))
                    remove_grade(oceny, student, subject, grade)
        else:
            print("Unknown command")

    save_grades(filename, oceny)
