// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

// Function that adds a step to recipe form depending on button clicked
function addStep(type) {
  const i = document.getElementsByClassName('step-div').length;
  const firstStep = document.querySelector(`#first-step .${type}-step-div`);
  const newStep = firstStep.cloneNode(true);
  if (type != 'stir') {
    newStep.querySelector('input').value = "";
  }
  document.getElementById('more-steps').appendChild(newStep);
}

// Function that deletes a step when cross button is clicked
function removeStep(element) {
  element.parentNode.parentNode.parentNode.remove();
}

// function that updates result of add step
function addStepResult(element) {
  const result = element.parentNode.parentNode.querySelector('#result')
  const quantity = element.parentNode.parentNode.querySelector('#quantity').value
  const quantity_type = element.parentNode.parentNode.querySelector('#quantity-type').value
  const ingredient = element.parentNode.parentNode.querySelector('#ingredient').value
  result.value = `Add ${quantity} ${quantity_type} of ${ingredient}`
}

// function that updates result of wait step
function waitStepResult(element) {
  const result = element.parentNode.parentNode.querySelector('#result')
  const time = element.parentNode.parentNode.querySelector('#time').value
  const units = element.parentNode.parentNode.querySelector('#units').value
  result.value = `Wait for ${time} ${units}`
}

function loadTasks() {
    fetch('/list-tasks').then(response => response.json()).then((tasks) => {
      const taskListElement = document.getElementById('task-list');
      tasks.forEach((task) => {
        taskListElement.appendChild(createTaskElement(task));
      })
    });
  }
  
  /** Creates an element that represents a task, including its delete button. */
  function createTaskElement(task) {
    const taskElement = document.createElement('li');
    taskElement.className = 'task';
  
    const titleElement = document.createElement('span');
    titleElement.innerText = task.title;
  
    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.innerText = 'Delete';
    deleteButtonElement.addEventListener('click', () => {
      deleteTask(task);
  
      // Remove the task from the DOM.
      taskElement.remove();
    });
  
    taskElement.appendChild(titleElement);
    taskElement.appendChild(deleteButtonElement);
    return taskElement;
  }
  
  /** Tells the server to delete the task. */
  
//------------------------------------->
/*
const firebaseConfig = {
    apiKey: "AIzaSyAh50tKq3hCpvevF-UUrYyDg5kpzJ_XCT4",
    authDomain: "summer22-sps-25.firebaseapp.com",
    databaseURL: "https://summer22-sps-25-default-rtdb.firebaseio.com",
    projectId: "summer22-sps-25",
    storageBucket: "summer22-sps-25.appspot.com",
    messagingSenderId: "471830306552",
    appId: "1:471830306552:web:9b6e1d5f76156fc077650d"
  };

  // Initialize Firebase
 // const app = initializeApp(firebaseConfig);
// Initialize Firebase
const firebase;
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()
  // Set up our register function
function signUp () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    rewritePassword = document.getElementById('rewritePassword').value
    username = document.getElementById('username').value

    // Validate input fields
    if (validate_email(username) == false || validate_password(password) == false) {
      alert('Username or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
    if(password != rewritePassword ){
        alert('Password is Wrong')
    }
    auth.createUserWithEmailAndPassword(username, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
       username: username,
       password:password,
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      alert('User Created!!')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      window.location.href ="Feed.html";
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
    // Validate Functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }
  */



//  import { initializeApp } from "firebase/app";
// import { getdatabase,ref, set } from "firebase/database";
// const firebaseConfig = {
//     apiKey: "AIzaSyAh50tKq3hCpvevF-UUrYyDg5kpzJ_XCT4",
//     authDomain: "summer22-sps-25.firebaseapp.com",
//     databaseURL: "https://summer22-sps-25-default-rtdb.firebaseio.com",
//     projectId: "summer22-sps-25",
//     storageBucket: "summer22-sps-25.appspot.com",
//     messagingSenderId: "471830306552",
//     appId: "1:471830306552:web:9b6e1d5f76156fc077650d"
//   };
// const app= initializeApp(firebaseConfig);
// function writeUserData(userId, name, email){
//     const db = getdatabase();
//     const reference = ref(db,'users/'+ userId);

//     set(reference,{
//         username:name,
//         email:email,
//     });
// }
// writeUserData("test123", "Sps", "sps@gmail.com");
