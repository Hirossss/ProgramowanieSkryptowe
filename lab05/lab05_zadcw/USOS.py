from Others import Subject, Student, AGH_Scale
from Grade import Grade
from typing import Final


class Usos:
    subjects: Final = [Subject("Matematyka", 2), Subject("Fizyka", 3), Subject("Informatyka", 5)]
    students: dict[Student, list[Grade]] = {}

    def add(self, student: Student, subject: Subject, grade_value: str):
        if student not in self.students:
            self.students[student] = []

        # Check if the subject exists and find it
        subject_found = None
        for subj in self.subjects:
            if subj.name == subject.name:
                subject_found = subj
                break

        # Perform the check for the maximum number of students outside the loop
        if subject_found:
            if len([grade for grade in self.students[student] if grade.subject == subject_found]) >= subject_found.max_students:
                print(f"Subject {subject_found.name} has reached the maximum number of students.")
                return
        else:
            print("Subject does not exist. Cannot add a grade.")
            return

        grade_enum = None
        try:
            grade_enum = AGH_Scale[grade_value]
        except KeyError:
            print("Invalid grade value. Valid values are A, B, C, D, E.")
            return

        grade = Grade(subject_found, grade_enum)  # Use subject_found
        self.students[student].append(grade)


    def remove(self, student: Student, subject, grade_value):
        if student in self.students:
            # Znaleziono studenta, usuwamy ocenę
            subject_exists = False
            for subj in self.subjects:
                if subj == subject:
                    subject_exists = True
                    subject = subj
                    break

            if subject_exists:
                found_grade = None
                for grade in self.students[student]:
                    if grade.subject == subject and grade.agh_scale == AGH_Scale[grade_value]:
                        found_grade = grade
                        break

                if found_grade:
                    self.students[student].remove(found_grade)
                else:
                    print(f"Grade {grade_value} does not exist for subject {subject} for student {student}")
            else:
                print("Subject does not exist. Cannot remove a grade.")
        else:
            print(f"Student {student} does not exist.")

    def display_grades(self, student: Student):
        if student in self.students:
            print(f"Grades for Student {student} ({student.fname} {student.lname}):")
            for subject in self.subjects:
                print(f"Subject: {subject.name}")
                subject_grades = [grade for grade in self.students[student] if grade.subject == subject]
                for grade in subject_grades:
                    print(f"   Grade: {grade.agh_scale.value}")  # Use the 'value' attribute to get the numerical value
        else:
            print(f"Student {student} not found.")
