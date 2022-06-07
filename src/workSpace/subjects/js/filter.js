/**/

var filter = document.getElementById("filter");

function applyFilter() {
  var filterParams = {};

  for (var input of filter.children) {
    filterParams[input.children[1].id] = input.children[1].value;
  }
  ipcRenderer.send("SEARCH-SUBJECT", filterParams);
}
