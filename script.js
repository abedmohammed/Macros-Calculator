"use strict";

const submit = document.querySelector(".submit-btn");
const form = document.querySelector(".input-forms");

submit.addEventListener("click", function (e) {
  e.preventDefault();
  form.classList.add("hide");
  const info = {
    weight: document.getElementById("weight").value,
    height: document.getElementById("height").value,
    age: document.getElementById("age").value,
    protein: document.getElementById("protein").value,
    fat: document.getElementById("fat").value,
    activity: document.getElementById("activity").value,
  };
  console.log(info);
});

// testing
document.addEventListener("keydown", function (e) {
  if (e.key === "e") {
    form.classList.remove("hide");
  }
});
