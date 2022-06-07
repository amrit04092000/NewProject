/**/

const electron = require("electron");
const {ipcMain, dialog} = electron;
const fs = require("fs-extra");
const path = require("path");
const url = require("url");

// Modify flag.
var modify = false;

// Close button.
ipcMain.on("CLOSE", (event, value) => {

  if (modify) {
    var buttonClicked = dialog.showMessageBoxSync({
      title: "Unsaved Changes",
      type: "question",
      buttons: ["Cancel", "Do Not Save", "Save"],
      message: "Sure you want to continue, unsaved changes will be lost"
    });

    if (buttonClicked == 0) {
      return;
    } else if (buttonClicked == 2 ) {
      if(saveDataBase()) {
        return;
      }
    } else {
      modify = false;
    }

  }

  processor.send("CLOSE-CONNECTION", [tempDir, false]);

  workSpaceWindow.close();
});

// Maixmize-minimize button.
ipcMain.on("MAXIMIZE", (event, value) => {
  if (workSpaceWindow.isMaximized()) {

    workSpaceWindow.unmaximize();
    workSpaceWindow.send("UNMAXIMIZE");

  } else {

    workSpaceWindow.maximize();
    workSpaceWindow.send("MAXIMIZE");

  }
});

// Iconize button.
ipcMain.on("ICONIZE", (event, value) => {
  workSpaceWindow.minimize();
});

// This event open a database.
ipcMain.on("FILE-NEW", (event, value) => {

  if (modify) {
    var buttonClicked = dialog.showMessageBoxSync({
      title: "Unsaved Changes",
      type: "question",
      buttons: ["Cancel", "Do Not Save", "Save"],
      message: "Sure you want to continue, the changes made will be lost."
    });

    if (buttonClicked == 0) {
      return;
    } else if (buttonClicked == 2 ) {
      if(saveDataBase()) {
        return;
      }
    } else {
      modify = false;
    }

  }

  processor.send("CLOSE-CONNECTION", [tempDir, true]);
});

// This event open a database.
ipcMain.on("FILE-OPEN", (event, value) => {

  if (modify) {
    var buttonClicked = dialog.showMessageBoxSync({
      title: "Unsaved Changes",
      type: "question",
      buttons: ["Cancel", "Do Not Save", "Save"],
      message: "Sure you want to continue, the changes made will be lost."
    });

    if (buttonClicked == 0) {
      return;
    } else if (buttonClicked == 2 ) {
      if(saveDataBase()) {
        return;
      }
    } else {
      modify = false;
    }

  }

  dialog.showOpenDialog({
    title: "Load Schedule",
    multiSelections: false,
    propertries: [
      "openFile"
    ]
  }).then( result => {
    if(!result.canceled) {
      fileName = result.filePaths[0];

      processor.send("OPEN", [tempDir, fileName]);

      welcomeWin.hide();
    }
  }).catch( err => {
    console.log(err);
  });

});

// This event save the database.
ipcMain.on("FILE-SAVE", (event, value) => {
  saveDataBase();
});

ipcMain.on("MODIFY", (event, value) => {
  modify = true;
});


/**
* This function save the database.
*/
function saveDataBase() {

  if (fileName == "") {
    var result = dialog.showSaveDialogSync({
      title: "Save Data",
      filters: [
        {name: "Sub", extensions: ["sub"]}
      ],
      properties: [
        "createDirectory",
        "showOverwriteConfirmation"
      ]
    });

    if(result) {
      fileName = result;

      if (fileName.substring(fileName.length-4) != ".sub") {
        fileName += ".sub";
      }

      processor.send("FILE-SAVE", [tempDir, fileName]);
      modify = false;
      return false;

    } else {
      return true;
    }

  } else {
    processor.send("FILE-SAVE", [tempDir, fileName]);
    modify = false;
    return false;
  }

}
