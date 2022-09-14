var $entriesLink = document.querySelector('.nav-entries');
var $title = document.querySelector('#title');
var $photoURL = document.querySelector('#photo-url');
var $img = document.querySelector('img');
var $notes = document.querySelector('#notes');
var $form = document.querySelector('form');
var $entriesContainer = document.querySelector('ul');
var $noEntries = document.querySelector('.no-entries');
var $newButton = document.querySelector('.new');
var $newEntryView = document.querySelector('.new-entry');
var $entriesView = document.querySelector('.entries');
var $allEntries = document.querySelector('.all-entries');

if (data.view === 'entries') {
  $newEntryView.className = 'container new-entry hidden';
  $entriesView.className = 'container entries';
} else if (data.view === 'new-entry') {
  $newEntryView.className = 'container new-entry';
  $entriesView.className = 'container entries hidden';
}

$entriesLink.addEventListener('click', function (event) {
  data.view = 'entries';
  $newEntryView.className = 'container new-entry hidden';
  $entriesView.className = 'container entries';
});

$photoURL.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  var newEntry = {
    title: document.querySelector('#title').value,
    photoURL: document.querySelector('#photo-url').value,
    notes: document.querySelector('#notes').value,
    entryId: data.nextEntryId
  };
  var newEntryToPrepend = loadEntry(newEntry);

  data.nextEntryId += 1;
  data.entries.push(newEntry);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  data.view = 'entries';
  $entriesContainer.prepend(newEntryToPrepend);
  $newEntryView.className = 'container new-entry hidden';
  $noEntries.className = 'no-entries hidden';
  $entriesView.className = 'container entries';
});

function loadEntry(entry) {
  var firstRow = document.createElement('li');
  firstRow.className = 'row entry-container';

  var firstColumnHalf = document.createElement('div');
  firstColumnHalf.className = 'column-half';
  firstRow.appendChild(firstColumnHalf);

  var img = document.createElement('img');
  img.setAttribute('src', entry.photoURL);
  firstColumnHalf.appendChild(img);

  var secondColumnHalf = document.createElement('div');
  secondColumnHalf.className = 'column-half';
  firstRow.appendChild(secondColumnHalf);

  var secondRow = document.createElement('div');
  secondRow.className = 'row';
  secondColumnHalf.appendChild(secondRow);

  var thirdColumnHalf = document.createElement('div');
  thirdColumnHalf.className = 'column-half-mobile';
  secondRow.appendChild(thirdColumnHalf);

  var h2 = document.createElement('h2');
  h2.textContent = entry.title;
  thirdColumnHalf.appendChild(h2);

  var fourthColumnHalf = document.createElement('div');
  fourthColumnHalf.className = 'column-half-mobile';
  secondRow.appendChild(fourthColumnHalf);

  var thirdRow = document.createElement('div');
  thirdRow.className = 'row edit-container';
  fourthColumnHalf.appendChild(thirdRow);

  var edit = document.createElement('span');
  edit.className = 'fa-solid fa-pencil';
  edit.setAttribute('data-entry-id', data.nextEntryId - 1);
  thirdRow.appendChild(edit);

  var fourthRow = document.createElement('div');
  fourthRow.className = 'row';
  secondColumnHalf.appendChild(fourthRow);

  var columnFull = document.createElement('div');
  columnFull.className = 'column-full';
  fourthRow.appendChild(columnFull);

  var p = document.createElement('p');
  p.textContent = entry.notes;
  columnFull.appendChild(p);

  return firstRow;
}

$newButton.addEventListener('click', function (event) {
  data.view = 'new-entry';
  $newEntryView.className = 'container new-entry';
  $entriesView.className = 'container entries hidden';
});

window.addEventListener('DOMContentLoaded', function (event) {
  if (data.entries.length) {
    $noEntries.className = 'no-entries hidden';
  }

  for (var i = data.entries.length - 1; i >= 0; i--) {
    $entriesContainer.appendChild(loadEntry(data.entries[i]));
  }
});

$allEntries.addEventListener('click', function (event) {
  if (event.target.matches('span')) {
    var target = event.target.getAttribute('data-entry-id');
    data.editing = data.entries[target - 1];

    $newEntryView.className = 'container new-entry';
    $entriesView.className = 'container entries hidden';

    $title.setAttribute('value', data.editing.title);
    $photoURL.setAttribute('value', data.editing.photoURL);
    $img.setAttribute('src', data.editing.photoURL);
    $notes.textContent = data.editing.notes;
  }
});
