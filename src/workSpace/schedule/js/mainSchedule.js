/**/

const electron = require("electron");
const {app, BrowserWindow, ipcMain, dialog} = electron;
const fs = require("fs-extra");
const path = require("path");
const url = require("url");

// This event create a new window to add a new subject to the database.
ipcMain.on("ADD-SEMESTER", (event, value) => {
  if (formOpened) {
    return;
  }

  formOpened = true;

  workSpaceWindow.send("status", "Agregando Semester");

  formWindow = new BrowserWindow({
    parent: workSpaceWindow,
    width: 800,
    height: 600,
    resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the form.
  formWindow.loadURL(url.format({
    pathname: path.join(srcPath, "forms/addSemesterSchedule/index.html"),
    protocol: "file:",
    slashes: true
  }));

  formWindow.on("close",  () => {
    formOpened = false;
    formWindow = null;
    workSpaceWindow.send("status", "Listo");
  });
});

// This event will update the timetable.
ipcMain.on("GET-TIMETABLE", (event, value) => {
  processor.send("GET-TIMETABLE");
});

// This event will add the timetable.
ipcMain.on("UPDATE-TIMETABLE", (event, value) => {

  // Read the configuration file.
  fs.readJson(configFile, (err, configObj) => {
    if (err) {
      throw err;
    }

    workSpaceWindow.send("UPDATE-TIMETABLE", [configObj.colorsTimetable, value]);
  });

});
