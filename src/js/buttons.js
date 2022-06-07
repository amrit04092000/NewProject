/**/

const {ipcRenderer} = require("electron");

function activateButtons(buttonsList) {
  for (var button of buttonsList) {
    ((action) => {
      document.getElementById(action).addEventListener("click",
      (event) => {
        ipcRenderer.send(action, null);
      });
    })(button);
  }
}
