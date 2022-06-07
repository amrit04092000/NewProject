/**/

/**
* This function close the form.
*/
function closeConfig() {
  ipcRenderer.send("CLOSE-CONFIG");
}

ipcRenderer.send("GET-CONFIG");
