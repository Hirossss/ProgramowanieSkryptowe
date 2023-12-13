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
      const studentTab = window.open('',`_blank`);
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
      const averageList = studentDocument.createElement('ul');
  
      // Ustaw zawartość elementów
      heading.textContent = student.name;
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
      heading.addEventListener('dblclick', () => {
        // Dodaj elementy po podwójnym kliknięciu
        container.appendChild(image);
        container.appendChild(gradesHeading);
        container.appendChild(gradesList);
        container.appendChild(averageList);

        // Ustaw zawartość elementów po podwójnym kliknięciu
        image.src = student.image;
        image.alt = 'Student Image';
        image.width = window.innerWidth * 0.3; // Ustaw stałą szerokość zdjęcia
        image.height = window.innerHeight * 0.4; // Ustaw stałą wysokość zdjęcia

        gradesHeading.textContent = 'Grades';
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
  
  // Wywołaj funkcję otwierającą nowe karty przy załadowaniu strony
  openStudentTabs();


/*
TO DO:
- obsluga bledow typu window.alert()
*/