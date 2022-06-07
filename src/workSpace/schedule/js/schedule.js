/**/

// Activate subject tab tools.
var scheduleTools = ["ADD-SEMESTER"];
activateButtons(scheduleTools);

// Color pallete
var colors;

// Week days

weekDays = {
  "Monday": document.getElementById("Monday"),
  "Tuesday": document.getElementById("Tuesday"),
  "Wednesday": document.getElementById("Wednesday"),
  "Thursday": document.getElementById("Thursday"),
  "Friday": document.getElementById("Friday"),
  "Saturday": document.getElementById("Saturday"),
  "Sunday": document.getElementById("Sunday")
};

ipcRenderer.send("GET-TIMETABLE");

// This event will add the timetable.
ipcRenderer.on("UPDATE-TIMETABLE", (event, value) => {
  colors = value[0];

  for (var weekDay in weekDays) {
    weekDays[weekDay].innerHTML = "";
  }

  var timetable = JSON.parse(value[1][0].Info);

  var count = 0;

  for (var subject in timetable) {
    var subjectName = timetable[subject][0];

    for (var i = 1; i < timetable[subject].length; i++) {
      var weekDayUl = weekDays[timetable[subject][i][0]];

      var width = weekDayUl.offsetWidth;

      weekDayUl.innerHTML += "<li class=\"text-weight-bold\" style=\"width:" + width +
      "px; height: " + (50 * (parseInt(timetable[subject][i][2]) - parseInt(timetable[subject][i][1]))) + "px; " +
      "top: " + (50 * (1 + parseInt(timetable[subject][i][1]))) + "px; " +
      "background:" + colors[count%10] + "\">" +
      subjectName + "<br />" + "Code:" + subject +
      "</li>";
    }

    count++;
  }

});
