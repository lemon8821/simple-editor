"use strict";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('serviceworker.js').then(function (registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// place your code below



const saveButton = document.querySelector('.form__button--save-js');
const loadButton = document.querySelector('.form__button--load-js');
const text = document.querySelector('.form__text--js');
var object = [];
if (!localStorage.id)
  localStorage.id = 1;



if (localStorage.getItem('content')) {
  object = JSON.parse(localStorage.getItem('content'));
  for (var item in object) {
    const noteHeader = document.createElement('div');
    noteHeader.classList = 'note__header';
    noteHeader.innerHTML = `Note nr ${object[item]['id']}`;
    const noteContent = document.createElement('div');
    noteContent.classList = 'note__content';
    console.log(object[item]['text']);
    noteContent.innerHTML = object[item]['text'].toString();
    const noteFooter = document.createElement('div');
    noteFooter.classList = 'note__footer';
    noteFooter.innerHTML = object[item]['date'];
    const editButton = document.createElement('i');
    editButton.innerHTML = 'edit';
    editButton.classList = 'note__edit far fa-edit';
    const notes = document.querySelector('.notes');
    let note = document.createElement('div');
    note.classList = 'note';
    editButton.addEventListener('click', (e) => {
      text.value = noteContent.innerHTML;
      note.style.display = 'none';
    })
    note.appendChild(noteHeader);
    note.appendChild(noteContent);
    note.appendChild(noteFooter);
    noteFooter.appendChild(editButton);
    notes.appendChild(note);
  }

}


function SaveToLocal(objekt) {
  return JSON.stringify(objekt);
}




saveButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (text.value !== "") {

    var data = new Date();
    saveButton.innerHTML = 'Saved!';
    saveButton.classList.toggle('form__button--clicked');

    const noteHeader = document.createElement('div');
    noteHeader.classList = 'note__header';
    noteHeader.innerHTML = `Note nr ${localStorage.id}`;
    const noteContent = document.createElement('div');
    noteContent.classList = 'note__content';
    const noteFooter = document.createElement('div');
    noteFooter.classList = 'note__footer';
    noteFooter.innerHTML = `Created: ${data.getDay()}-${data.getMonth()}-${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
    const editButton = document.createElement('i');
    editButton.innerHTML = 'edit';
    editButton.classList = 'note__edit far fa-edit';
    const notes = document.querySelector('.notes');
    let note = document.createElement('div');
    note.classList = 'note';
    editButton.addEventListener('click', (e) => {
      text.value = noteContent.innerHTML;
      note.style.display = 'none';
    })
    note.appendChild(noteHeader);
    note.appendChild(noteContent);
    note.appendChild(noteFooter);
    noteFooter.appendChild(editButton);
    noteContent.innerHTML = text.value;
    notes.appendChild(note);
    object.push({ id: localStorage.id, text: text.value, date: noteFooter.innerText.slice(0,-5) });
    let content = JSON.stringify(object);
    console.log(content);
    localStorage.setItem('content', content);

    text.value = "";
    localStorage.id++;
  }
});

loadButton.addEventListener('click', e => {
  e.preventDefault();
  text.value = localStorage.getItem("text");
})

text.addEventListener('keyup', (e) => {
  if (text.value != localStorage.getItem('text') && text.value != undefined) {
    saveButton.innerHTML = 'Save';
    saveButton.classList.remove('form__button--clicked');
  }
  else {
    saveButton.innerHTML = 'Saved!';
    saveButton.classList.add('form__button--clicked');
    saveButton.disabled ? false : true;
  }
})