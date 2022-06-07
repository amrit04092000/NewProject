/**/

// Variable of the status bar.
var statusBar = document.getElementById("status-bar");

// Event to update the estatus bar.
ipcRenderer.on("status", (event, value) => {
  statusBar.innerText = value;
});

// Window buttons
var winButtons = ["ICONIZE", "MAXIMIZE", "CLOSE"];

// Tool bar icons
var tools = ["FILE-NEW", "FILE-OPEN", "FILE-SAVE"];

// Add events for all buttons.
activateButtons(winButtons);
activateButtons(tools);

// Maximize button
maximizeIcon = document.getElementById("MAXIMIZE").children[0];

ipcRenderer.on("MAXIMIZE", (event, value) => {
  maximizeIcon.classList.remove("fui-window");
  maximizeIcon.classList.add("fui-windows");
});

ipcRenderer.on("UNMAXIMIZE", (event, value) => {
  maximizeIcon.classList.add("fui-window");
  maximizeIcon.classList.remove("fui-windows");
});
