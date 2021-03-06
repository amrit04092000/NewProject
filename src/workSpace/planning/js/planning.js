/**/

var semesters;
var semestersTable = document.getElementById("semesters-table");

// Activate subject tab tools.
var semesterTools = ["NEW-SEMESTER", "DELETE-SEMESTER"];
activateButtons(semesterTools);

// Send an event to uptade the table when the tab is activated.
ipcRenderer.send("GET-SEMESTERS");

// Event that update the table
ipcRenderer.on("UPDATE-SEMESTERS", (event, value) => {
  semesters = value[1];

  var semesterHTML = "";

  for (var semester of semesters) {
    semesterHTML += "<div id=\"" + semester.Numero +
    "\" class=\"h-100 m-0 p-0 mr-1 d-inline-table\">" +
    "<p class=\"palette-wet-asphalt w-100 text-light text-medium py-1 m-0 text-center\">" +
    semester.Numero + "</p>";

    var subjects = JSON.parse(semester.Subjects);

    for (var subject in subjects) {
      semesterHTML += "<div class=\"card mb-1 w-100 rounded-0 font-weight-bold " + value[0].textMesh + "\" style=\"background: " + value[0].colorMesh + ";\">" +
      "<div class=\"p-1 card-header text-medium text-center\">" + subjects[subject] + "</div>" +
      "<div class=\"card-body px-2 py-1\">" +
      "<p class=\"card-title text-medium\">Code: " + subject + " </p>" +
      "</div>" +
      "</div>";
    }

    semesterHTML += "<div class=\"text-center  w-130-px\">" +
    "<img class=\"NEW-SUBJECT btn btn-primary btn-sm rounded-0 p-1 tool\"" +
    " src=\"../../assets/plus-icon.svg\">" +
    "</div>" +
    "</div>";

  }

  // Update table.
  semestersTable.innerHTML = semesterHTML;

  // Activate buttons.
  activeAddSubjectButtons();
});

/**
* This function add an event to add a subject in the semester whenever the add
* button is clicked.
*/
function activeAddSubjectButtons() {
  // Get all delete buttons of the table.
  var addSubjectButtons = document.getElementsByClassName("NEW-SUBJECT");

  // Add an event to the delete buttons.
  for (var button of addSubjectButtons) {
    button.addEventListener("click", (event) => {
      var semester = event.target.parentElement.parentElement.id;
      var subjects = JSON.parse(semesters[semester - 1].Subjects);

      ipcRenderer.send(
        "NEW-SEMESTER-SUBJECT",
        [semester, subjects]
      );
    });
  }
}
