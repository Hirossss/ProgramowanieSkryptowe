from Subject import Subject, Exercise, Lecture
from Others import AGH_Scale, Student
from Grade import Grade

class Usos:
    courses = [Exercise("Matematyka", 2), Exercise("Fizyka", 3), Lecture("Informatyka", "zdalny")]

    def __init__(self):
        self.students = {}

    def add(self, student: Student, subject: Subject, grade_value: str):
        if student not in self.students:
            self.students[student] = []

        # Check if the subject exists and find it
        subject_found = next((s for s in self.courses if s.name == subject.name), None)

        # Perform the check for the maximum number of students outside the loop
        if isinstance(subject_found, Exercise):
            if len([grade for grade in self.students[student] if grade.subject == subject_found]) >= subject_found.max_students:
                print(f"Subject {subject_found.name} has reached the maximum number of students.")
                return
        else:
            print("Subject does not exist or is not an Exercise. Cannot add a grade.")
            return

        grade_enum = None
        try:
            grade_enum = AGH_Scale[grade_value]
        except KeyError:
            print("Invalid grade value. Valid values are A, B, C, D, E.")
            return

        grade = Grade(subject_found, grade_enum)
        self.students[student].append(grade)

    def remove(self, student, subject, grade_value):
        if student in self.students:
            # Found the student, remove the grade
            subject_exists = any(s.name == subject.name for s in self.courses)

            if subject_exists:
                found_grade = next((grade for grade in self.students[student] if grade.subject.name == subject.name and grade.agh_scale == AGH_Scale[grade_value]), None)

                if found_grade:
                    self.students[student].remove(found_grade)
                else:
                    print(f"Grade {grade_value} does not exist for subject {subject.name} for student {student}")
            else:
                print("Subject does not exist. Cannot remove a grade.")
        else:
            print(f"Student {student} does not exist.")

    def display_grades(self, student):
        if student in self.students:
            print(f"Grades for Student {student} ({student.fname} {student.lname}):")
            for subject in self.courses:
                print(f"Subject: {subject.name}")
                subject_grades = [grade for grade in self.students[student] if grade.subject == subject]
                for grade in subject_grades:
                    print(f"   Grade: {grade.agh_scale.value}")  # Use the 'value' attribute to get the numerical value
        else:
            print(f"Student {student} not found.")

'''
GOTOWIEC:
# Create an instance of Usos
usos_instance = Usos()

# Create instances of students
john_doe = Student("John", "Doe")
jane_smith = Student("Jane", "Smith")
bob_jones = Student("Bob", "Jones")

# Assuming Usos.subjects is available
math_exercise = Usos.courses[0]  # Assuming the first element is an exercise
physics_lecture = Usos.courses[2]  # Assuming the third element is a lecture

# Adding grades for students
usos_instance.add(john_doe, math_exercise, "A")
usos_instance.add(john_doe, math_exercise, "B")
usos_instance.add(john_doe, physics_lecture, "B")

usos_instance.add(jane_smith, math_exercise, "C")

usos_instance.add(bob_jones, math_exercise, "B")


# Displaying grades for students
usos_instance.display_grades(john_doe)
usos_instance.display_grades(jane_smith)
usos_instance.display_grades(bob_jones)

# Removing a grade from a student
usos_instance.remove(john_doe, math_exercise, "A")

# Displaying grades for a student after removal
usos_instance.display_grades(john_doe)
'''