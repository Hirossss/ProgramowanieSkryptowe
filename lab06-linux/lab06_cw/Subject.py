class Subject:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"{self.name}"

    def __repr__(self):
        return f"{self.name}"

    """
    def __hash__(self):
        return hash(self.name)
    """


class Exercise(Subject):
    def __init__(self, name, max_students):
        super().__init__(name)
        self.max_students = max_students

    def __str__(self):
        return f"Exercise: {self.name} (Max Students: {self.max_students})"

    def __repr__(self):
        return f"Exercise: {self.name}"


class Lecture(Subject):
    def __init__(self, name, mode):
        super().__init__(name)
        self.mode = mode  # 'zdalny' or 'stacjonarny'

    def __str__(self):
        return f"Lecture: {self.name} (Mode: {self.mode})"

    def __repr__(self):
        return f"Lecture: {self.name}"
