class Subject:
    def __init__(self, name, max_students):
        self._name = name
        self._max_students = max_students
        self.students = {}

    def __str__(self):
        student_info = f"{self._name}\n    Maksymalna liczba studentów: {self._max_students}\n    Aktualna liczba studentów: {len(self.students)}\n    Zapisani studenci:\n"

        for student in self.students:
            student_info += f"        {student._name}\n"

        return student_info

    def __repr__(self):
        return f"{self._name}"

    
