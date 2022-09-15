var $entriesLink = document.querySelector('.nav-entries');
var $view = document.querySelector('.view');
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
var $deleteEntry = document.querySelector('.delete');
var $modal = document.querySelector('.modal-container');
var $cancelButton = document.querySelector('.cancel');
var $confirmButton = document.querySelector('.confirm');

if (data.view === 'entries' || data.view === 'edit-entry') {
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

$newButton.addEventListener('click', function (event) {
  $form.reset();
  $img.src = 'images/placeholder-image-square.jpg';
  data.view = 'new-entry';
  $view.textContent = 'New Entry';
  $newEntryView.className = 'container new-entry';
  $entriesView.className = 'container entries hidden';
  $deleteEntry.className = 'delete hidden';
  $modal.className = 'modal-container hidden';
  $notes.value = null;
});

$allEntries.addEventListener('click', function (event) {
  if (event.target.matches('span')) {
    var entryToEdit = parseInt(event.target.getAttribute('data-entry-id'));
    $deleteEntry.setAttribute('data-id', entryToEdit);

    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === entryToEdit) {
        data.editing = data.entries[i];
      }
    }

    $title.value = data.editing.title;
    $photoURL.value = data.editing.photoURL;
    $img.src = data.editing.photoURL;
    $notes.value = data.editing.notes;

    data.view = 'edit-entry';
    $view.textContent = 'Edit Entry';
    $newEntryView.className = 'container new-entry';
    $entriesView.className = 'container entries hidden';
    $deleteEntry.className = 'delete';
    $modal.className = 'modal-container hidden';
  }
});

$photoURL.addEventListener('input', function (event) {
  $img.src = event.target.value;
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  var newEntry = {
    title: document.querySelector('#title').value,
    photoURL: document.querySelector('#photo-url').value,
    notes: document.querySelector('#notes').value,
    entryId: data.nextEntryId
  };

  if (data.view === 'edit-entry') {
    newEntry.entryId = data.editing.entryId;

    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === newEntry.entryId) {
        data.entries[i] = newEntry;
      }
    }

    var oldDomTree = document.querySelector('[data-entry-id=' + CSS.escape(newEntry.entryId) + ']');

    oldDomTree.replaceWith(loadEntry(newEntry));
  } else {
    data.nextEntryId += 1;
    data.entries.push(newEntry);
    $entriesContainer.prepend(loadEntry(newEntry));
  }

  $form.reset();
  $img.src = 'images/placeholder-image-square.jpg';
  data.view = 'entries';
  $newEntryView.className = 'container new-entry hidden';
  $noEntries.className = 'no-entries hidden';
  $entriesView.className = 'container entries';
});

function loadEntry(entry) {
  var firstRow = document.createElement('li');
  firstRow.setAttribute('data-entry-id', entry.entryId);
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
  thirdColumnHalf.className = 'column-half-title';
  secondRow.appendChild(thirdColumnHalf);

  var h2 = document.createElement('h2');
  h2.textContent = entry.title;
  thirdColumnHalf.appendChild(h2);

  var fourthColumnHalf = document.createElement('div');
  fourthColumnHalf.className = 'column-half-edit';
  secondRow.appendChild(fourthColumnHalf);

  var thirdRow = document.createElement('div');
  thirdRow.className = 'row edit-container';
  fourthColumnHalf.appendChild(thirdRow);

  var edit = document.createElement('span');
  edit.className = 'fa-solid fa-pencil';
  edit.setAttribute('data-entry-id', entry.entryId);
  thirdRow.appendChild(edit);

  var fourthRow = document.createElement('div');
  fourthRow.className = 'row';
  secondColumnHalf.appendChild(fourthRow);

  var columnFull = document.createElement('div');
  columnFull.className = 'column-full-notes';
  fourthRow.appendChild(columnFull);

  var p = document.createElement('p');
  p.textContent = entry.notes;
  columnFull.appendChild(p);

  return firstRow;
}

$deleteEntry.addEventListener('click', function (event) {
  event.preventDefault();
  $modal.className = 'modal-container';
});

$cancelButton.addEventListener('click', function (event) {
  $modal.className = 'modal-container hidden';
});

$confirmButton.addEventListener('click', function (event) {
  var entryToDelete = parseInt($deleteEntry.getAttribute('data-id'));
  var domTreeToDelete = $allEntries.querySelector('[data-entry-id=' + CSS.escape(entryToDelete) + ']');

  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === entryToDelete) {
      data.entries.splice(i, 1);
      domTreeToDelete.remove();
    }
  }

  if (!data.entries.length) {
    $noEntries.className = 'no-entries';
  }

  data.view = 'entries';
  $newEntryView.className = 'container new-entry hidden';
  $modal.className = 'modal-container hidden';
  $entriesView.className = 'container entries';
});

window.addEventListener('DOMContentLoaded', function (event) {
  if (data.entries.length) {
    $noEntries.className = 'no-entries hidden';
  }

  for (var i = data.entries.length - 1; i >= 0; i--) {
    $entriesContainer.appendChild(loadEntry(data.entries[i]));
  }

  data.editing = null;
});
