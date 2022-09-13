var $photoURL = document.querySelector('#photo-url');
var $img = document.querySelector('img');
var $form = document.querySelector('form');

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
  data.entries.push(entries);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
