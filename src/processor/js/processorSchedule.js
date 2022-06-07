/**/

// Event to update the semester timetable in the database.
ipcRenderer.on("TIMETABLE-DB", (event, value) => {
  ipcRenderer.send("status", "Actualizando horario");

  var sqlQuery = "UPDATE Schedule SET Info=\'" + JSON.stringify(value) +
  "\' WHERE id=1;";

  dataBase.run(sqlQuery,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
    }
  );

  updateTimetable();

  ipcRenderer.send("MODIFY");

  ipcRenderer.send("status", "Listo");
});


// Event to update the semester timetable in the window.
ipcRenderer.on("GET-TIMETABLE", (event, value) => {
  ipcRenderer.send("status", "Actualizando horario");

  updateTimetable();

  ipcRenderer.send("status", "Listo");
});

/**
* This function update the timetable table.
*/
function updateTimetable() {
  dataBase.all("SELECT * FROM Schedule;",
  function (err, table) {
    if (err) {
      return console.error(err.message);
    } else {
      ipcRenderer.send("UPDATE-TIMETABLE", table);
    }
  });
}
