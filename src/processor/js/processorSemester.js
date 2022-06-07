/**/

var semestersCount = 1;

// This event updtae the semesters table.
ipcRenderer.on("GET-SEMESTERS", (event, value) => {
  ipcRenderer.send("status", "Actualizando tabla de Semesters");

  updateSemesterTable();

  ipcRenderer.send("status", "Listo");
});

/**
* This function update the semesters table. It selects the contents of it with
* SQL, and send an event with the table.
*/
function updateSemesterTable() {
  dataBase.all("SELECT * FROM Semester;",
  function (err, table) {
    if (err) {
      return console.error(err.message);
    } else {
      ipcRenderer.send("UPDATE-SEMESTERS", table);
    }
  });
}

// This event add a semester in the database.
ipcRenderer.on("NEW-SEMESTER", (event, value) => {
  ipcRenderer.send("status", "Agregando Semester");

  semestersCount++;

  dataBase.run(
    "INSERT INTO Semester (Numero, Subjects) " +
    "VALUES (" + semestersCount + ", \'{}\');",
    (err) => {
      if (err) {
        return console.error(err.message);
      }
    }
  );

  ipcRenderer.send("status", "Actualizando tabla de Semesters");

  updateSemesterTable();

  ipcRenderer.send("MODIFY");

  ipcRenderer.send("status", "Listo");
});

// This event delete a semester in the database.
ipcRenderer.on("DELETE-SEMESTER", (event, value) => {
  if (semestersCount == 0) {
    return;
  }

  ipcRenderer.send("status", "Agregando Semester");

  dataBase.run(
    "DELETE FROM Semester WHERE Numero=" +
    semestersCount + ";",
    (err) => {
      if (err) {
        return console.error(err.message);
      }
    }
  );

  semestersCount--;

  ipcRenderer.send("status", "Actualizando tabla de Semesters");

  updateSemesterTable();

  ipcRenderer.send("MODIFY");

  ipcRenderer.send("status", "Listo");
});

ipcRenderer.on("ADD-SUBJECTS", (event, value) => {
  ipcRenderer.send("status", "Agregando materias");

  var sqlQuery = "UPDATE Semester SET Subjects=\'" + JSON.stringify(value[1]) +
  "\' WHERE Numero=" + parseInt(value[0]) + ";";

  dataBase.run(sqlQuery,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
    }
  );

  ipcRenderer.send("status", "Actualizando tabla de Semesters");

  updateSemesterTable();

  ipcRenderer.send("MODIFY");

  ipcRenderer.send("status", "Listo");
});

ipcRenderer.on("FIND-SUBJECT", (event, value) => {
  search = "SELECT Code, Name FROM Subjects WHERE " +
  "(Name LIKE \"%" + value +
  "%\" OR Code LIKE \"%" + value + "%\") ";

  dataBase.all(search,
  (err, table) => {
    if (err) {
      return console.error(err.message);
    } else {
      ipcRenderer.send("UPDATE-LEFT-TABLE", table);
    }
  });
});

// This event get all the semesters and its subjects
ipcRenderer.on("GET-SEMESTERS-INFO", (event, value) => {

  dataBase.all("SELECT * FROM Semester;",
  function (err, table) {
    if (err) {
      return console.error(err.message);
    } else {
      ipcRenderer.send("SEND-SEMESTERS-INFO", table);
    }
  });

});
