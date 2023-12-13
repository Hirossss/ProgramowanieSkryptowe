const students = [
    {
      image: 'image/studenci.png',
      name: 'Maciej Kot',
      grades: {
        'Matematyka': [4.5, 3.7, 5.0],
        'Fizyka': [4.5, 3.0],
      },
    },
    {
      image: 'image/studenci1.png',
      name: 'Anna Nowak',
      grades: {
        'Matematyka': [4.0, 4.2, 3.8],
        'Fizyka': [3.5, 4.0],
      },
    },
    {
      image: 'image/studenci2.png',
      name: 'Jan Kowalski',
      grades: {
        'Matematyka': [3.9, 4.1, 4.5],
        'Fizyka': [4.2, 3.9],
      },
    },
    // Dodaj inne dane studentów...
  ];
  
  function openStudentTabs() {
    students.forEach(student => {
      const studentTab = window.open('', `_blank`);
      const studentDocument = studentTab.document;
  
      studentDocument.title = student.name;
  
      // Utwórz główny kontener dla informacji o studencie
      const container = studentDocument.createElement('div');
      container.style.margin = '30px';
  
      // Utwórz elementy DOM
      const heading = studentDocument.createElement('h1');
      const image = studentDocument.createElement('img');
      const gradesHeading = studentDocument.createElement('h2');
      const gradesList = studentDocument.createElement('ul');
  
      // Ustaw zawartość elementów
      heading.textContent = student.name;
      heading.style.width = 'fit-content'
      heading
      image.src = student.image;
      image.alt = 'Student Image';
      image.width = window.innerWidth * 0.3; // Ustaw stałą szerokość zdjęcia
      image.height = window.innerHeight * 0.4; // Ustaw stałą wysokość zdjęcia
      gradesHeading.textContent = 'Grades';

      // Dodaj oceny do listy
      Object.keys(student.grades).forEach(subject => {
        const listItem = studentDocument.createElement('li');
        const strong = studentDocument.createElement('strong');
        const textNode = studentDocument.createTextNode(`${subject}: ${student.grades[subject].join(', ')} -> Average: ${calculateAverage(student.grades[subject]).toFixed(2)}`);

        strong.appendChild(textNode);
        listItem.appendChild(strong);
        gradesList.appendChild(listItem);


      });
  
      // Dodaj elementy do głównego kontenera
      container.appendChild(heading);
  
      // Dodaj główny kontener do ciała dokumentu
      studentDocument.body.appendChild(container);
  
      // Dodaj obsługę dwukrotnego kliknięcia na nagłówek
      heading.style.cursor = 'pointer';
      let isHidden = true;
  
      heading.addEventListener('click', () => {
        if (isHidden) {
          // Dodaj elementy po podwójnym kliknięciu
          container.appendChild(image);
          container.appendChild(gradesHeading);
          container.appendChild(gradesList);
  
          // Ustaw zawartość elementów po podwójnym kliknięciu
          image.src = student.image;
          image.alt = 'Student Image';
          image.width = window.innerWidth * 0.3; // Ustaw stałą szerokość zdjęcia
          image.height = window.innerHeight * 0.4; // Ustaw stałą wysokość zdjęcia
  
          gradesHeading.textContent = 'Grades';
        } else {
          // Wyczyść zawartość po kolejnym podwójnym kliknięciu
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
  
          // Dodaj ponownie nagłówek
          container.appendChild(heading);
        }
  
        isHidden = !isHidden;
      });


      gradesList.style.cursor = 'pointer';
      
  
      gradesList.addEventListener('dblclick', () => {
        editGrades(studentTab, student);
      });
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
  
  function editGrades(studentTab, student) {
    // Create a prompt for each subject in the student object
    Object.keys(student.grades).forEach(subject => {
      const gradesString = studentTab.prompt(`Edit grades for ${subject} (comma-separated):`, student.grades[subject].join(', '));
      if (gradesString !== null) {
        const newGrades = gradesString.split(',').map(grade => parseFloat(grade.trim()));
        if (!newGrades.some(isNaN)) {
          // Update the grades in the student object
          student.grades[subject] = newGrades;
        } else {
          alert('Invalid input. Please enter valid numbers.');
        }
      }
    });
  }

// Wywołaj funkcję otwierającą nowe karty przy załadowaniu strony
openStudentTabs();