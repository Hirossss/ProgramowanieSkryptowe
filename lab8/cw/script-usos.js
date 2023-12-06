// Kolekcje z danymi zahardkodowanymi
const subjects = ['Matematyka', 'Fizyka', 'Informatyka'];

// Mapa ocen: przedmiot -> student -> oceny
const gradesMap = new Map();

// Funkcja do dodawania ocen dla studenta i przedmiotu
function addGradesForStudent(student, gradesValues, subject) {
    if (!subjects.includes(subject)) {
        console.error(`Invalid subject: ${subject}`);
        return;
    }

    if (!gradesMap.has(subject)) {
        gradesMap.set(subject, new Map());
    }

    const studentsMap = gradesMap.get(subject);

    if (!studentsMap.has(student)) {
        studentsMap.set(student, []);
    }

    const studentGrades = studentsMap.get(student);
    studentGrades.push(...gradesValues);

    console.log(`Grades added successfully for ${student} in ${subject}: ${gradesValues.join(', ')}`);
}

// Funkcja do wyświetlania ocen dla danego studenta
function display(student) {
    console.group(`Grades for ${student}`);
    
    subjects.forEach(subject => {
        const studentsMap = gradesMap.get(subject);

        if (studentsMap && studentsMap.has(student)) {
            const studentGrades = studentsMap.get(student);
            const average = calculateAverage(studentGrades).toFixed(2);

            console.log(`Subject: ${subject}, Grades: ${studentGrades.join(', ')}, Average: ${average}`);
        } else {
            console.warn(`No grades found for ${student} in ${subject}`);
        }
    });

    console.groupEnd();
}

// Funkcja do obliczania średniej ocen
function calculateAverage(grades) {
    if (grades.length === 0) {
        return 0;
    }

    const totalValue = grades.reduce((sum, grade) => sum + grade, 0);
    return totalValue / grades.length;
}


// Przykładowe użycie funkcji
const newStudent = 'John Doe';
addGradesForStudent(newStudent, [4.5, 3.7, 5.0], 'Matematyka');

// Wyświetl oceny dla studenta
display(newStudent);
