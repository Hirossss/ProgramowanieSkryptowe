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
      image.width = 250; // Ustaw stałą szerokość zdjęcia
      image.height = 250; // Ustaw stałą wysokość zdjęcia
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
  
      // Dodaj elementy do ciała dokumentu
      studentDocument.body.appendChild(heading);
      studentDocument.body.appendChild(image);
      studentDocument.body.appendChild(gradesHeading);
      studentDocument.body.appendChild(gradesList);
      studentDocument.body.appendChild(averageList);
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