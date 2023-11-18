from Subject import Subject, Exercise, Lecture
from Others import AGH_Scale, Student
from Grade import Grade

class Usos:
    courses = [Exercise("Matematyka", 2), Exercise("Fizyka", 3), Lecture("Informatyka", "zdalny")]

    def __init__(self):
        self.students = {}
        self.exercise_counts = {exercise.name: 0 for exercise in self.courses if isinstance(exercise, Exercise)}
    def add(self, student: Student, subject: Subject, grade_value: str):
        if student not in self.students:
            self.students[student] = []

        # Check if the subject exists and find it
        subject_found = next((s for s in self.courses if s.name == subject.name), None)

        if subject_found:
            # Check if the subject is an exercise
            if isinstance(subject_found, Exercise):
                # Check if the exercise has reached the maximum number of students
                if self.exercise_counts[subject_found.name] >= subject_found.max_students:
                    print(f"Exercise {subject_found.name} has reached the maximum number of students.")
                    return
                else:
                    self.exercise_counts[subject_found.name] += 1
            else:
                print("Subject does not exist or is not an Exercise. Cannot add a grade.")
                return
        else:
            print("Subject does not exist. Cannot add a grade.")
            return

        # Perform the check for the grade value
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

usos_instance = Usos()


john_doe = Student("John", "Doe")
jane_smith = Student("Jane", "Smith")
bob_jones = Student("Bob", "Jones")


math_exercise = Usos.courses[0]  
physics_lecture = Usos.courses[2] 


usos_instance.add(john_doe, math_exercise, "A")
usos_instance.add(john_doe, math_exercise, "B")
usos_instance.add(john_doe, physics_lecture, "B")

usos_instance.add(jane_smith, math_exercise, "C")

usos_instance.add(bob_jones, math_exercise, "B")


usos_instance.display_grades(john_doe)
usos_instance.display_grades(jane_smith)
usos_instance.display_grades(bob_jones)


usos_instance.remove(john_doe, math_exercise, "A")


usos_instance.display_grades(john_doe)


print(math_exercise) 


print(physics_lecture) 


print(usos_instance.courses)    
'''