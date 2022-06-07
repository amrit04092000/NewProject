/**/

const electron = require("electron");
const {app, BrowserWindow, ipcMain, dialog} = electron;
const fs = require("fs-extra");

ipcMain.on("CLOSE-CONFIG", (event, value) => {
  configWindow.close();
});

ipcMain.on("GET-CONFIG", (event, value) => {

  // Read the configuration file.
  fs.readJson(configFile, (err, configObj) => {
    if (err) {
      throw err;
    }

    configWindow.send("CONFIG-OBJ", configObj);
  });

});

ipcMain.on("UPDATE-COLORS", (event, value) => {

  // Read the configuration file.
  fs.readJson(configFile, (err, configObj) => {
    if (err) {
      throw err;
    }

    configObj.colorMesh = value[0];
    configObj.colorsTimetable = value[1];


    fs.writeJsonSync(configFile,
      configObj,
      {
        "spaces": "\t",
        "EOL": "\n"
      },
      (wErr) => {

      if (wErr) {
        throw wErr;
      }

    });

  });

});

ipcMain.on("UPDATE-TEXT", (event, value) => {

  // Read the configuration file.
  fs.readJson(configFile, (err, configObj) => {
    if (err) {
      throw err;
    }

    configObj.textMesh = value;

    fs.writeJsonSync(configFile, configObj, {"spaces": "\t", "EOL": "\n"},
    (wErr) => {

      if (wErr) {
        throw wErr;
      }

    });

  });

});

ipcMain.on("UPDATE-DEFAULTS", (event, value) => {

  // Read the configuration file.
  fs.readJson(configFile, (err, configObj) => {
    if (err) {
      throw err;
    }

    configObj.defaultsNewSubject = value.defaultsNewSubject;

    fs.writeJsonSync(configFile, configObj, {"spaces": "\t", "EOL": "\n"},
    (wErr) => {

      if (wErr) {
        throw wErr;
      }

    });

  });

});
