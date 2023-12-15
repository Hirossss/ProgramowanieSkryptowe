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
  
  function openStudentTabs() {
    students.forEach(student => {
      const studentTab = window.open('', `_blank`);
      const studentDocument = studentTab.document;
  
      studentDocument.title = student.name;
  
      // Utwórz główny kontener dla informacji o studencie
      const container = studentDocument.createElement('div');
      container.style.margin = '30px';

      // Sprawdź czy istnieją oceny dla danego ucznia
      const studentHasGrades = hasGrades(student);

      // Ustaw tło strony na szare, jeśli nie ma ocen
      if (!studentHasGrades) {
        studentDocument.body.style.backgroundColor = 'gray';
      }
  
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
  
          // Ustaw zawartość elementów po kliknięciu
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
  
      // Check if gradesString is null or empty
      if (gradesString !== null && gradesString.trim() !== '') {
        const newGrades = gradesString.split(',').map(grade => parseFloat(grade.trim()));
  
        // Separate valid and invalid grades
        const validGrades = newGrades.filter(grade => !isNaN(grade) && grade >= 2.0 && grade <= 5.0);
        const invalidGrades = newGrades.filter(grade => isNaN(grade) || grade < 2.0 || grade > 5.0);
  
        // Display alert for invalid grades
        if (invalidGrades.length > 0) {
          studentTab.alert(`Invalid grades detected. The following grades were ignored: ${invalidGrades.join(', ')}. Please enter valid numbers between 2.0 and 5.0.`);
        }
  
        // Update the content of gradesList only if there are valid grades
        if (validGrades.length > 0) {
          // Update the grades in the student object for valid grades
          student.grades[subject] = validGrades;
  
          // Update the content of gradesList
          updateStudentTabContent(studentTab.document, student, subject, validGrades);
        }
      } else {
        // If gradesString is null or empty, clear the grades for that subject
        student.grades[subject] = [];
  
        // Update the content of gradesList (passing an empty array to clear the content)
        updateStudentTabContent(studentTab.document, student, subject, []);
      }
    });
  }
  
  function updateStudentTabContent(studentDocument, student, subject, grades) {
    // Find the container and gradesList
    const container = studentDocument.querySelector('div');
    const gradesList = container.querySelector('ul');

    // Check if the listItem for the subject already exists
    const existingListItem = Array.from(gradesList.children).find(child => child.textContent.includes(subject));
  
    if (existingListItem) {
      // Replace existing listItem with updated content
      const listItemText = `${subject}: ${grades.join(', ')} -> Average: ${calculateAverage(grades).toFixed(2)}`;
      const strong = existingListItem.querySelector('strong');
      strong.textContent = listItemText;
      
      // Check if the student has any grades
      const studentHasGrades = hasGrades(student);
      // Ustaw tło strony na szare, jeśli nie ma ocen
      if (!studentHasGrades) {
        studentDocument.body.style.backgroundColor = 'gray';
      } else {
        // Set default background color to white
        studentDocument.body.style.backgroundColor = 'white';
      }
       
     
    } else {
      // Add the new listItem to gradesList
      const listItemText = `${subject}: ${grades.join(', ')} -> Average: ${calculateAverage(grades).toFixed(2)}`;
      const listItem = studentDocument.createElement('li');
      const strong = studentDocument.createElement('strong');
      const textNode = studentDocument.createTextNode(listItemText);

      // Check if the student has any grades
      const studentHasGrades = hasGrades(student);

      // Set background color to gray if there are no grades
      if (!studentHasGrades) {
        studentDocument.body.style.backgroundColor = 'gray';
      } else {
        // Set default background color to white
        studentDocument.body.style.backgroundColor = 'white';
      }
  
      strong.appendChild(textNode);
      listItem.appendChild(strong);
      gradesList.appendChild(listItem);
    }
  }

// Wywołaj funkcję otwierającą nowe karty przy załadowaniu strony
openStudentTabs();