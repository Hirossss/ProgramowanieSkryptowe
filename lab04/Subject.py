class Subject:
# dodac zmienna __ilosc_studentow=0

    def __init__(self, name, max_students):
        # __ilosc_studentow+=1
        self.__name = name
        self.__max_students = max_students
        self.students = {}
        self.grades = {}

    def __str__(self):
        student_info = f"{self.__name}\n    Maksymalna liczba studentów: {self.__max_students}\n    Aktualna liczba studentów: {len(self.students)}\n    Zapisani studenci:\n"

        for student, grades in self.students.items():
            grade_info = " ".join([f"{grade:.1f}" for grade in grades])
            student_info += f"        {student}: {grade_info}\n"

        return student_info

    def __repr__(self):
        return f"{self.__name}"

    def add(self, student, grade):
        if len(self.students) < self.__max_students:
            if student not in self.students:
                self.students[student] = []
            self.students[student].append(grade)

            # Store the grade with a unique identifier
            grade_id = len(self.students[student])
            self.grades[(student, grade_id)] = grade
        else:
            print(
                f"Nie można dodać studenta {student}. Limit studentów został osiągnięty."
            )

    def remove(self, student, grade_number):
        if student in self.students:
            # Check if the grade exists for this student
            if (student, grade_number) in self.grades:
                grade = self.grades[(student, grade_number)]
                self.students[student].remove(grade)
                del self.grades[(student, grade_number)]
            else:
                print(f"Brak oceny o numerze {grade_number} dla studenta {student}.")
        else:
            print(f"Student {student} nie jest zapisany na przedmiot {self.__name}.")
