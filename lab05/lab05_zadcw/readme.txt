
jan_kowalski = Student("Jan", "Kowalski")
anna_kowalska = Student("Anna", "Kowalska")
maciej_kot = Student("Maciej", "Kot")

usos_instance = Usos()


usos_instance.add(jan_kowalski, Usos.subjects[0], "A")  # Matematyka
usos_instance.add(jan_kowalski, Usos.subjects[0], "B")  # Matematyka
usos_instance.add(jan_kowalski, Usos.subjects[1], "B")  # Fizyka
usos_instance.display_grades(jan_kowalski)

usos_instance.add(anna_kowalska, Usos.subjects[0], "C")  # Matematyka
usos_instance.display_grades(anna_kowalska)

usos_instance.add(maciej_kot, Usos.subjects[0], "A") # powinien byc error  


usos_instance.remove(jan_kowalski, Usos.subjects[0], "A")  
usos_instance.display_grades(jan_kowalski)
