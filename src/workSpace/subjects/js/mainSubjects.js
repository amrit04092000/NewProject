/**/

const electron = require("electron");
const {app, BrowserWindow, ipcMain, dialog} = electron;
const path = require("path");
const url = require("url");

// This event create a new window to add a new subject to the database.
ipcMain.on("NEW-DB-SUBJECT", (event, value) => {
  if (formOpened) {
    return;
  }

  formOpened = true;

  workSpaceWindow.send("status", "New Subject");

  formWindow = new BrowserWindow({
    parent: workSpaceWindow,
    width: 350,
    height: 600,
    resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the form.
  formWindow.loadURL(url.format({
    pathname: path.join(srcPath, "forms/newDbSubject/index.html"),
    protocol: "file:",
    slashes: true
  }));

  formWindow.on("close",  () => {
    formOpened = false;
    formWindow = null;
    workSpaceWindow.send("status", "Listo");
  });
});

// This event delete a subject in the database.
ipcMain.on("DELETE-DB-SUBJECT", (event, value) => {
  processor.send("DELETE-DB-SUBJECT", value);
});

// This event delete a subject in the database.
ipcMain.on("EDIT-DB-SUBJECT", (event, value) => {

  if (formOpened) {
    return;
  }

  formOpened = true;

  editingSubject = value;;

  workSpaceWindow.send("status", "Editando materia");

  formWindow = new BrowserWindow({
    width: 350,
    height: 600,
    resizable: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the form.
  formWindow.loadURL(url.format({
    pathname: path.join(srcPath, "forms/newDbSubject/index.html"),
    protocol: "file:",
    slashes: true
  }));

  formWindow.on("close",  () => {
    formOpened = false;
    formWindow = null;
    editingSubject = "";

    workSpaceWindow.send("status", "Listo");
  });

});

// This event will create a new subject to the database.
ipcMain.on("NEW-DB-SUBJECT-CREATED", (event, value) => {
  formWindow.close();
  processor.send("NEW-DB-SUBJECT-CREATED", value);
});

// This event will edit an old subject in the database.
ipcMain.on("OLD-DB-SUBJECT-EDITED", (event, value) => {
  var oldId = editingSubject;

  formWindow.close();

  processor.send("OLD-DB-SUBJECT-EDITED", [value, oldId]);
});

ipcMain.on("SEARCH-SUBJECT", (event, value) => {
  processor.send("SEARCH-SUBJECT", value);
});

// This event will update the database in the table of the subject database.
ipcMain.on("REFRESH-SUBJECT", (event, value) => {
  processor.send("REFRESH-SUBJECT", value);
});

// This event will update the database in the table of the subject database.
ipcMain.on("UPDATE-SUBJECTS", (event, value) => {
  workSpaceWindow.send("UPDATE-SUBJECTS", value);
});
