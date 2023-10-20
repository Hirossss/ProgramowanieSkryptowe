przedmioty = {"Matematyka": 2, "Fizyka": 3}


def add_grade(text):
    lines = text.split()
    for line in lines:
        tab_wejscia = line.split("+=")

        if len(tab_wejscia) == 2:
            student = tab_wejscia[0].strip()
            subjects_and_grades = tab_wejscia[1].strip()
            subject_grade_pairs = subjects_and_grades.split("|")

            for pair in subject_grade_pairs:
                subject, grade = pair.split("(")
                grade = grade.rstrip(")")
                formatted_data = f"{subject};{student};({grade});"
                print(formatted_data)
                with open("oceny_18.txt", "a") as file:
                    file.write(formatted_data)


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
