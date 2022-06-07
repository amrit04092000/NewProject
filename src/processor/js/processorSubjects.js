/**/

// Actual table
var subjectsTable = null;
var actualFilter = {"programa": ""};

// Event to create a new row in the subjects table.
ipcRenderer.on("NEW-DB-SUBJECT-CREATED", (event, value) => {
  ipcRenderer.send("status", "Agregando materia");

  // Add the new row, and update the table if the window if it success.
  dataBase.run(
    "INSERT INTO Subjects " +
    "(Code, Name, Credits, College, Place," +
    " Faculty, Department, Program) " +
    "VALUES (".concat(value) + ");",
    function (err) {
      if (err) {
        return console.error(err.message);
      } else{
        updateSubjectsTable();
      }
    }
  );

  ipcRenderer.send("MODIFY");

  ipcRenderer.send("status", "Listo");
});

// Event to edit an old row in the subjects table.
ipcRenderer.on("OLD-DB-SUBJECT-EDITED", (event, value) => {
  ipcRenderer.send("status", "Agregando materia");

  var sqlQuery = "UPDATE Subjects SET Code=\""+ value[0][0] +
  "\", Name=\"" + value[0][1] +
  "\", Credits=" + value[0][2] +
  ", College=\"" + value[0][3] +
  "\", Place=\"" + value[0][4] +
  "\", Faculty=\"" + value[0][5] +
  "\", Department=\"" + value[0][6] +
  "\", Program=\"" + value[0][7] + "\" WHERE Code=\"" + value[1] + "\";";

  // Add the new row, and update the table if the window if it success.
  dataBase.run(sqlQuery,
    function (err) {
      if (err) {
        return console.error(err.message);
      } else{
        updateSubjectsTable();
      }
    }
  );

  ipcRenderer.send("MODIFY");

  ipcRenderer.send("status", "Listo");
});

// This event delete a subject in the database.
ipcRenderer.on("DELETE-DB-SUBJECT", (event, value) => {
  ipcRenderer.send("status", "Eliminando materia");

  dataBase.run(
    "DELETE FROM Subjects WHERE Code=\"".concat(value) + "\";",
    function (err) {
      if (err) {
        return console.error(err.message);
      } else{
        updateFilteredSubjectsTable(actualFilter);
      }
    }
  );

  ipcRenderer.send("MODIFY");

  ipcRenderer.send("status", "Listo");
});

// This event delete a subject in the database.
ipcRenderer.on("SEARCH-SUBJECT", (event, value) => {
  ipcRenderer.send("status", "Buscando materias");

  actualFilter = value;
  updateFilteredSubjectsTable(actualFilter);

  ipcRenderer.send("status", "Listo");
});

// This event delete a subject in the database.
ipcRenderer.on("REFRESH-SUBJECT", (event, value) => {
  ipcRenderer.send("status", "Actualizando tabla de materias");

  updateSubjectsTable();

  ipcRenderer.send("status", "Listo");
});

// This event search a subject in the database.
ipcRenderer.on("SEARCH-DB-SUBJECT", (event, value) => {
  dataBase.all("SELECT * FROM Subjects WHERE Code=\"" + value + "\";",
  function (err, table) {
    if (err) {
      return console.error(err.message);
    } else {
      ipcRenderer.send("FILL-SPACES", table);
    }
  });

});

/**
* This function update the subjects table. It selects the contents of it with
* SQL, and send an event with the table.
*/
function updateSubjectsTable() {

  dataBase.all("SELECT * FROM Subjects;",
  function (err, table) {
    if (err) {
      return console.error(err.message);
    } else {
      subjectsTable = table;
      ipcRenderer.send("UPDATE-SUBJECTS", subjectsTable);
    }
  });

}

/**
* This Function search filtered data
*/
function updateFilteredSubjectsTable(filters) {
  var search = "SELECT * FROM Subjects WHERE ";
  var prev = false;

  if (filters.materia){
    search += "(Name LIKE \"%" + filters.materia +
    "%\" OR Code LIKE \"%" + filters.materia + "%\") ";
    prev = true;
  }

  if (filters.College){
    search += joinPrev(prev);
    search += "College LIKE \"%" + filters.College + "%\" ";
    prev = true;
  }

  if (filters.sede){
    search += joinPrev(prev);
    search += "Place LIKE \"%" + filters.sede + "%\" ";
    prev = true;
  }

  if (filters.facultad){
    search += joinPrev(prev);
    search += "Faculty LIKE \"%" + filters.facultad + "%\" ";
    prev = true;
  }

  if (filters.departamento){
    search += joinPrev(prev);
    search += "Department LIKE \"%" + filters.departamento + "%\" ";
    prev = true;
  }

  search += joinPrev(prev);
  search += "Program LIKE \"%" + filters.programa + "%\" ";
  prev = true;

  if (filters.creditos){
    search += joinPrev(prev);
    search += "Credits=\"" + filters.creditos + "\" ";
  }

  search += ";";

  dataBase.all(search,
  function (err, table) {
    if (err) {
      return console.error(err.message);
    } else {
      subjectsTable = table;
      ipcRenderer.send("UPDATE-SUBJECTS", subjectsTable);
    }
  });
}

/**
* This function check if there is a previous search parameter.
*/
function joinPrev(prev) {
  if (prev) {
    return "AND ";
  } else {
    return "";
  }
}
