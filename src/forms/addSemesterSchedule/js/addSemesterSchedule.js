/**/

var semesters;
var semesterBar = document.getElementById("semesters-bar");
var semesterTable = document.getElementById("semester-table");

var submitButton = document.getElementById("submit");

// This event asks for the semesters an them subjects.
ipcRenderer.send("GET-SEMESTERS-INFO");

// This event get all the semesters and its subjects
ipcRenderer.on("SEND-SEMESTERS-INFO", (event, value) => {
  semesters = value;

  var semesterHTML = "";

  for (var semester of semesters) {
    semesterHTML += "<button id=\"" + semester.Numero +
    "\" class=\"btn btn-primary btn-sm rounded-0 p-1 w-100 semester-button\">" +
    semester.Numero + "</button>\n";
  }

  semesterBar.innerHTML = semesterHTML;

  activeSemestersButtons();

  var subjects = JSON.parse(semesters[0].Subjects);

  var subjectHTML = "";

  for (var subject in subjects) {
    subjectHTML += "<div class=\"border text-center p-2\" id=\"" + subject + "\">" +
    "<button class=\"btn btn-primary w-75 subject-button\">" +
    subjects[subject] +
    "</button>" +
    "<div class=\"my-2 w-100 drop-down overflow-hidden\" style=\"height: 0; transition: 0.5s;\">" +
    "<div class=\"w-100 h-80 overflow-y-scroll\"></div>" +
    "<div class=\"text-center mt-3\">" +
    "<img class=\"new-block btn btn-primary btn-sm rounded-0 p-1 tool\"" +
    " src=\"../../assets/plus-icon.svg\">" +
    "<img class=\"delete-block btn btn-danger btn-sm rounded-0 p-1 mx-1\"" +
    " src=\"../../assets/minus-icon.svg\">" +
    "</div>" +
    "</div>" +
    "</div>";
  }

  semesterTable.innerHTML = subjectHTML;

  activeSubjectsButtons();
  activeBlockButtons();
  activeRemoveBlockButtons();

});

// Add event to the submitButton.
submitButton.addEventListener("click", (event) => {
  var schedule = {};

  for (var subject of semesterTable.children) {
    schedule[subject.id] = [subject.children[0].innerText];
    for (var block of subject.children[1].children[0].children) {
      schedule[subject.id] = schedule[subject.id].concat([[
        block.children[0].children[1].value,
        block.children[1].children[1].value,
        block.children[2].children[1].value
      ]]);
    }
  }

  ipcRenderer.send("TIMETABLE-DB", schedule);
});

/**
* This function add an event display the semerter subjects.
*/
function activeSemestersButtons() {
  // Get all delete buttons of the table.
  var semestersButtons = document.getElementsByClassName("semester-button");

  // Add an event to the delete buttons.
  for (var button of semestersButtons) {
    button.addEventListener("click", (event) => {
      var semester = event.target.id;

      var subjects = JSON.parse(semesters[semester - 1].Subjects);

      var subjectHTML = "";

      for (var subject in subjects) {
        subjectHTML += "<div class=\"border text-center p-2\" id=\"" + subject + "\">" +
        "<button class=\"btn btn-primary w-75 subject-button\">" +
        subjects[subject] +
        "</button>" +
        "<div class=\"my-2 w-100 drop-down overflow-hidden\" style=\"height: 0; transition: 0.5s;\">" +
        "<div class=\"w-100 h-80 overflow-y-scroll\"></div>" +
        "<div class=\"text-center mt-3\">" +
        "<img class=\"new-block btn btn-primary btn-sm rounded-0 p-1 mx-1\"" +
        " src=\"../../assets/plus-icon.svg\">" +
        "<img class=\"delete-block btn btn-danger btn-sm rounded-0 p-1 mx-1\"" +
        " src=\"../../assets/minus-icon.svg\">" +
        "</div>" +
        "</div>" +
        "</div>";
      }

      semesterTable.innerHTML = subjectHTML;

      activeSubjectsButtons();
      activeBlockButtons();
      activeRemoveBlockButtons();
    });
  }
}

