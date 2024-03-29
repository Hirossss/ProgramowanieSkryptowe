// Kolekcje z danymi zahardkodowanymi
const subjects = ['Matematyka', 'Fizyka', 'Informatyka'];


// Mapa ocen: przedmiot -> student -> oceny
const gradesMap = new Map();



// Funkcja do obsługi komendy
function executeCommand(commandInput) {
    const commandParams = commandInput.split(' ');
    const action = commandParams[0].toLowerCase(); // Pobieramy pierwszy parametr jako akcję

    switch (action) {
        case 'addgrade':
            handleAddGradeCommand(commandParams.slice(1)); // Przekazujemy resztę parametrów do funkcji obsługi
            break;
        case 'removegrade':
            handleRemoveGradeCommand(commandParams.slice(1)); // Przekazujemy resztę parametrów do funkcji obsługi
            break;
        case 'display':
            handleDisplayCommand(commandParams.slice(1)); // Przekazujemy resztę parametrów do funkcji obsługi
            break;
        case 'modifygrade':
            handleModifyGradeCommand(commandParams.slice(1));
            break;
        default:
            console.error('Unknown command!');
    }
}



// Funkcja do sprawdzania czy uczeń istnieje
function checkIfStudentExists(student) {
    // Zakładam, że `gradesMap` to mapa przedmiot -> student -> oceny
    const studentsExist = Array.from(gradesMap.values())
        .some(studentsMap => studentsMap.has(student));

    if (!studentsExist) {
        console.error(`Student not found: ${student}`);
        return false;
    }

    return true;
}


function checkIfSubjectExists(subject){
    if (!subjects.includes(subject)) {
        console.error(`Invalid subject: ${subject}`);
        return false;
    }
    return true;
}

function handleAddGradeCommand(params) {
    if (params.length >= 4) {
        const subject = params[0];
        const student = params[1] + " " + params[2]; // Połącz imię i nazwisko
        const gradesValues = params.slice(3).map(value => parseFloat(value.trim()));

        if (checkIfSubjectExists(subject)){
            addGradesForStudent(student, gradesValues, subject);
        }
        
    } else {
        console.error('Invalid command format for adding grade!');
    }
}

// Funkcja do obsługi komendy usuwania oceny
function handleRemoveGradeCommand(params) {
    if (params.length === 4) {
        const subject = params[0];
        const student = params[1] + " " + params[2];
        const indexToRemove = parseInt(params[3]);

        if (checkIfSubjectExists(subject) && checkIfStudentExists(student)){
            removeGradeForStudent(student, indexToRemove, subject);
        }
        
    } else {
        console.error('Invalid command format for removing grade!');
    }
}

function handleModifyGradeCommand(params) {
    if (params.length === 5) {
        const subject = params[0];
        const student = params[1] + " " + params[2]; 
        const index = parseInt(params[3]);
        const newGrade = parseFloat(params[4]);

        if (checkIfSubjectExists(subject) && checkIfStudentExists(student)){
            modifyGradeForStudent(student, index, newGrade, subject);
        }

        
    } else {
        console.error('Invalid command format for modifygrade!');
    }
}

// Funkcja do obsługi komendy wyświetlania ocen
function handleDisplayCommand(params) {
    if (params.length >= 2) {
        const student = params[0] + " " + params[1]; // Połącz imię i nazwisko

        if (checkIfStudentExists(student)){
            display(student);
        }

    } 
    else if (params.length === 1) {
        const subject = params[0];

        if (checkIfSubjectExists(subject)){
            displaySubjectGrades(subject);
        }

        
    } else {
        console.error('Invalid command format for display!');
    }
}




// Funkcja do dodawania ocen dla studenta i przedmiotu
function addGradesForStudent(student, gradesValues, subject) {
    

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


// Funkcja do usuwania oceny dla studenta i przedmiotu
function removeGradeForStudent(student, indexToRemove, subject) {
    

    const studentsMap = gradesMap.get(subject);

    if (!studentsMap || !studentsMap.has(student)) {
        console.error(`No grades found for ${student} in ${subject}`);
        return;
    }

    const studentGrades = studentsMap.get(student);

    if (indexToRemove >= 0 && indexToRemove < studentGrades.length) {
        const removedGrade = studentGrades.splice(indexToRemove, 1)[0];
        console.log(`Grade removed successfully for ${student} in ${subject}: ${removedGrade}`);
    } else {
        console.error(`Invalid index to remove grade for ${student} in ${subject}`);
    }
}

function modifyGradeForStudent(student, index, newGrade, subject) {
    

    const studentsMap = gradesMap.get(subject);

    if (studentsMap && studentsMap.has(student)) {
        const studentGrades = studentsMap.get(student);

        if (index >= 0 && index < studentGrades.length) {
            studentGrades[index] = newGrade;
            console.log(`Grade modified successfully for ${student} in ${subject} at index ${index} -> ${newGrade}`);
        } else {
            console.error(`Invalid index for modifying grade: ${index}`);
        }
    } else {
        console.error(`No grades found for ${student} in ${subject}`);
    }
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

// Funkcja do wyświetlania ocen dla danego przedmiotu
function displaySubjectGrades(subject) {
    console.group(`Grades for ${subject}`);

    const studentsMap = gradesMap.get(subject);

    if (studentsMap) {
        // Pobierz informacje o prowadzącym
        const instructor = getSubjectInfo(subject);

        if (instructor) {
            console.log(`Instructor: ${instructor}`);
        } else {
            console.warn(`No instructor found for ${subject}`);
        }

        studentsMap.forEach((grades, student) => {
            const average = calculateAverage(grades).toFixed(2);
            console.log(`Student: ${student}, Grades: ${grades.join(', ')}, Average: ${average}`);
        });
    } else {
        console.warn(`No grades found for ${subject}`);
    }

    console.groupEnd();
}

// Funkcja do pobierania informacji o prowadzącym
function getSubjectInfo(subject) {
    const instructors = new Map([
        ['Matematyka', 'Prof. Kowalski'],
        ['Fizyka', 'Prof. Nowak'],
        ['Informatyka', 'Prof. Wiśniewski']
    ]);

    return instructors.get(subject);
}

// Funkcja do obliczania średniej ocen
function calculateAverage(grades) {
    if (grades.length === 0) {
        return 0;
    }

    const totalValue = grades.reduce((sum, grade) => sum + grade, 0);
    return totalValue / grades.length;
}


// addgrade Matematyka Maciej Kot 4.5 3.7 5.0
// display Maciej Kot
// display Mac Kot
// removegrade Matematyka Maciej Kot 0
// display Matematyka
// addgrade Fizyka Maciej Kot 4.5 3.0
// display Maciej Kot