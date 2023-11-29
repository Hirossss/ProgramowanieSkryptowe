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
    @group("nazwa")
    def display_grades(self, student):
        print(
            f"Grades for Student {student} ({self.students.get(student, {}).get('fname')} {self.students.get(student, {}).get('lname')}):"
        )
        for subject in self.courses:
            print(f"Subject: {subject.name}")
            subject_grades = [
                grade
                for grade in self.students.get(student, {}).get("grades", [])
                if grade.subject == subject
            ]
            for grade in subject_grades:
                print(f"   Grade: {grade.agh_scale.value}")

    @write
    @group("nazwa")
    def add(self, student: Student, subject: Subject, grade_value: str):
        self.students.setdefault(student, {"grades": []})

        subject_found = next((s for s in self.courses if s.name == subject.name), None)

        exercise_condition = (
            isinstance(subject_found, Exercise)
            and len(self.exercise_enrollments.get(subject_found.name, set()))
            < subject_found.max_students
        )

        if not subject_found or not (
            isinstance(subject_found, Exercise) and exercise_condition
        ):
            print("Subject does not exist or is not an Exercise. Cannot add a grade.")
            return

        try:
            grade_enum = AGH_Scale[grade_value]
        except KeyError:
            print("Invalid grade value. Valid values are A, B, C, D, E.")
            return

        grade = Grade(subject_found, grade_enum)
        self.students[student]["grades"].append(grade)

        if isinstance(subject_found, Exercise):
            self.exercise_enrollments[subject_found.name].add(student)

    @write
    @group("nazwa")
    def remove(self, student, subject, grade_value):
        subject_exists = any(s.name == subject.name for s in self.courses)

        found_grade = next(
            (
                grade
                for grade in self.students.get(student, {}).get("grades", [])
                if grade.subject.name == subject.name
                and grade.agh_scale == AGH_Scale[grade_value]
            ),
            None,
        )

        grade_removed = (
            subject_exists
            and found_grade
            and self.students.get(student, {}).get("grades", []).remove(found_grade)
            and isinstance(found_grade.subject, Exercise)
            and self.exercise_enrollments.get(found_grade.subject.name, set()).remove(
                student
            )
        )

        print(
            f"{'Student does not exist.' * (student not in self.students)}"
            f"{'Subject does not exist. Cannot remove a grade.' * (not subject_exists)}"
            f"{'Grade does not exist for student, subject, or value.' * (not grade_removed)}"
        )


if __name__ == "__main__":
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


'''
TRZEBA SIE ZASTANOWIC.
Czy ktos kto ma write moze tez automatycznie czytac ???

gdy ktos jest z grupy "nazwa" to tworza sie logi.


GOTOWIEC.

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