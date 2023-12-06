let db;

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('USOSdatabase', 1);

    request.onerror = function (event) {
      console.error('Błąd otwarcia bazy danych:', event.target.errorCode);
      reject('Error opening database');
    };

    request.onsuccess = function (event) {
      console.log('Baza danych otwarta pomyślnie');
      db = event.target.result;
      resolve();
    };

    request.onupgradeneeded = function (event) {
      db = event.target.result;

      const subjectsObjectStore = db.createObjectStore('subjects', { keyPath: 'name' });
      const studentsObjectStore = db.createObjectStore('students', { keyPath: 'id', autoIncrement: true });
      const gradesObjectStore = db.createObjectStore('grades', { keyPath: 'id', autoIncrement: true });

      studentsObjectStore.createIndex('name', 'name', { unique: false });
      gradesObjectStore.createIndex('subjectName', 'subjectName', { unique: false });
      gradesObjectStore.createIndex('studentId', 'studentId', { unique: false });

      const mathSubject = { name: 'Math', instructor: 'Dr. Smith' };
      const physicsSubject = { name: 'Physics', instructor: 'Dr. Johnson' };
      const computerScienceSubject = { name: 'Computer Science', instructor: 'Dr. Williams' };

      subjectsObjectStore.add(mathSubject);
      subjectsObjectStore.add(physicsSubject);
      subjectsObjectStore.add(computerScienceSubject);
    };
  });
}

function addGrade(studentName, gradeValue, subjectName) {
    openDatabase().then(() => {
      const transaction = db.transaction(['students', 'subjects', 'grades'], 'readwrite');
      const studentsStore = transaction.objectStore('students');
      const subjectsStore = transaction.objectStore('subjects');
      const gradesStore = transaction.objectStore('grades');
  
      const studentIndex = studentsStore.index('name');
      const getStudent = studentIndex.get(studentName);
  
      getStudent.onsuccess = function (event) {
        const student = event.target.result;
  
        if (student) {
          // Student already exists, proceed to add the grade
          const subjectRequest = subjectsStore.get(subjectName);
  
          subjectRequest.onsuccess = function (event) {
            const subject = event.target.result;
  
            if (subject) {
              const grade = {
                studentId: student.id,
                subjectName: subject.name,
                value: gradeValue,
              };
  
              const addGradeRequest = gradesStore.add(grade);
  
              addGradeRequest.onsuccess = function (event) {
                console.log('Dodano ocenę do bazy danych:', event.target.result);
              };
  
              addGradeRequest.onerror = function (event) {
                console.error('Błąd dodawania oceny:', event.target.errorCode);
              };
            } else {
              console.error('Nie znaleziono przedmiotu o podanej nazwie.');
            }
          };
  
          subjectRequest.onerror = function (event) {
            console.error('Błąd pobierania przedmiotu:', event.target.errorCode);
          };
        } else {
          // Student doesn't exist, add the new student and then add the grade
          const addStudentRequest = studentsStore.add({ name: studentName });
  
          addStudentRequest.onsuccess = function (event) {
            console.log('Dodano nowego studenta do bazy danych:', event.target.result);
            const studentId = event.target.result;
  
            const subjectRequest = subjectsStore.get(subjectName);
  
            subjectRequest.onsuccess = function (event) {
              const subject = event.target.result;
  
              if (subject) {
                const grade = {
                  studentId: studentId,
                  subjectName: subject.name,
                  value: gradeValue,
                };
  
                const addGradeRequest = gradesStore.add(grade);
  
                addGradeRequest.onsuccess = function (event) {
                  console.log('Dodano ocenę do bazy danych:', event.target.result);
                };
  
                addGradeRequest.onerror = function (event) {
                  console.error('Błąd dodawania oceny:', event.target.errorCode);
                };
              } else {
                console.error('Nie znaleziono przedmiotu o podanej nazwie.');
              }
            };
  
            subjectRequest.onerror = function (event) {
              console.error('Błąd pobierania przedmiotu:', event.target.errorCode);
            };
          };
  
          addStudentRequest.onerror = function (event) {
            console.error('Błąd dodawania nowego studenta:', event.target.errorCode);
          };
        }
      };
  
      getStudent.onerror = function (event) {
        console.error('Błąd pobierania studenta:', event.target.errorCode);
      };
    }).catch((error) => {
      console.error(error);
    });
}
  

function displayStudent(studentName) {
  openDatabase().then(() => {
    const transaction = db.transaction(['students', 'grades'], 'readonly');
    const studentsStore = transaction.objectStore('students');
    const gradesStore = transaction.objectStore('grades');

    const studentIndex = studentsStore.index('name');
    const studentRequest = studentIndex.get(studentName);

    studentRequest.onsuccess = function (event) {
      const student = event.target.result;

      if (student) {
        const gradesIndex = gradesStore.index('studentId');
        const gradesRequest = gradesIndex.getAll(student.id);

        gradesRequest.onsuccess = function (event) {
          const studentGrades = event.target.result;
          console.group('Oceny studenta', student.name);
          studentGrades.forEach((grade) => {
            console.log('Przedmiot:', grade.subjectName, 'Ocena:', grade.value);
          });
          console.groupEnd();
        };
      } else {
        console.error('Nie znaleziono studenta o podanym imieniu.');
      }
    };

    studentRequest.onerror = function (event) {
      console.error('Błąd pobierania studenta:', event.target.errorCode);
    };
  }).catch((error) => {
    console.error(error);
  });
}


function displaySubject(subjectName) {
    openDatabase().then(() => {
        const transaction = db.transaction(['subjects', 'grades', 'students'], 'readonly');
        const subjectsStore = transaction.objectStore('subjects');
        const gradesStore = transaction.objectStore('grades');
        const studentsStore = transaction.objectStore('students');
    
        const subjectRequest = subjectsStore.get(subjectName);
    
        subjectRequest.onsuccess = function (event) {
        const subject = event.target.result;
    
        if (subject) {
            const studentsIndex = studentsStore.index('id');
            const gradesIndex = gradesStore.index('subjectName');
    
            const studentsRequest = studentsIndex.getAll();
            const gradesRequest = gradesIndex.getAll(subject.name);
    
            studentsRequest.onsuccess = function (event) {
            const allStudents = event.target.result;
            console.group('Oceny przedmiotu', subject.name, 'Prowadzący:', subject.instructor);
            allStudents.forEach((student) => {
                const studentGrades = gradesRequest.result.filter((grade) => grade.studentId === student.id);
                console.group('Student:', student.name);
                studentGrades.forEach((grade) => {
                console.log('Ocena:', grade.value);
                });
                console.groupEnd();
            });
            console.groupEnd();
            };
        } else {
            console.error('Nie znaleziono przedmiotu o podanej nazwie.');
        }
        };
    });
}

addGrade('John Doe', 4.5, 'Math');
addGrade('John Doe', 3.5, 'Physics');
displayStudent('John Doe');
