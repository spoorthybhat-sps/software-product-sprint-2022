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
function addStep(type, ingredient = false) {
  const i = document.getElementsByClassName('step-div').length;
  const firstStep = document.querySelector(`#first-step .${type}-step-div`);
  const newStep = firstStep.cloneNode(true);

  if (type != 'stir') {
    newStep.querySelector('input').value = "";
  }

  if (type == 'add' && ingredient) {
    newStep.querySelector('#add').remove();
    newStep.querySelector('#result').setAttribute('name','ingredient[]')
    newStep.querySelector('#quantity').setAttribute('oninput','addStepResult(this, true)')
    newStep.querySelector('#quantity-type').setAttribute('oninput','addStepResult(this, true)');
    newStep.querySelector('#ingredient').setAttribute('oninput','addStepResult(this, true)');
    document.getElementById('ingredient-list').appendChild(newStep);
  } else {
    document.getElementById('more-steps').appendChild(newStep);
  }
}

// Function that deletes a step when cross button is clicked
function removeStep(element) {
  element.parentNode.parentNode.parentNode.remove();
}

// function that updates result of add step
function addStepResult(element, ingredient_list = false) {
  const result = element.parentNode.parentNode.querySelector('#result')
  const quantity = element.parentNode.parentNode.querySelector('#quantity').value
  const quantity_type = element.parentNode.parentNode.querySelector('#quantity-type').value
  const ingredient = element.parentNode.parentNode.querySelector('#ingredient').value
  if (ingredient_list == true) {
    result.value = `${quantity} ${quantity_type} of ${ingredient}`
  } else {
    result.value = `Add ${quantity} ${quantity_type} of ${ingredient}`
  }
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
  