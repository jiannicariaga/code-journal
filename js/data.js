/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
var previousEntryDataJSON = localStorage.getItem('entry-data');

if (previousEntryDataJSON !== null) {
  data = JSON.parse(previousEntryDataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);

  localStorage.setItem('entry-data', dataJSON);
});
