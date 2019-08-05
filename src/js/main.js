"use strict";

import { userInfo } from "os";

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
    object.push({ id: localStorage.id, text: text.value, date: noteFooter.innerText.slice(0, -5) });
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

const btn = document.querySelector('.ajax');
const ul = document.querySelector('.ajaxresult');
btn.addEventListener('click', (e) => {
  ul.innerHTML = 'Loading...';
  fetch("https://www.googleapis.com/books/v1/volumes?q=wiedzmin", { method: 'GET' })
    .then(resp => resp.json())
    .then(resp => {
      ul.innerHTML = '';
      for (var prop in resp["items"]) {
        console.log(resp["items"][prop]["volumeInfo"]["title"]);
        ul.innerHTML += `<li>Title: ${resp["items"][prop]["volumeInfo"]["title"]}</li>
        `;
      }
    })
})

// setTimeout(() => {
//   console.log("waited 2s")
//   setTimeout(() => {
//     console.log("another 2s")
//     setTimeout(() => {
//       console.log("total 6s waiting")
//     }, 2000);
//   }, 2000);
// }, 2000);

// const wait = ms => new Promise ((resolve,reject) => setTimeout(resolve,ms));
// wait(2000).then(() => console.log('2s waited'))
// .then(() => wait(2000))
// .then(() => console.log('wnother 2'))


// const wait = ms => new Promise((resolve, reject) => setTimeout(() => {
//   if (Math.random() >= 0.5){
//     resolve('Promise is completed')
//   }
//   else {
//     reject('Promise is rejected')
//   }
// }, ms));

// wait(2000).then(value => console.log(value)).catch(err => console.log(err));

// const name = "daniel";
// const age = 25;

// const ob = [{
//   name,
//   age
// },{
//   name,
//   age
// },{
//   name,
//   age
// },{
//   name,
//   age
// }]
// console.log(...ob);
// // console.log(JSON.parse(JSON.stringify(ob)));
// const myF = () => "dupa";
// console.log(myF());

// //ES 6
// fetch('https://jsonplaceholder.typicode.com/todos/1')
// .then(response => response.json())
// .then(json => console.log(json))

// //ES 5
// fetch('https://jsonplaceholder.typicode.com/todos/1',function (response) {
//   console.log(11)
// })


// let posts = [];

// function readPosts() {
//   setTimeout(() => {
//     posts.push("Wpis 1","Wpis 2");
//   }, 2000);
// }
// readPosts();
// console.log(posts);
// function show(name,f)
// {
//   f(name);
// }

// show('daniel',alert); 



// Callback
// function pokazWKonsoli(x)
// {
//   console.log(x);
// }
// function pokazAlert(x) {
//   alert(x);
// }

// function pokazGdzies(x,callback) {
//   callback(x);
// }
// pokazGdzies('X',pokazWKonsoli);

// document.addEventListener('click', (e) => {
//   console.log(e.target.innerText);
// })

// const tab = [21,4,10,22];
// tab.sort(callback);
// console.log(tab);

// function callback(a,b) {
//   return b-a;
// }

// const miasta = ["warSzawa", "KCYNia", "PoZnań"];

// const miastaUpper = miasta.map((city) => {  
//   const m = city.toLowerCase();
//   return m.charAt(0).toUpperCase() + m.slice(1);
// })
// console.log(miastaUpper);

// const upper = 'i love javascript';

// function capitalizeFirstLetters(text) {
//   return text
//     .toLowerCase()
//     .split(' ')
//     .map(word => word.charAt(0).toUpperCase()+word.slice(1))
//     .join(' ')
// }

// const result = capitalizeFirstLetters(upper);
// console.log(result);

// function game() { 
// for (let index = 1; index <= 100; index++) {
//   if (index%15==0)
//   console.log("fizzbuzz");
//   else if(index%3 == 0)
//   console.log("fizz")
//   else if (index%5 == 0)
//   console.log("buzz")
//   else
//   console.log(index)
// }
// }

// console.log(game());

// const sentence = 'i really hate js';


// function longestWord(sentence) {
//   let wordTab = sentence.split(' ');
//   let longestWord = '';
//   let longestWordLength = 0;
//   for (let word of wordTab) {
//     if (word.length > longestWordLength) {
//       longestWordLength = word.length;
//       longestWord = word;
//     }
//     else if (word.length == longestWordLength) {

//     }
//   }
//   return longestWord;
// }

// const result = longestWord(sentence);
// console.log(result);

// function processSth(callback) {
//   let i = 0;  
//   for (let index = 0; index < 100000; index++) {
//       console.log(index);
//     }
//   callback();
// }

// function ready() {
//   console.log("im ready now")

// }

// processSth(ready);


// let posts = [];
// function readpost1(callback) {
//   setTimeout(() => {
//     posts.push("wpis1");
//     callback();
//   }, 2000);
// }
// function readpost2(callback) {
//   setTimeout(() => {
//     posts.push("wpis2");
//     callback();
//   }, 3000);
// }

// function showPost() {
//   console.log(posts);
// }

// // readpost1(function () {
// //   readpost2(function() {
// //     showPost();
// //   })
// // })

// const prom = ms => new Promise((resolve,reject) => {
//   if (Math.random() > 0.5)
//     resolve("Sukces");
//   else
//     reject("false");
// })

// function resolve(tekst) {
//   console.log(tekst)
// }
// function reject(tekst) {
//   console.log(tekst)
// }

// prom()
//   .catch()
const numbers = [1,2,3,4,5,6,7,8,9,10];

console.log(...numbers);