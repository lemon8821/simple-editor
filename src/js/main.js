"use strict";

// service worker registration - remove if you're not going to use it

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

// place your code below
const saveButton = document.querySelector('.form__button--save-js');
const loadButton = document.querySelector('.form__button--load-js');
const text = document.querySelector('.form__text--js');
saveButton.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.setItem('text',text.value);
  console.log(e);
});

loadButton.addEventListener('click', e => {
  e.preventDefault();
  text.value = localStorage.getItem("text");
})
