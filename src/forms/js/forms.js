/**/

const {ipcRenderer} = require("electron");

/**
* This function close the form.
*/
function closeForm() {
  ipcRenderer.send("CLOSE-FORM");
}
