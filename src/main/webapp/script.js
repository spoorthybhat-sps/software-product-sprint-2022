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

// Function that adds a step to recipe form depending on button clicked
function addStep(type, ingredient = false) {
  const i = document.getElementsByClassName("step-div").length;
  const firstStep = document.querySelector(`#first-step .${type}-step-div`);
  const newStep = firstStep.cloneNode(true);

  if (type != "stir") {
    newStep.querySelector("input").value = "";
  }

  if (type == "add" && ingredient) {
    newStep.querySelector("#add").remove();
    newStep.querySelector("#result").setAttribute("name", "ingredient[]");
    newStep
      .querySelector("#quantity")
      .setAttribute("oninput", "addStepResult(this, true)");
    newStep
      .querySelector("#quantity-type")
      .setAttribute("oninput", "addStepResult(this, true)");
    newStep
      .querySelector("#ingredient")
      .setAttribute("oninput", "addStepResult(this, true)");
    document.getElementById("ingredient-list").appendChild(newStep);
  } else if (type == "tag") {
    document.getElementById("tag-space").appendChild(newStep);
  } else {
    document.getElementById("more-steps").appendChild(newStep);
  }
}

// Function that deletes a step when cross button is clicked
function removeStep(element) {
  element.parentNode.parentNode.parentNode.remove();
}

// function that updates result of add step
function addStepResult(element, ingredient_list = false) {
  const result = element.parentNode.parentNode.querySelector("#result");
  const quantity =
    element.parentNode.parentNode.querySelector("#quantity").value;
  const quantity_type =
    element.parentNode.parentNode.querySelector("#quantity-type").value;
  const ingredient =
    element.parentNode.parentNode.querySelector("#ingredient").value;
  if (ingredient_list == true) {
    result.value = `${quantity} ${quantity_type} of ${ingredient}`;
  } else {
    result.value = `Add ${quantity} ${quantity_type} of ${ingredient}`;
  }
}

// function that updates result of wait step
function waitStepResult(element) {
  const result = element.parentNode.parentNode.querySelector("#result");
  const time = element.parentNode.parentNode.querySelector("#time").value;
  const units = element.parentNode.parentNode.querySelector("#units").value;
  result.value = `Wait for ${time} ${units}`;
}

function changeImage(image_input) {
  const [file] = image_input.files;
  if (file) {
    document
      .getElementById("recipe-photo")
      .setAttribute("src", URL.createObjectURL(file));
  }
}

function loadRecipes() {
  fetch("/fetch-recipes")
    .then((response) => response.json())
    .then((recipes) => {
      const taskListElement = document.getElementById("feed-view");
      recipes.forEach((recipe) => {
        taskListElement.appendChild(createRecipeElement(recipe));
      });
    });
}

function createRecipeElement(recipe) {
  var div = document.createElement("div");
  div.id = "recipe-box";
  div.className = "flex-hor";
  var left_div = document.createElement("div");
  left_div.id = "left-recipe-box";
  var title = document.createElement("h1");
  title.innerHTML = recipe.name;
  var img = document.createElement("img");
  img.src = recipe.imageUrl;
  img.className = "center-img";
  img.style.cssText = "height:50%;width:50%;";
  left_div.appendChild(title);
  left_div.appendChild(img);
  var right_div = document.createElement("div");
  right_div.id = "right-recipe-box";
  var a = recipe.steps;
  var ingredients = recipe.ingredients;
  var tags = recipe.tags;
  a = a.replace(/[\[\]]+/g, "").split(", ");
  tags = tags.replace(/[\[\]]+/g, "").split(", ");
  ingredients = ingredients.replace(/[\[\]]+/g, "").split(", ");
  var tags_div = document.createElement("div");
  tags_div.id = "tags";
  left_div.appendChild(tags_div);
  var ingredients_div = document.createElement("div");
  ingredients_div.id = "ingredients";
  right_div.appendChild(ingredients_div);

  a.forEach((item) => {
    var steps_div = document.createElement("div");
    steps_div.className = "recipe-instruction";
    var steps = document.createElement("p");
    steps.innerHTML = item;
    steps_div.appendChild(steps);
    right_div.appendChild(steps_div);
  });
  tags.forEach((item) => {
    var tag = document.createElement("p");
    tag.id = "tag";
    tag.innerHTML = item;
    tags_div.appendChild(tag);
  });
  ingredients.forEach((item) => {
    var ingredient = document.createElement("p");
    ingredient.innerHTML = item;
    ingredients_div.appendChild(ingredient);
  });
  div.appendChild(left_div);
  div.appendChild(right_div);
  return div;
}

/** Tells the server to delete the task. */
