class Subject:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return f"{self.name}"

    def __repr__(self):
        return f"{self.name}"

# Update Exercise and Lecture classes
class Exercise(Subject):
    def __init__(self, name, max_students):
        super().__init__(name)
        self.max_students = max_students

class Lecture(Subject):
    def __init__(self, name, mode):
        super().__init__(name)
        self.mode = mode  # 'zdalny' or 'stacjonarny'