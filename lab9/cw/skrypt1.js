const students = [
    {
      image: 'image/pan_student.png',
      name: 'Maciej Kot',
      grades: {
        'Matematyka': [4.5, 3.7, 5.0],
        'Fizyka': [4.5, 3.0],
      },
    },
    {
      image: 'image/pani_student.png',
      name: 'Anna Nowak',
      grades: {
        'Matematyka': [4.0, 4.2, 3.8],
        'Fizyka': [3.5, 4.0],
      },
    },
    {
      image: 'image/pan_student.png',
      name: 'Mariusz Kowal',
      grades: {
        'Matematyka': [],
        'Fizyka': [],
      },
    },
    {
      image: 'image/pan_student.png',
      name: 'Jan Kowalski',
      grades: {
        'Matematyka': [3.9, 4.1, 4.5],
        'Fizyka': [4.2, 3.9],
      },
    },
    // Dodaj inne dane studentów...
  ];


  // Function to check if a student has any grades
  function hasGrades(student) {
    return Object.keys(student.grades).some(subject => student.grades[subject].length > 0);
  }
  
  function openStudentCards() {
    // Get the container in the main HTML
    const studentsContainer = document.getElementById('studentsContainer');

    // Ustaw kontener na flexbox z właściwością space-around
    studentsContainer.style.width = '82%';
    studentsContainer.style.display = 'flex';
    studentsContainer.style.justifyContent = 'space-between';
    studentsContainer.style.flexWrap = 'wrap';
    

    students.forEach(student => {
      // Create a card element for each student
      const card = document.createElement('div');
      card.style.margin = '10px';
      card.style.border = '1px solid black';
      card.style.height = 'auto'; // Dopasuj wysokość do zawartości
      card.style.width = 'auto'; // Dopasuj szerokość do zawartości
      card.style.padding = '10px';

      // Check if there are grades for the student
      const studentHasGrades = hasGrades(student);

      // Set the background color of the card based on grades
      if (!studentHasGrades) {
        card.style.backgroundColor = 'gray';
      }

      // Create elements for the card
      const heading = document.createElement('h1');
      const image = document.createElement('img');
      const gradesHeading = document.createElement('h2');
      const gradesList = document.createElement('ul');

      // Set content for the elements
      heading.textContent = student.name;
      heading.style.width = 'fit-content';
      image.src = student.image;
      image.alt = 'Student Image';
      image.width = window.innerWidth * 0.3;
      image.height = window.innerHeight * 0.4;
      gradesHeading.textContent = 'Grades';

      // Add grades to the list
      Object.keys(student.grades).forEach(subject => {
        const listItem = document.createElement('li');
        const strong = document.createElement('strong');
        const textNode = document.createTextNode(`${subject}: ${student.grades[subject].join(', ')} -> Average: ${calculateAverage(student.grades[subject]).toFixed(2)}`);

        strong.style.fontSize = 'small';
        strong.appendChild(textNode);
        listItem.appendChild(strong);
        gradesList.appendChild(listItem);
      });

      // Add elements to the card
      card.appendChild(heading);

      // Dodaj obsługę dwukrotnego kliknięcia na nagłówek
      heading.style.cursor = 'pointer';
      let isHidden = true;
  
      heading.addEventListener('click', () => {
        if (isHidden) {
          // Dodaj elementy po podwójnym kliknięciu
          card.appendChild(image);
          card.appendChild(gradesHeading);
          card.appendChild(gradesList);
  
          // Ustaw zawartość elementów po podwójnym kliknięciu
          image.src = student.image;
          image.alt = 'Student Image';
          image.width = window.innerWidth * 0.3; // Ustaw stałą szerokość zdjęcia
          image.height = window.innerHeight * 0.4; // Ustaw stałą wysokość zdjęcia
  
          gradesHeading.textContent = 'Grades';
        } else {
          // Wyczyść zawartość po kolejnym podwójnym kliknięciu
          while (card.firstChild) {
            card.removeChild(card.firstChild);
          }
  
          // Dodaj ponownie nagłówek
          card.appendChild(heading);
        }
  
        isHidden = !isHidden;
      });

      gradesList.style.cursor = 'pointer';

      // Add event listener for double-click on gradesList
      gradesList.addEventListener('dblclick', () => {
        editGrades(card, student);
      });

      // Add the card to the main container
      studentsContainer.appendChild(card);
    });
  }
  
  // Funkcja do obliczania średniej ocen
  function calculateAverage(grades) {
    if (grades.length === 0) {
      return 0;
    }
  
    const totalValue = grades.reduce((sum, grade) => sum + grade, 0);
    return totalValue / grades.length;
  }
  
  // Funkcja do edytowania ocen po podwójnym kliknięciu
function editGrades(card, student) {
  // Utwórz okno dialogowe dla każdego przedmiotu w obiekcie studenta
  Object.keys(student.grades).forEach(subject => {
    const gradesString = prompt(`Edit grades for ${subject} (comma-separated):`, student.grades[subject].join(', '));

    // Sprawdź, czy gradesString jest null lub pusty
    if (gradesString !== null && gradesString.trim() !== '') {
      const newGrades = gradesString.split(',').map(grade => parseFloat(grade.trim()));

      // Podziel oceny na prawidłowe i nieprawidłowe
      const validGrades = newGrades.filter(grade => !isNaN(grade) && grade >= 2.0 && grade <= 5.0);
      const invalidGrades = newGrades.filter(grade => isNaN(grade) || grade < 2.0 || grade > 5.0);

      // Wyświetl alert dla nieprawidłowych ocen
      if (invalidGrades.length > 0) {
        alert(`Invalid grades detected. The following grades were ignored: ${invalidGrades.join(', ')}. Please enter valid numbers between 2.0 and 5.0.`);
      }

      // Zaktualizuj zawartość gradesList tylko w przypadku prawidłowych ocen
      if (validGrades.length > 0) {
        // Zaktualizuj oceny w obiekcie studenta dla prawidłowych ocen
        student.grades[subject] = validGrades;

        // Zaktualizuj zawartość gradesList
        updateStudentCardContent(card, student, subject, validGrades);
      }
    } else {
      // Jeśli gradesString jest null lub pusty, wyczyść oceny dla tego przedmiotu
      student.grades[subject] = [];

      // Zaktualizuj zawartość gradesList (przekazując pustą tablicę, aby wyczyścić zawartość)
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
      // Ustaw domyślny kolor tła na biały
      card.style.backgroundColor = 'white';
    }
  } else {
    // Dodaj nowy listItem do gradesList
    const listItemText = `${subject}: ${grades.join(', ')} -> Average: ${calculateAverage(grades).toFixed(2)}`;
    const listItem = document.createElement('li');
    const strong = document.createElement('strong');
    const textNode = document.createTextNode(listItemText);

    // Sprawdź, czy student ma jakiekolwiek oceny
    const studentHasGrades = hasGrades(student);

    // Ustaw kolor tła karty na podstawie ocen
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

// Wywołaj funkcję otwierającą nowe karty przy załadowaniu strony
openStudentCards();