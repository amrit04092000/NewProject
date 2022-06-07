/**/

// Default blocks
var blockCollege = document.getElementById("College");
var blockPlace = document.getElementById("Place");
var blockFaculty = document.getElementById("Faculty");
var blockDepartment = document.getElementById("Department");

ipcRenderer.on("CONFIG-OBJ", (event, value) => {

  blockCollege.value = value.defaultsNewSubject.College;
  blockPlace.value = value.defaultsNewSubject.Place;
  blockFaculty.value = value.defaultsNewSubject.Faculty;
  blockDepartment.value = value.defaultsNewSubject.Department;

});


/**
* This function update the defaults values for the mesh and schedule.
*/
function updateDefaults() {

  var defaults = {
    "defaultsNewSubject": {
      "College": blockCollege.value,
      "Place": blockPlace.value,
      "Faculty": blockFaculty.value,
      "Department": blockDepartment.value
    }
  };

  ipcRenderer.send("UPDATE-DEFAULTS", defaults);

}
