"use strict";

const submit = document.querySelector(".submit-btn");
const form = document.querySelector(".input-forms");

//calorie information
const macroValues = {
  proteinMin: 0.4,
  proteinMax: 1.6,
  fatMin: 15,
  fatMax: 35,
  activityMin: 1.2,
  activityMax: 1.9,
};

//change slider values
function updateTextInput(val, className) {
  document.querySelector(
    `.${className}`
  ).textContent = `${className}: ${normalize(val, className)}`;
}
updateTextInput(document.getElementById("protein").value, "protein");
updateTextInput(document.getElementById("fat").value, "fat");
updateTextInput(document.getElementById("activity").value, "activity");

//normalize sliders
function normalize(val, macro) {
  const min = macroValues[`${macro}Min`];
  const max = macroValues[`${macro}Max`];
  return Math.round(((max - min) * (val / 100) + min) * 100) / 100;
}

//shake
function shake(element) {
  const animation = [
    {
      transform: "translateX(10px)",
    },
    {
      transform: "translateX(-16px)",
    },
    {
      transform: "translateX(9px)",
    },
    {
      transform: "translateX(-3px)",
    },
  ];

  const settings = {
    duration: 250,
    iterations: 1,
  };

  element.animate(animation, settings);
}

//submit action
submit.addEventListener("click", function (e) {
  e.preventDefault();

  //check if all fields inputted
  let info = {
    weight: document.getElementById("weight"),
    height: document.getElementById("height"),
    age: document.getElementById("age"),
  };

  let validInputs = true;

  Object.values(info).forEach(function (item) {
    if (item.value === "" || isNaN(item.value)) {
      shake(item.parentElement);
      validInputs = false;
    }
  });

  if (!validInputs) {
    console.log("not valid inputs");
    return;
  }

  //take in all inputs
  info = {
    weight: weight.value,
    height: height.value,
    age: age.value,
    protein: normalize(document.getElementById("protein").value, "protein"),
    fat: normalize(document.getElementById("fat").value, "fat"),
    activity: normalize(document.getElementById("activity").value, "activity"),
  };

  // const calories = Math.floor(
  //   (66.5 + 13.75 * info.weight + 5.003 * info.height - 6.755 * info.age) *
  //     info.activity
  // );

  // const protein = Math.floor(info.protein * info.weight * 2.20462);
  // const fat = Math.floor(((info.fat / 100) * calories) / 9);
  // const carbs = Math.floor((calories - protein * 4 - fat * 9) / 4);

  const maintenance = new Calories(info, 0);
  const surplus = new Calories(info, 300);
  const defecit = new Calories(info, -300);

  console.log(info);
  console.log(
    maintenance.calories,
    maintenance.protein,
    maintenance.fat,
    maintenance.carbs
  );
  console.log(surplus.calories, surplus.protein, surplus.fat, surplus.carbs);
  console.log(defecit.calories, defecit.protein, defecit.fat, defecit.carbs);
});

class Calories {
  constructor(info, offset) {
    this.calories = Math.floor(
      (66.5 + 13.75 * info.weight + 5.003 * info.height - 6.755 * info.age) *
        info.activity +
        offset
    );
    this.protein = Math.floor(info.protein * info.weight * 2.20462);
    this.fat = Math.floor(((info.fat / 100) * this.calories) / 9);
    this.carbs = Math.floor(
      (this.calories - this.protein * 4 - this.fat * 9) / 4
    );
  }
}
