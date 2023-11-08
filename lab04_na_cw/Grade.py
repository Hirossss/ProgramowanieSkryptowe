from lab03.lab03_zajecia.Subject import Subject
from lab04_na_cw.Student import Student
from enum import Enum


class AGH_Scale(Enum):
    A = 5.0
    B = 4.5
    C = 4.0
    D = 3.5
    E = 3.0


class Grade:
    def __init__(self, student: Student, subject: Subject, grade: AGH_Scale):
        self._student = student
        self._subject = subject
        self._grade = grade
