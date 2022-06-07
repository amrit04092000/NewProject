/**/

// Searcher.
var searchBar = document.getElementById("materia");

// Semester variables.
var semester;
var subjects;

ipcRenderer.on("SET-SEMESTER", (event, value) => {
  semester = value;
});

ipcRenderer.on("UPDATE-RIGHT-TABLE", (event, value) => {
  subjectsAdded = value;
  updateRightTable(subjectsAdded);
});


ipcRenderer.on("UPDATE-LEFT-TABLE", (event, value) => {
  var tableHTML = "<thead class=\"palette-wet-asphalt text-light\">" +
  "<tr>" +
  "<th class=\"py-1\" scope=\"col\">Code</th>" +
  "<th class=\"py-1\" scope=\"col\">Name</th>" +
  "<th class=\"py-1\" scope=\"col\"></th>" +
  "</tr>" +
  "</thead>";

  for (var row in value) {
    var entries = value[row];

    tableHTML += "<tr>\n" +
    "<td class=\"py-1\">" + entries.Code + "</td>\n" +
    "<td class=\"py-1\">" + entries.Name + "</td>\n" +
    "<td class=\"py-1\">" +
    "<img src=\"../../assets/plus-icon.svg\" " +
    "class=\"bg-success add-row pointer p-1\" style=\"width: 20px;\"/> " +
    "</td>\n" +
    "</tr>\n";
  }

  leftTable.innerHTML = tableHTML;

  activeAddButtons();
});


/**
* This function update the right table.
*/
function updateRightTable(subjects) {
  var tableHTML = "<thead class=\"palette-wet-asphalt text-light\">" +
  "<tr>" +
  "<th class=\"py-1\" scope=\"col\">Code</th>" +
  "<th class=\"py-1\" scope=\"col\">Name</th>" +
  "<th class=\"py-1\" scope=\"col\"></th>" +
  "</tr>" +
  "</thead>";

  for (var subject in subjects) {
    tableHTML += "<tr>\n" +
    "<td class=\"py-1\">" + subject + "</td>\n" +
    "<td class=\"py-1\">" + subjects[subject] + "</td>\n" +
    "<td class=\"py-1\">" +
    "<img src=\"../../assets/minus-icon.svg\" " +
    "class=\"bg-danger delete-row pointer p-1\" style=\"width: 20px;\"/> " +
    "</td>\n" +
    "</tr>\n";
  }

  rightTable.innerHTML = tableHTML;

  activeRemoveButtons();
}

/**
* This function search the subjects by the name or code.
*/
function searchSubjects() {
  ipcRenderer.send("FIND-SUBJECT", searchBar.value);
}

/**
* This Fucntion close the form and send the information.
*/
function completeSemester() {
  ipcRenderer.send("ADD-SUBJECTS", [semester, subjectsAdded]);
}


ipcRenderer.send("FIND-SUBJECT", "");
ipcRenderer.send("GET-SEMESTER-INFO");
