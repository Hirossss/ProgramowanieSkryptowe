from Grade import AGH_Scale, Grade
from Subject import Subject
from Student import Student
from typing import Final

class Usos:
    subjects: Final = [Subject("Matematyka", 2), Subject("Fizyka", 3), Subject("Informatyka", 5)]
    list_of_students = [Student("Jan", "Kowalski"), Student("Anna", "Kowalska"), Student("Joanna", "Bielecka")] # po kolei ID 1, 2, 3 ...

    def __init__(self):
        self._grades = []

    def add(self, student_id: int, subject: Subject, grade_value: str):
        student = None
        for st in self.list_of_students:
            if st._id == student_id:
                student = st
                break

        if student is None:
            # If the student doesn't exist, create a new one
            student = Student("New", "Student")  # You can provide default names here
            student._id = student_id  # Set the ID
            self.list_of_students.append(student)

        # Znaleziono studenta, dodajemy ocenę
        subject_exists = False

        for subj in self.subjects:
            if subj == subject:
                subject_exists = True
                subject = subj
                break

        if subject_exists:
            grade_enum = None
            try:
                grade_enum = AGH_Scale[grade_value]
            except KeyError:
                print("Invalid grade value. Valid values are A, B, C, D, E, F")
                return

            grade = Grade(student, subject, grade_enum)
            self._grades.append(grade)
        else:
            print("Subject does not exist. Cannot add a grade.")

    def remove(self, student_id: int, subject, grade_value):
        student = None
        for st in self.list_of_students:
            if st._id == student_id:
                student = st
                break

        if student is not None:
            # Znaleziono studenta, usuwamy ocenę
            subject_exists = False
            for subj in self.subjects:
                if subj == subject:
                    subject_exists = True
                    subject = subj
                    break

            if subject_exists:
                grade_enum = None
                try:
                    grade_enum = AGH_Scale[grade_value]
                except KeyError:
                    print("Invalid grade value. Valid values are A, B, C, D, E, F")
                    return

                found_grade = None
                for grade in self._grades:
                    if grade._student == student and grade._subject == subject and grade._grade == grade_enum:
                        found_grade = grade
                        break

                if found_grade:
                    self._grades.remove(found_grade)
                else:
                    print(f"Grade {grade_value} does not exist for subject {subject} for student with ID {student_id} ({student._fname} {student._lname})")
            else:
                print("Subject does not exist. Cannot remove a grade.")
        else:
            print(f"Student with ID {student_id} does not exist.")

    def display_grades(self, student_id):
        student = None
        for st in self.list_of_students:
            if st._id == student_id:
                student = st
                break
                
        if student is not None:
            print(f"Grades for Student {student_id} ({student._fname} {student._lname}):")
            for subject in self.subjects:
                print(f"Subject: {subject._name}")
                subject_grades = [grade for grade in self._grades if grade._student == student and grade._subject == subject]
                for grade in subject_grades:
                    print(f"   Grade: {grade._grade.value}")  # Use the 'value' attribute to get the numerical value
        else:
            print(f"Student with ID {student_id} not found.")

