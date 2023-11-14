Zaczynamy od inicjalizacji obiektu klasy Usos:

    usos=Usos()

Wersja łatwiejsza, zaimplementowane komendy:

a)
    usos.add(id, Usos.subjects[indeks_przedmiotu], "x")
    dozwolone x: "A, B, C, D, E, F" -> oceny w notacji międzynarodowej, tlumaczone na oceny AGH "5.0, 4.5, 4.0, 3.5, 3.0"

b)
    usos.remove(-||-)

c)
    usos.display_grades(id)

d) 
    set przedmiotow na sztywno:
    Usos.subjects[0] - Matematyka
    Usos.subjects[1] - Fizyka
    Usos.subjects[2] - Informatyka


Gotowiec:

usos=Usos()

usos.add(1, Usos.subjects[0], "A")
usos.add(1, Usos.subjects[0], "C")
usos.add(1, Usos.subjects[1], "B")
usos.add(1, Usos.subjects[1], "B")
usos.display_grades(1) 

usos.display_grades(0)

usos.add(50, Usos.subjects[0], "A")
usos.add(50, Usos.subjects[2], "B")
usos.display_grades(50)

usos.remove(1, Usos.subjects[0], "C")
usos.display_grades(1) 
exit()