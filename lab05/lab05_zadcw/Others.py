from enum import Enum

class AGH_Scale(Enum):
    A = 5.0
    B = 4.5
    C = 4.0
    D = 3.5
    E = 3.0
    F = 2.0


class Subject:
    def __init__(self, name, max_students):
        self.name = name
        self.max_students = max_students

    def __str__(self):
        return f"{self.name}"

    def __repr__(self):
        return f"{self.name}"


class Student:
    def __init__(self, firstname, lastname):
        self.fname = firstname
        self.lname = lastname

    def __repr__(self):
        return f"{self.fname} {self.lname}"

    def __str__(self):
        return f"{self.fname} {self.lname}"
