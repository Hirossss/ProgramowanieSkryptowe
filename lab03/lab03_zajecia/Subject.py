class Subject:
    def __init__(self, name, max_students):
        self.__name = name
        self.__max_students = max_students
        self.students = {}  # Store subjects and grades for each student

    def __str__(self):
        student_info = f"{self.__name}\n    Maksymalna liczba studentów: {self.__max_students}\n    Aktualna liczba studentów: {len(self.students)}\n    Zapisani studenci:\n"

        for student in self.students:
            student_info += f"        {student._name}\n"

        return student_info

    def __repr__(self):
        return f"{self.__name}"

    def add(self, student, grade):
        if len(self.students) < self.__max_students:
            if student not in self.students:
                self.students[student] = {}
            student_subjects = self.students[student]
            student_subjects[self.__name] = student_subjects.get(self.__name, []) + [
                grade
            ]
            student.add_subject_and_grade(  # korzystam z metody obiektu student
                self.__name, grade
            )  
        else:
            print(
                f"Nie można dodać studenta {student}. Limit studentów został osiągnięty."
            )

    def remove(self, student, grade_number):
        if student in self.students:
            student_subjects = self.students[student]
            if self.__name in student_subjects:
                grades = student_subjects[self.__name]
                if 1 <= grade_number <= len(grades):
                    removed_grade = grades.pop(grade_number - 1) 
                    if not grades:
                        del student_subjects[self.__name]
                    student.remove_grade(self.__name, grade_number - 1) 
                    print(f"Usunięto ocenę {removed_grade} studentowi: {student._name} w przedmiocie: {self.__name}.")
                else:
                    print(f"Nie ma oceny o numerze {grade_number} dla studenta {student._name}.")
            else:
                print(f"Student {student} nie jest zapisany na przedmiot {self.__name}.")
        else:
            print(f"Student {student} nie jest zapisany na przedmiot {self.__name}.")
