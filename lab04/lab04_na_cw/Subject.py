class Subject:
    def __init__(self, name, max_students):
        self._name = name
        self._max_students = max_students

    def __str__(self):
        return f"{self._name}"

    def __repr__(self):
        return f"{self._name}"

    
