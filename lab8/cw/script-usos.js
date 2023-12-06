// Zdefiniuj kolekcję z danymi zahardkodowanymi
const students = [
    { id: 1, name: 'John', surname: 'Doe' },
    // Dodaj więcej studentów według potrzeb
];

const subjects = [
    { id: 1, name: 'Math', instructor: 'Prof. Smith' },
    // Dodaj więcej przedmiotów według potrzeb
];

const grades = [
    { studentId: 1, subjectId: 1, value: 4.5 },
    // Dodaj więcej ocen według potrzeb
];

// Funkcja do obsługi komendy
function executeCommand() {
    const commandInput = document.getElementById('cmdinput').value;

    // Przykładowa obsługa komendy dodawania oceny
    if (commandInput.startsWith('addGrade')) {
        const params = commandInput.split(' ');
        if (params.length === 4) {
            const studentId = parseInt(params[1]);
            const subjectId = parseInt(params[2]);
            const value = parseFloat(params[3]);

            const studentExists = students.some(student => student.id === studentId);
            const subjectExists = subjects.some(subject => subject.id === subjectId);

            if (studentExists && subjectExists) {
                grades.push({ studentId, subjectId, value });
                console.log('Grade added successfully:', { studentId, subjectId, value });
                display(); // Dodaj wywołanie funkcji display po dodaniu oceny
            } else {
                console.error('Student or subject not found!');
            }
        } else {
            console.error('Invalid command format for adding grade!');
        }
    } else if (commandInput === 'display') {
        display(); // Dodaj obsługę komendy 'display'
    } else {
        console.error('Unknown command!');
    }
}

// Funkcja do wyświetlania danych
function display() {
    console.group('Grades');
    
    students.forEach(student => {
        subjects.forEach(subject => {
            const studentGrades = grades.filter(grade => grade.studentId === student.id && grade.subjectId === subject.id);

            if (studentGrades.length > 0) {
                const average = calculateAverage(studentGrades);
                console.log(`Student: ${student.name} ${student.surname}, Subject: ${subject.name}, Instructor: ${subject.instructor}, Average: ${average}`);
            } else {
                console.warn(`No grades found for Student: ${student.name} ${student.surname}, Subject: ${subject.name}`);
            }
        });
    });

    console.groupEnd();
}

// Funkcja do obliczania średniej ocen
function calculateAverage(grades) {
    const totalValue = grades.reduce((sum, grade) => sum + grade.value, 0);
    return totalValue / grades.length;
}