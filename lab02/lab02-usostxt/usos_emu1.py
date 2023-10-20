przedmioty = {"Matematyka": 2, "Fizyka": 3}


def add_grade(text):
    with open("oceny_18.txt", "r") as file:
        lines = file.readlines()

    students_and_grades = {}

    for student_subjects_and_grades in text.split():
        student_subjects_and_grades = student_subjects_and_grades.split("+=")
        if len(student_subjects_and_grades) == 2:
            student_data = student_subjects_and_grades[0].strip()
            subjects_and_grades = student_subjects_and_grades[1].strip()

            if (student_subject_pairs := students_and_grades.get(student_data)) is not None:
                student_subject_pairs.extend(parse_subjects_and_grades(subjects_and_grades))
            else:
                students_and_grades[student_data] = parse_subjects_and_grades(subjects_and_grades)

    updated_lines = []  # Create a new list to store updated lines

    for line in lines:
        parts = line.split(";")
        subject, student, existing_grades = parts[1], parts[2], parts[3].lstrip("(").rstrip(")")

        if (student_subject_pairs := students_and_grades.get(student)) is not None:
            for subject, grades in student_subject_pairs:
                if existing_grades:
                    updated_grades = existing_grades.split(",") + [grades]
                else:
                    updated_grades = [grades]
                updated_lines.append(f";{subject};{student};({','.join(updated_grades)})")
            del students_and_grades[student]  # Mark the student as processed
        else:
            if existing_grades:
                updated_lines.append(f";{subject};{student};({existing_grades})")

    for student, subject_grade_pairs in students_and_grades.items():
        for subject, grades in subject_grade_pairs:
            updated_lines.append(f";{subject};{student};({grades})")

    with open("oceny_18.txt", "w") as file:
        file.writelines(updated_lines)


def parse_subjects_and_grades(subjects_and_grades):
    subject_grade_pairs = subjects_and_grades.split("|")
    pairs = []
    for pair in subject_grade_pairs:
        subject, grades = pair.split("(")
        grades = grades.rstrip(")")
        pairs.append((subject, grades))
    return pairs



def parse_subjects_and_grades(subjects_and_grades):
    subject_grade_pairs = subjects_and_grades.split("|")
    pairs = []
    for pair in subject_grade_pairs:
        subject, grades = pair.split("(")
        grades = grades.rstrip(")")
        pairs.append((subject, grades))
    return pairs



def remove_grade(text):
    with open("oceny_18.txt", "r") as file:
        lines = file.readlines()

    modified_lines = []  # Create a new list to store modified lines

    for command in text.split():
        tab_wejscia = command.split("-=")

        if len(tab_wejscia) == 2:
            student = tab_wejscia[0].strip()
            subjects_and_grades = tab_wejscia[1].strip()
            subject_grade_pairs = subjects_and_grades.split("|")

            for pair in subject_grade_pairs:
                subject, grade_indices = pair.split("(")
                grade_indices = grade_indices.rstrip(")")
                grade_indices = [int(index) for index in grade_indices.split(",")]

                for line in lines:
                    if f";{subject};{student};" in line:
                        grades = line.split(";")
                        if len(grades) > 3:
                            existing_grades = (
                                grades[3].lstrip("(").rstrip(")").split(",")
                            )
                            invalid_indices = [
                                str(index)
                                for index in grade_indices
                                if index < 1 or index > len(existing_grades)
                            ]
                            if invalid_indices:
                                print(
                                    f"{subject} - nie istnieje ocena o numerze {', '.join(invalid_indices)}"
                                )
                            new_grades = [
                                existing_grades[i - 1]
                                for i in range(1, len(existing_grades) + 1)
                                if i not in grade_indices
                            ]

                            if new_grades:  # Check if there are any grades left
                                grades[3] = f"({','.join(new_grades)})"
                            else:
                                # If all grades are removed, remove the entire entry
                                continue
                        modified_lines.append(";".join(grades) + "\n")
                    else:
                        modified_lines.append(line)

    with open("oceny_18.txt", "w") as file:
        file.writelines(modified_lines)


if __name__ == "__main__":
    while True:
        wejscie = input("> ")

        match wejscie:
            case text if not text:
                break  # Exit the loop on empty input
            case text if "+=" in text:
                add_grade(text)
            case text if "-=" in text:
                remove_grade(text)
            case _:
                print("Unknown command")
