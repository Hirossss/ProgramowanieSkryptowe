class Student:
    def __init__(self, name):
        self._name = name
        self.subjects = {}  # A dictionary to store subjects and grades for this student

    def __repr__(self):
        return f"{self._name}"

    def __str__(self):
        student_info = f"{self._name}"

        for subject, grades in self.subjects.items():
            student_info += f"\n   {subject}    {' '.join(map(str, grades))}"

        return student_info

    def add_subject_and_grade(self, subject, grade):
        if subject not in self.subjects:
            self.subjects[subject] = []
        self.subjects[subject].append(grade)

    def remove_grade(self, subject, grade_number):
        if subject in self.subjects and 0 <= grade_number < len(self.subjects[subject]):
            self.subjects[subject].pop(grade_number)