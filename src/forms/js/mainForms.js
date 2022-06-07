/**/

const electron = require("electron");
const {app, BrowserWindow, ipcMain, dialog} = electron;
const fs = require("fs-extra");

// This event will close the form.
ipcMain.on("CLOSE-FORM", (event, value) => {
  formWindow.close();
  workSpaceWindow.send("status", "Listo");
});

// This event search for a subject.
ipcMain.on("SEARCH-DB-SUBJECT", (event, value) => {

  if (editingSubject){
    processor.send("SEARCH-DB-SUBJECT", editingSubject);
  } else {

    // Read the configuration file.
    fs.readJson(configFile, (err, configObj) => {
      if (err) {
        throw err;
      }

      formWindow.send("FILL-SPACES", [configObj.defaultsNewSubject, false]);

    });

  }

});

// This event fill the spaces in the form.
ipcMain.on("FILL-SPACES", (event, value) => {

  formWindow.send("FILL-SPACES", value.concat(true));

});

// This event get all the semesters and its subjects
ipcMain.on("GET-SEMESTERS-INFO", (event, value) => {
  processor.send("GET-SEMESTERS-INFO");

});

// This event send all the semesters and its subjects
ipcMain.on("SEND-SEMESTERS-INFO", (event, value) => {

  formWindow.send("SEND-SEMESTERS-INFO", value);

});

// This event update the schedule
ipcMain.on("TIMETABLE-DB", (event, value) => {
  formWindow.close();
  processor.send("TIMETABLE-DB", value);
});
