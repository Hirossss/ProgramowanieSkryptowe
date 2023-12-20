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