/**/

const electron = require("electron");
const {app, BrowserWindow, ipcMain, dialog} = electron;
const fs = require("fs-extra");
const path = require("path");
const url = require("url");

var semesterInfo;

// This event get all the semesters in the database.
ipcMain.on("GET-SEMESTERS", (event, value) => {
  processor.send("GET-SEMESTERS", value);
});

// This event will update the table of semesters.
ipcMain.on("UPDATE-SEMESTERS", (event, value) => {

  // Read the configuration file.
  fs.readJson(configFile, (err, configObj) => {
    if (err) {
      throw err;
    }

    workSpaceWindow.send("UPDATE-SEMESTERS", [configObj, value]);
  });

});

// This event add a semester in the database.
ipcMain.on("NEW-SEMESTER", (event, value) => {
  processor.send("NEW-SEMESTER", value);
});

// This event delete a semester in the database.
ipcMain.on("DELETE-SEMESTER", (event, value) => {
  processor.send("DELETE-SEMESTER", value);
});

// This event add a subject in a semester.
ipcMain.on("NEW-SEMESTER-SUBJECT", (event, value) => {
  if (formOpened) {
    return;
  }

  formOpened = true;

  semesterInfo = value;

  workSpaceWindow.send("status", "Configurando Semester");

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
    pathname: path.join(srcPath, "forms/addSubject/index.html"),
    protocol: "file:",
    slashes: true
  }));

  formWindow.on("close",  () => {
    formOpened = false;
    formWindow = null;
    workSpaceWindow.send("status", "Listo");
  });
  // processor.send("NEW-SEMESTER-SUBJECT", value);
});

// This event search the subjects by the name or code.
ipcMain.on("FIND-SUBJECT", (event, value) => {
  processor.send("FIND-SUBJECT", value);
});

// This event refresh the left table of the form.
ipcMain.on("UPDATE-LEFT-TABLE", (event, value) => {
  formWindow.send("UPDATE-LEFT-TABLE", value);
});

ipcMain.on("GET-SEMESTER-INFO", (event, value) => {
  formWindow.send("SET-SEMESTER", semesterInfo[0]);
  formWindow.send("UPDATE-RIGHT-TABLE", semesterInfo[1]);
});

ipcMain.on("ADD-SUBJECTS", (event, value) => {
  formWindow.close();
  processor.send("ADD-SUBJECTS", value);
});
