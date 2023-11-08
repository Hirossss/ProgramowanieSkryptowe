class Student:
    id_counter = 0

    def __init__(self, firstname, lastname):
        Student.id_counter += 1
        self._id = Student.id_counter
        self._fname = firstname
        self._lname = lastname

    def __repr__(self):
        return f"{self._fname} {self._lname}"

    def __str__(self):
        return f"{self._fname} {self._lname} {self._id}"

        
