/**/

// Color blocks
var colorBlocksMesh = document.getElementById("color-block-mesh");
var colorBlocksTimetable = document.getElementsByClassName("color-block-timetable");

// Subject block
var subjectBlockMesh = document.getElementById("subject-sample");

ipcRenderer.on("CONFIG-OBJ", (event, value) => {

  colorBlocksMesh.value = value.colorMesh;

  subjectBlockMesh.style.background = value.colorMesh;

  for (var i = 0; i < colorBlocksTimetable.length; i++) {
    colorBlocksTimetable[i].value = value.colorsTimetable[i];
  }

  document.getElementById(value.textMesh).checked = true;

  subjectBlockMesh.classList.add(value.textMesh);

});


/**
* This function update the colors for the mesh and schedule.
*/
function updateColors() {

  var colorMesh = colorBlocksMesh.value;

  subjectBlockMesh.style.background = colorBlocksMesh.value;

  var colorsTimetable = [];

  for (var i = 0; i < colorBlocksTimetable.length; i++) {
    colorsTimetable = colorsTimetable.concat(colorBlocksTimetable[i].value);
  }

  ipcRenderer.send("UPDATE-COLORS", [colorMesh, colorsTimetable]);
}


/**
* This function update the color for the text.
*/
function updateText() {

  console.log("HERE");

  var textColor;

  if (document.getElementById("text-white").checked) {
    textColor = "text-white";

    subjectBlockMesh.classList.add("text-white");
    subjectBlockMesh.classList.remove("text-black");

  } else {
    textColor = "text-black";

    subjectBlockMesh.classList.remove("text-white");
    subjectBlockMesh.classList.add("text-black");

  }

  ipcRenderer.send("UPDATE-TEXT", textColor);
}
