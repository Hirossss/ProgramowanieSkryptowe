import argparse

oceny = {}  # tu bedzie słownik w stylu: przedmiot, studenci, oceny

parser = argparse.ArgumentParser(description="USOS Emulator")
parser.add_argument("file", help="Path to the input file")


def parse_file(file_path):
    subject_dict = {}

    with open(file_path, "r") as file:
        lines = file.readlines()

    for line in lines:
        parts = line.strip().split(":")

        if len(parts) == 2:
            subject = parts[0].strip()
            value = int(parts[1].strip())
            subject_dict[subject] = value

    return subject_dict


def remove_students_with_no_grades():
    students_to_remove = []

    for subject, students in oceny.items():
        for student, grades in students.items():
            if not grades:
                students_to_remove.append((subject, student))

    for subject, student in students_to_remove:
        del oceny[subject][student]


def remove_grade(input_str):
    student_modifications = input_str.split(" ")

    for student_modification in student_modifications:
        parts = student_modification.split("-=")
        if len(parts) != 2:
            print(
                "Invalid input format. Use Name-=Subject(grade_index)|Subject(grade_index)"
            )
            continue

        student, subjects_indices = parts
        student = student.strip()
        subjects_indices = subjects_indices.strip()
        subject_index_list = subjects_indices.split("|")

        for subject_index in subject_index_list:
            subject_index = subject_index.strip()
            subject_parts = subject_index.split("(")
            subject = subject_parts[0].strip()
            grade_indices_str = subject_parts[1].strip().strip(")")
            grade_indices = [int(index) for index in grade_indices_str.split(",")]

            if subject in oceny and student in oceny[subject]:
                for index in grade_indices:
                    if index > 0 and index <= len(oceny[subject][student]):
                        del oceny[subject][student][index - 1]
                    else:
                        print(f"{subject} - no grade with index {index}")
            else:
                print(f"{subject} - no such subject or student")
    remove_students_with_no_grades()


def add_grade(input_str, przedmioty):
    student_subjects = input_str.split(" ")

    for student_subject in student_subjects:
        parts = student_subject.split("+=")
        if len(parts) != 2:
            print("Invalid input format. Use Name+=Subject(grades)|Subject(grades)")
            continue

        student, subjects_data = parts
        student = student.strip()
        subjects_data = subjects_data.strip()

        subject_grades_list = subjects_data.split("|")

        for subject_grades in subject_grades_list:
            subject_grades = subject_grades.strip()
            subject_parts = subject_grades.split("(")
            subject = subject_parts[0].strip()
            grades_str = subject_parts[1].strip().strip(")")

            if subject in przedmioty:
                max_students = przedmioty[subject]
                if subject in oceny:
                    if student in oceny[subject]:
                        grades = [
                            float(grade_str) for grade_str in grades_str.split(",")
                        ]
                        oceny[subject][student].append(grades)
                        if len(oceny[subject][student]) > max_students:
                            print(f"Max number of students reached for {subject}")
                    else:
                        oceny[subject][student] = [
                            float(grade_str) for grade_str in grades_str.split(",")
                        ]
                else:
                    oceny[subject] = {
                        student: [
                            float(grade_str) for grade_str in grades_str.split(",")
                        ]
                    }
            else:
                print(f"Invalid subject: {subject}")
    print(oceny)


def display_grades(przedmioty):
    intro = "----------+----------+-------+\nPrzedmiot | Studenci | Oceny |\n----------+----------+-------+"
    print(intro)

    for subject, max_students in przedmioty.items():
        if subject in oceny:
            students = oceny[subject]
            for i in range(max_students):
                output = f"{subject}    {i + 1}."

                if i < len(students):
                    student, grades = list(students.items())[i]
                    output += f" {student}   {', '.join(map(str, grades))}"
                print(output)
        else:
            for i in range(max_students):
                output = f"{subject}    {i + 1}."
                print(output)


if __name__ == "__main__":
    args = parser.parse_args()
    filename = args.file
    przedmioty = parse_file(filename)

    while True:
        user_input = input("> ")

        if not user_input:
            continue
        elif "+=" in user_input:
            add_grade(user_input, przedmioty)
        elif "grades" in user_input:
            display_grades(przedmioty)
        elif "-=" in user_input:
            remove_grade(user_input)
        else:
            print("Unknown command.")
            continue
