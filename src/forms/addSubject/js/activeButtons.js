/**/

// Tables.
var leftTable = document.getElementById("LEFT-TABLE");
var rightTable = document.getElementById("RIGHT-TABLE");

//
var subjectsAdded = {};

/**
* This function search the subjects by the name or code.
*/
function activeAddButtons() {
  var addButtons = document.getElementsByClassName("add-row");

  for (var button of addButtons) {
    button.addEventListener("click", (event) => {
      var parNode = event.target.parentElement.parentElement;

      var code = parNode.children[0].innerText;
      var name = parNode.children[1].innerText;

      subjectsAdded[code] = name;

      updateRightTable(subjectsAdded);
    });
  }
}

/**
* This function search the subjects by the name or code.
*/
function activeRemoveButtons() {
  var addButtons = document.getElementsByClassName("delete-row");

  for (var button of addButtons) {
    button.addEventListener("click", (event) => {
      var parNode = event.target.parentElement.parentElement;

      var code = parNode.children[0].innerText;

      delete subjectsAdded[code];

      updateRightTable(subjectsAdded);
    });
  }
}

ipcRenderer.send("FIND-SUBJECT", "");
