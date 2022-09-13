var $photoURL = document.querySelector('#photo-url');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var $entriesContainer = document.querySelector('ul');

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

  data.nextEntryId += 1;
  data.entries.push(newEntry);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});

function loadEntry(entry) {
  var row = document.createElement('li');
  var firstColumnHalf = document.createElement('div');
  var img = document.createElement('img');
  var secondColumnHalf = document.createElement('div');
  var h2 = document.createElement('h2');
  var p = document.createElement('p');

  row.className = 'row';
  firstColumnHalf.className = 'column-half';
  row.appendChild(firstColumnHalf);
  img.setAttribute('src', entry.photoURL);
  firstColumnHalf.appendChild(img);
  secondColumnHalf.className = 'column-half';
  row.appendChild(secondColumnHalf);
  h2.textContent = entry.title;
  secondColumnHalf.appendChild(h2);
  p.textContent = entry.notes;
  secondColumnHalf.appendChild(p);

  return row;
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $entriesContainer.appendChild(loadEntry(data.entries[i]));
  }
});
