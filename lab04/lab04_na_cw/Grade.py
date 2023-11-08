from Student import Student
from Subject import Subject
from enum import Enum


class AGH_Scale(Enum):
    A = 5.0
    B = 4.5
    C = 4.0
    D = 3.5
    E = 3.0
    F = 2.0


class Grade:
    def __init__(self, student: Student, subject: Subject, grade: AGH_Scale):
        self._student = student
        self._subject = subject
        self._grade = grade
