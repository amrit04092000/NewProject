/**/

var form = document.getElementById("new-db-subject-form");

var isEditing = false;

/**
* This function submit the form to create a new subject in the database.
*/
function newDbSubject() {

  if (form.children[0].children["Code"].value == "" ||
  form.children[1].children["Subject"].value == "" ||
  form.children[7].children["Credits"].value == "" ||
  form.children[3].children["College"].value == "" ||
  form.children[4].children["Place"].value == "" ||
  form.children[5].children["Faculty"].value == "" ||
  form.children[6].children["Department"].value == "") {
    return;
  }

  var data = [
    form.children[0].children["Code"].value,
    form.children[1].children["Subject"].value,
    form.children[7].children["Credits"].value,
    form.children[3].children["College"].value,
    form.children[4].children["Place"].value,
    form.children[5].children["Faculty"].value,
    form.children[6].children["Department"].value,
    form.children[2].children["Program"].value
  ];

  if (isEditing){
    ipcRenderer.send("OLD-DB-SUBJECT-EDITED", data);
  } else {

    data = data.map((value) => {
      return "\"" + value + "\"";
    });

    ipcRenderer.send("NEW-DB-SUBJECT-CREATED", data);
  }
}

ipcRenderer.send("SEARCH-DB-SUBJECT");

ipcRenderer.on("FILL-SPACES", (event, value) => {

  isEditing = value[1];

  if (value[0].Code) {
    form.children[0].children.Code.value = value[0].Code;
  }

  if (value[0].Name) {
    form.children[1].children.Subject.value = value[0].Name;
  }

  if (value[0].Credits) {
    form.children[7].children.Credits.value = value[0].Credits;
  }

  if (value[0].College) {
    form.children[3].children.College.value = value[0].College;
  }

  if (value[0].Place) {
    form.children[4].children.Place.value = value[0].Place;
  }

  if (value[0].Faculty) {
    form.children[5].children.Faculty.value = value[0].Faculty;
  }

  if (value[0].Department) {
    form.children[6].children.Department.value = value[0].Department;
  }

  if (value[0].Program) {
    form.children[2].children.Program.value = value[0].Program;
  }

});
