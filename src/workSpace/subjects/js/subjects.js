/**/

var table = document.getElementById("DATABASE-TABLE");
var obj;

// Activate subject tab tools.
var subjectTools = ["NEW-DB-SUBJECT", "REFRESH-SUBJECT"];
activateButtons(subjectTools);


// Event to update the table whenever is necesary.
ipcRenderer.on("UPDATE-SUBJECTS", (event, value) => {
  // Fill the table headers.
  tableContent = "<thead class=\"palette-wet-asphalt text-light\">" +
  "<tr>" +
  "<th class=\"py-1\" scope=\"col\"></th>" +
  "<th class=\"py-1\" scope=\"col\">Code</th>" +
  "<th class=\"py-1\" scope=\"col\">Name</th>" +
  "<th class=\"py-1\" scope=\"col\">Credits</th>" +
  "<th class=\"py-1\" scope=\"col\">College</th>" +
  "<th class=\"py-1\" scope=\"col\">Place</th>" +
  "<th class=\"py-1\" scope=\"col\">Faculty</th>" +
  "<th class=\"py-1\" scope=\"col\">Department</th>" +
  "<th class=\"py-1\" scope=\"col\">Program</th>" +
  "<th class=\"py-1\" scope=\"col\"></th>" +
  "</tr>" +
  "</thead>";

  // Fill the table content.
  for (var row in value) {
    var entries = value[row];

    tableContent += "<tr>\n" +
    "<td class=\"py-1\"> <input type=\"checkbox\"/> </td>\n" +
    "<td class=\"py-1\">" + entries.Code + "</td>\n" +
    "<td class=\"py-1\">" + entries.Name + "</td>\n" +
    "<td class=\"py-1\">" + entries.Credits + "</td>\n" +
    "<td class=\"py-1\">" + entries.College + "</td>\n" +
    "<td class=\"py-1\">" + entries.Place + "</td>\n" +
    "<td class=\"py-1\">" + entries.Faculty + "</td>\n" +
    "<td class=\"py-1\">" + entries.Department + "</td>\n" +
    "<td class=\"py-1\">" + entries.Program + "</td>\n" +
    "<td class=\"py-1\">" +
    "<img src=\"../../assets/edit-icon.svg\" " +
    "class=\"bg-warning edit-row edit-button pointer\"/> " +
    "</td>\n" +
    "</tr>\n";
  }

  // Update table.
  table.innerHTML = tableContent;

  // Active edit buttons.
  activeEditButtons();
});

/**
* This function delete all the selected rows of the table whenever the delete
* button is clicked.
*/
function deleteItems() {
  var tableItems = table.children[1].children;

  for (var tableItem of tableItems) {
    if (tableItem.children[0].children[0].checked) {
      ipcRenderer.send("DELETE-DB-SUBJECT", tableItem.children[1].innerText);
    }
  }
}

/**
* This function add an event to edit a row of the table whenever the delete
* button is clicked.
*/
function activeEditButtons() {
  // Get all delete buttons of the table.
  var editButtons = document.getElementsByClassName("edit-row");

  // Add an event to the delete buttons.
  for (var button of editButtons) {

    button.addEventListener("click", (event) => {
      var parNode = event.target.parentElement.parentElement.children[1];
      ipcRenderer.send("EDIT-DB-SUBJECT", parNode.innerText);
    });

  }

}

ipcRenderer.send("REFRESH-SUBJECT");
