import argparse
import logging
from functools import wraps
from datetime import datetime

from Subject import Subject, Exercise, Lecture
from Others import AGH_Scale, Student
from Grade import Grade


class AccessError(Exception):
    pass


def read(func):
    @wraps(func)
    def wrapper(self, *args, **kwargs):
        if self.current_user_privilege != "read":
            raise AccessError("Access denied. User does not have read privilege.")
        return func(self, *args, **kwargs)

    return wrapper


def write(func):
    @wraps(func)
    def wrapper(self, *args, **kwargs):
        if self.current_user_privilege != "write":
            raise AccessError("Access denied. User does not have write privilege.")
        return func(self, *args, **kwargs)

    return wrapper


def group(group_name):
    def decorator(func):
        @wraps(func)
        def wrapper(self, *args, **kwargs):
            if self.current_user_group == group_name:
                log_message = f"{datetime.now()}: User {self.current_user} called method {func.__name__} of class {self.__class__.__name__}"
                logging.info(log_message)
            return func(self, *args, **kwargs)

        return wrapper

    return decorator


class Usos:
    courses = [
        Exercise("Matematyka", 2),
        Exercise("Fizyka", 3),
        Lecture("Informatyka", "zdalny"),
    ]

    def __init__(self):
        self.students = {}
        self.exercise_enrollments = {
            exercise.name: set()
            for exercise in self.courses
            if isinstance(exercise, Exercise)
        }
        self.current_user = None
        self.current_user_group = None
        self.current_user_privilege = None

    @read
    @group('nazwa')
    def display_grades(self, student):
        if student in self.students:
            print(f"Grades for Student {student} ({student.fname} {student.lname}):")
            for subject in self.courses:
                print(f"Subject: {subject.name}")
                subject_grades = [
                    grade
                    for grade in self.students[student]
                    if grade.subject == subject
                ]
                for grade in subject_grades:
                    print(
                        f"   Grade: {grade.agh_scale.value}"
                    )  # Use the 'value' attribute to get the numerical value
        else:
            print(f"Student {student} not found.")

    @write
    @group('nazwa') 
    def add(self, student: Student, subject: Subject, grade_value: str):
        if student not in self.students:
            self.students[student] = []

        # Check if the subject exists and find it
        subject_found = next((s for s in self.courses if s.name == subject.name), None)

        if subject_found:
            # Check if the subject is an exercise
            if isinstance(subject_found, Exercise):
                # Check if the exercise has reached the maximum number of students
                if (
                    len(self.exercise_enrollments[subject_found.name])
                    >= subject_found.max_students
                ):
                    print(
                        f"Exercise {subject_found.name} has reached the maximum number of students."
                    )
                    return
                else:
                    self.exercise_enrollments[subject_found.name].add(student)
            else:
                print(
                    "Subject does not exist or is not an Exercise. Cannot add a grade."
                )
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

    @write
    @group('nazwa')
    def remove(self, student, subject, grade_value):
        if student in self.students:
            # Found the student, remove the grade
            subject_exists = any(s.name == subject.name for s in self.courses)

            if subject_exists:
                found_grade = next(
                    (
                        grade
                        for grade in self.students[student]
                        if grade.subject.name == subject.name
                        and grade.agh_scale == AGH_Scale[grade_value]
                    ),
                    None,
                )

                if found_grade:
                    self.students[student].remove(found_grade)

                    # Decrement the exercise count only if it's an Exercise
                    if isinstance(found_grade.subject, Exercise):
                        self.exercise_enrollments[found_grade.subject.name].remove(
                            student
                        )
                else:
                    print(
                        f"Grade {grade_value} does not exist for subject {subject.name} for student {student}"
                    )
            else:
                print("Subject does not exist. Cannot remove a grade.")
        else:
            print(f"Student {student} does not exist.")


if __name__ == "__main__":
    # Configure logging to save logs to a file
    logging.basicConfig(filename="usos_logs.log", level=logging.INFO)

    parser = argparse.ArgumentParser(description="USOS System")
    parser.add_argument("user", type=str, help="User name")
    parser.add_argument("group", type=str, help="User group")
    parser.add_argument("privilege", type=str, help="User privilege (read or write)")
    args = parser.parse_args()

    usos_instance = Usos()
    usos_instance.current_user = args.user
    usos_instance.current_user_group = args.group
    usos_instance.current_user_privilege = args.privilege


"""
# Test the decorated methods based on user privilege and group
usos_instance.display_grades("JohnDoe")  # This should raise an AccessError if the privilege is 'write'
usos_instance.add(Student("John", "Doe"), Exercise("Matematyka", 2), "A")  # This should raise an AccessError if the privilege is 'read'
usos_instance.remove("JohnDoe", Exercise("Matematyka", 2), "A")  # This should raise an AccessError if the privilege is 'read'
"""
"""
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
"""
