/**/

const {ipcRenderer} = require("electron");
const sqlite = require("sqlite3");
const path = require("path");
const fs = require("fs-extra");

// Variable of the subject database.
var dataBase;

// Create a new database in the temporal directory whenever the "NEW" button is
// clicked.
ipcRenderer.on("NEW", (event, value) => {
  semestersCount = 1;

  // Send an event to update the status bar.
  ipcRenderer.send("status", "Cargando base de datos");

  connectDatabase(path.join(value, "u_stair/temp.db"));

  dataBase.run("PRAGMA foreign_keys=ON;");

  // Create the subjects table and update table if it success.
  dataBase.run(
    fs.readFileSync(path.join(__dirname,"../sql/subjects.sql")).toString(),
    (err) => {
      if (err) {
        return console.error(err);
      } else {
        updateSubjectsTable();
      }
    }
  );

  // Create the subjects table and update table if it success.
  dataBase.run(
    fs.readFileSync(path.join(__dirname,"../sql/semester.sql")).toString(),
    (err) => {
      if (err) {
        return console.error(err);
      } else {

        dataBase.run(
          "INSERT INTO Semester (Numero, Subjects) " +
          "VALUES (1, \'{}\');",
          (err) => {
            if (err) {
              return console.error(err);
            } else {
              updateSemesterTable();
            }
          }
        );

      }
    }
  );

  // Create the subjects table and update table if it success.
  dataBase.run(
    fs.readFileSync(path.join(__dirname,"../sql/timetable.sql")).toString(),
    (err) => {
      if (err) {
        return console.error(err);
      } else {

        dataBase.run(
          "INSERT INTO Schedule (id, Info) " +
          "VALUES (1, \'{}\');",
          (err) => {
            if (err) {
              return console.error(err);
            } else {
              updateTimetable();
            }
          }
        );

      }
    }
  );

  // Send an event to update the status bar,
  ipcRenderer.send("status", "Listo");
});

// This event open the given database.
ipcRenderer.on("OPEN", (event, value) => {
  // Send an event to update the status bar.
  ipcRenderer.send("status", "Cargando base de datos");

  fs.copyFile(value[1], path.join(value[0], "u_stair/temp.db"), (err) => {
    if (err) {
      return console.error(err);
    }
  });

  connectDatabase(path.join(value[0], "u_stair/temp.db"));

  dataBase.all("SELECT * FROM Semester",
  (err, table) => {
    semestersCount = table.length;
  });

  ipcRenderer.send("status", "Actualizando tabla de materias");
  updateSubjectsTable();

  ipcRenderer.send("status", "Actualizando tabla de Semesters");
  updateSemesterTable();

  ipcRenderer.send("status", "Actualizando horario");
  updateTimetable();

  ipcRenderer.send("status", "Listo");
});

// This event close the connection to the database.
ipcRenderer.on("CLOSE-CONNECTION", (event, value) => {

  closeConnection(value);

});

// This event save the database in the path that the user specify.
ipcRenderer.on("FILE-SAVE", (event, value) => {
  ipcRenderer.send("status", "Guardando");

  fs.copyFile(path.join(value[0], "u_stair/temp.db"), value[1], (err) => {
    if (err) {
      return console.error(err);
    }
  });

  ipcRenderer.send("status", "Listo");
});


/**
* This function connect to the database.
*/
function connectDatabase(databasePath) {
  // Create the database in the temporal directory and connect.
  dataBase = new sqlite.Database(databasePath,
    (err) => {
      if (err) {
        return console.error(err);
      } else {
        console.log("Connected to database");
      }
    }
  );
}

/**
* This function close the connection to the database
*/
function closeConnection(params) {

  if (dataBase) {
    dataBase.close((err) => {
      if (err) {
        return console.error(err);
      }

      deleteDatabase(params[0]);

      if (params[1]) {
        ipcRenderer.send("NEW");
      }

      console.log("Disconnected to database");

    });

}

/**
* This function remove the database
*/
function deleteDatabase(tempDir) {

    fs.removeSync(path.join(tempDir, "u_stair/temp.db"), {}, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

}