/**
* This function add an event to display the subject schedule.
*/
function activeSubjectsButtons() {
  // Get all delete buttons of the table.
  var subjectsButtons = document.getElementsByClassName("subject-button");

  // Add an event to the delete buttons.
  for (var button of subjectsButtons) {
    button.addEventListener("click", (event) => {
      var schedule = event.target.parentElement.children[1];

      if (schedule.style.height == "0px") {
        schedule.style.height = "250px";
      } else {
        schedule.style.height = "0px";
      }

    });
  }
}

/**
* This function add an event to add a block of a subject.
*/
function activeBlockButtons() {
  // Get all delete buttons of the table.
  var blockButtons = document.getElementsByClassName("new-block");

  // Add an event to the delete buttons.
  for (var button of blockButtons) {
    button.addEventListener("click", (event) => {
      var schedule = event.target.parentElement.parentElement.children[0];

      scheduleHTML = "<div class=\"float-left w-50 border p-3\">" +
      "<div class=\"w-100 form-group\">" +
      "<div class=\"text-medium text-left\">Day</div>" +
      "<select class=\"form-control w-75 m-0\">" +
      "<option value=\"Monday\">Monday</option>" +
      "<option value=\"Tuesday\">Tuesday</option>" +
      "<option value=\"Wednesday\">Wednesday</option>" +
      "<option value=\"Thursday\">Thursday</option>" +
      "<option value=\"Friday\">Friday</option>" +
      "<option value=\"Saturday\">Saturday</option>" +
      "<option value=\"Sunday\">Sunday</option>" +
      "</select>" +

      "</div>" +

      "<div class=\"w-50 form-group float-left\">" +
      "<div class=\"text-medium text-left\">Start Time</div>" +
      "<select class=\"form-control w-75 m-0\">" +
      "<option value=\"0\">6:00</option>" +
      "<option value=\"1\">7:00</option>" +
      "<option value=\"2\">8:00</option>" +
      "<option value=\"3\">9:00</option>" +
      "<option value=\"4\">10:00</option>" +
      "<option value=\"5\">11:00</option>" +
      "<option value=\"6\">12:00</option>" +
      "<option value=\"7\">13:00</option>" +
      "<option value=\"8\">14:00</option>" +
      "<option value=\"9\">15:00</option>" +
      "<option value=\"10\">16:00</option>" +
      "<option value=\"11\">17:00</option>" +
      "<option value=\"12\">18:00</option>" +
      "<option value=\"13\">19:00</option>" +
      "<option value=\"14\">20:00</option>" +
      "<option value=\"15\">21:00</option>" +
      "</select>" +
      "</div>" +

      "<div class=\"w-50 form-group float-left\">" +
      "<div class=\"text-medium text-left\">End Time</div>" +
      "<select class=\"form-control w-75 m-0\">" +
      "<option value=\"0\">6:00</option>" +
      "<option value=\"1\">7:00</option>" +
      "<option value=\"2\">8:00</option>" +
      "<option value=\"3\">9:00</option>" +
      "<option value=\"4\">10:00</option>" +
      "<option value=\"5\">11:00</option>" +
      "<option value=\"6\">12:00</option>" +
      "<option value=\"7\">13:00</option>" +
      "<option value=\"8\">14:00</option>" +
      "<option value=\"9\">15:00</option>" +
      "<option value=\"10\">16:00</option>" +
      "<option value=\"11\">17:00</option>" +
      "<option value=\"12\">18:00</option>" +
      "<option value=\"13\">19:00</option>" +
      "<option value=\"14\">20:00</option>" +
      "<option value=\"15\">21:00</option>" +
      "</select>" +
      "</div>" +

      "</div>";

      schedule.innerHTML += scheduleHTML;
    });
  }
}

/**
* This function add an event to remove a block of a subject.
*/
function activeRemoveBlockButtons() {
  // Get all delete buttons of the table.
  var blockButtons = document.getElementsByClassName("delete-block");

  // Add an event to the delete buttons.
  for (var button of blockButtons) {
    button.addEventListener("click", (event) => {
      var schedule = event.target.parentElement.parentElement.children[0];

      schedule.removeChild(schedule.lastElementChild);

    });
  }
}
