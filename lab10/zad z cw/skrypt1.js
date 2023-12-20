const students = [
  {
    image: "image/pan_student.png",
    name: "Maciej Kot",
    grades: {
      Matematyka: [4.5, 3.7, 5.0],
      Fizyka: [4.5, 3.0],
    },
  },
  {
    image: "image/pani_student.png",
    name: "Anna Nowak",
    grades: {
      Matematyka: [4.0, 4.2, 3.8],
      Fizyka: [3.5, 4.0],
    },
  },
  {
    image: "image/pan_student.png",
    name: "Mariusz Kowal",
    grades: {
      Matematyka: [],
      Fizyka: [],
    },
  },
  {
    image: "image/pan_student.png",
    name: "Jan Kowalski",
    grades: {
      Matematyka: [3.9, 4.1, 4.5],
      Fizyka: [4.2, 3.9],
    },
  },
  {
    image: "image/pan_student.png",
    name: "Jan Kot",
    grades: {
      Matematyka: [3.9, 4.1, 4.5],
      Fizyka: [4.2, 3.9],
    },
  },
];


  function hasGrades(student) {
    return Object.keys(student.grades).some(subject => student.grades[subject].length > 0);
  }
  
  function openStudentCards() {
    // Odnosimy sie do div w HTML
    const studentsContainer = document.getElementById('studentsContainer');

    // Stylowanie, flexbox
    studentsContainer.style.width = '82%';
    studentsContainer.style.display = 'flex';
    studentsContainer.style.justifyContent = 'space-evenly';
    studentsContainer.style.flexWrap = 'wrap';
    

    students.forEach(student => {
      // Dla kazdego studetna powstaje jego karta
      const card = document.createElement('div');
      card.style.margin = '10px';
      card.style.border = '1px solid black';
      card.style.height = 'min-content'; 
      card.style.width = 'auto';
      card.style.padding = '10px';

      // Sprawdzamy czy uczen ma oceny zeby ustawic tlo
      const studentHasGrades = hasGrades(student);

      if (!studentHasGrades) {
        card.style.backgroundColor = 'gray';
      }

      // Stylujemy karty
      const heading = document.createElement('h1');
      const image = document.createElement('img');
      const gradesHeading = document.createElement('h2');
      const gradesList = document.createElement('ul');

      heading.textContent = student.name;
      heading.style.width = 'fit-content';
      image.src = student.image;
      image.alt = 'Student Image';
      image.style.width = '310px';
      image.style.height = '260px';
      gradesHeading.textContent = 'Grades';

      // Dodajemy oceny z kolekcji
      Object.keys(student.grades).forEach(subject => {
        const listItem = document.createElement('li');
        const strong = document.createElement('strong');
        const textNode = document.createTextNode(`${subject}: ${student.grades[subject].join(', ')} -> Average: ${calculateAverage(student.grades[subject]).toFixed(2)}`);

        strong.style.fontSize = 'small';
        strong.appendChild(textNode);
        listItem.appendChild(strong);
        gradesList.appendChild(listItem);
      });

      // Domyslnie sam naglowek
      card.appendChild(heading);

      // EventListener dla naglowka
      heading.style.cursor = 'pointer';
      let isHidden = true;
  
      heading.addEventListener('click', () => {
        if (isHidden) {
          card.appendChild(image);
          card.appendChild(gradesHeading);
          card.appendChild(gradesList);
  
          // Dodajemy reszte zawartosci po kliknieciu
          image.src = student.image;
          image.alt = 'Student Image';
          image.width = window.innerWidth * 0.3; 
          image.height = window.innerHeight * 0.4;
  
          gradesHeading.textContent = 'Grades';
        } else {
          // Chowamy zawartosc przy ponownym kliknieciu
          while (card.firstChild) {
            card.removeChild(card.firstChild);
          }
          // Dodajemy z powrotem sam naglowek
          card.appendChild(heading);
        }
  
        isHidden = !isHidden;
      });

      gradesList.style.cursor = 'pointer';

      // Doubleclick na oceny
      gradesList.addEventListener('dblclick', () => {
        editGrades(card, student);
      });

      // Dodajemy studenta na koniec do kontenera
      studentsContainer.appendChild(card);
    });
  }
  
  function calculateAverage(grades) {
    if (grades.length === 0) {
      return 0;
    }
  
    const totalValue = grades.reduce((sum, grade) => sum + grade, 0);
    return totalValue / grades.length;
  }
  
  // Funkcja do edytowania ocen po podwójnym kliknięciu
function editGrades(card, student) {
  // Tworzymy okno dialogowe - prompt
  Object.keys(student.grades).forEach(subject => {
    const gradesString = prompt(`Edit grades for ${subject} (comma-separated):`, student.grades[subject].join(', '));

    if (gradesString !== null && gradesString.trim() !== '') {
      const newGrades = gradesString.split(',').map(grade => parseFloat(grade.trim()));

      // Obsługa ocen
      const validGrades = newGrades.filter(grade => !isNaN(grade) && grade >= 2.0 && grade <= 5.0);
      const invalidGrades = newGrades.filter(grade => isNaN(grade) || grade < 2.0 || grade > 5.0);

      // Wyświetl alert dla nieprawidłowych ocen
      if (invalidGrades.length > 0) {
        alert(`Invalid grades detected. The following grades were ignored: ${invalidGrades.join(', ')}. Please enter valid numbers between 2.0 and 5.0.`);
      }

      // Zaktualizuj zawartość gradesList tylko w przypadku prawidłowych ocen
      if (validGrades.length > 0) {
        student.grades[subject] = validGrades;

        updateStudentCardContent(card, student, subject, validGrades);
      }
    } else {
      // Jeśli gradesString jest null lub pusty, wyczyść oceny dla tego przedmiotu
      student.grades[subject] = [];

      updateStudentCardContent(card, student, subject, []);
    }
  });
}
  
  // Funkcja do aktualizacji zawartości karty studenta
function updateStudentCardContent(card, student, subject, grades) {
  const heading = card.querySelector('h1');
  const image = card.querySelector('img');
  const gradesHeading = card.querySelector('h2');
  const gradesList = card.querySelector('ul');

  // Sprawdź, czy listItem dla przedmiotu już istnieje
  const existingListItem = Array.from(gradesList.children).find(child => child.textContent.includes(subject));

  if (existingListItem) {
    // Zastąp istniejący listItem zaktualizowaną zawartością
    const listItemText = `${subject}: ${grades.join(', ')} -> Average: ${calculateAverage(grades).toFixed(2)}`;
    const strong = existingListItem.querySelector('strong');
    strong.textContent = listItemText;

    // Sprawdź, czy student ma jakiekolwiek oceny
    const studentHasGrades = hasGrades(student);
    // Ustaw kolor tła karty na podstawie ocen
    if (!studentHasGrades) {
      card.style.backgroundColor = 'gray';
    } else {
      card.style.backgroundColor = 'white';
    }
  } else {
    // Dodaj nowy listItem do gradesList
    const listItemText = `${subject}: ${grades.join(', ')} -> Average: ${calculateAverage(grades).toFixed(2)}`;
    const listItem = document.createElement('li');
    const strong = document.createElement('strong');
    const textNode = document.createTextNode(listItemText);

    const studentHasGrades = hasGrades(student);

    if (!studentHasGrades) {
      card.style.backgroundColor = 'gray';
    } else {
      // Ustaw domyślny kolor tła na biały
      card.style.backgroundColor = 'white';
    }

    strong.appendChild(textNode);
    listItem.appendChild(strong);
    gradesList.appendChild(listItem);
  }
}

openStudentCards();


// Obsluga formularza


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