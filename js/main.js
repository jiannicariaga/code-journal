var $photoURL = document.querySelector('#photo-url');
var $img = document.querySelector('img');
var $form = document.querySelector('form');
var entries = {};

$photoURL.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  entries.title = document.querySelector('#title').value;
  entries.photoURL = document.querySelector('#photo-url').value;
  entries.notes = document.querySelector('#notes').value;
  entries.nextEntryId = data.nextEntryId;
  data.nextEntryId += 1;
  data.entries.push(entries);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
