from Grade import Grade
from Subject import Subject


class Usos:
    subjects = [Subject("Matematyka", 2), Subject("Fizyka", 3), Subject("Informatyka", 5)]

    def __init__(self, grades: list[Grade]):
        self._grades = grades

