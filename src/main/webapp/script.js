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

// Function that adds a step to recipe form
function addStep() {
  const i = document.getElementsByClassName('step-div').length;
  const firstStep = document.querySelector('#first-step .step-div');
  const newStep = firstStep.cloneNode(true);
  newStep.querySelector('input').value = "";
  newStep.querySelector('#step').innerText = `Step ${i+1}`;
  document.getElementById('more-steps').appendChild(newStep);
}

// Function that deletes last step in form
function removeStep() {
  if (document.querySelector('#more-steps .step-div:last-child') != null) {
    const steps = document.querySelector('#more-steps .step-div:last-child').remove();
  }
}
