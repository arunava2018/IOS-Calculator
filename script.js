const numbers = document.querySelectorAll(".number");
const result = document.querySelector(".result");
const clear = document.querySelector(".clear");
const equals = document.querySelector(".equals");
const signs = document.querySelectorAll(".sign");
const negative = document.querySelector(".negative");
const percent = document.querySelector(".percent");
const dot = document.querySelector(".dot");
// console.log(result);
let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let sign = "";
let resultVal = 0;
for (let i = 0; i < numbers.length; i++) {
  // console.log(numbers[i]);
  numbers[i].addEventListener("click", (e) => {
    let num = e.target.getAttribute("value");
    // console.log(num);
    clear.innerHTML = "C";
    if (isFirstValue == false) {
      getFirstValue(num);
    }
    if (isSecondValue == false) {
      getSecondValue(num);
    }
  });
}

function getFirstValue(num) {
  result.innerHTML = "";
  if (firstValue.length < 9) {
    firstValue += num;
  }
  result.innerHTML = firstValue;
}

function getSecondValue(num) {
  if (firstValue != "" && sign != "") {
    if (secondValue.length < 9) {
      secondValue += num;
    }
    result.innerHTML = secondValue;
  }
}

function getSign() {
  for (let i = 0; i < signs.length; i++) {
    signs[i].addEventListener("click", (e) => {
      sign = e.target.getAttribute("value");
      isFirstValue = true;
    });
  }
}

getSign();
equals.addEventListener("click", (e) => {
  result.innerHTML = "";
  if (sign == "+") {
    resultVal = +firstValue + +secondValue;
  } else if (sign == "-") {
    resultVal = firstValue - secondValue;
  } else if (sign == "*") {
    resultVal = firstValue * secondValue;
  } else if (sign == "/") {
    resultVal = firstValue / secondValue;
  }
  if (!Number.isInteger(resultVal)) {
    resultVal = (Math.round(resultVal * 100) / 100).toFixed(2);
  }
  if (resultVal > Math.pow(10, 9)) {
    result.classList.add("size");
  }
  if (resultVal > Math.pow(10, 15)) {
    alert("Input too large");
    result.innerHTML = 0;
    result.classList.remove("size");
    firstValue = "";
    isFirstValue = false;
    secondValue = "";
    isSecondValue = false;
    sign = "";
    resultVal = 0;
    clear.innerHTML = "AC";
  } else {
    result.innerHTML = resultVal;
    firstValue = resultVal;
    secondValue = "";
    console.log(resultVal);
  }
});

negative.addEventListener("click", (e) => {
  if (firstValue != "" && firstValue >= 0) {
    firstValue *= -1;
    result.innerHTML = firstValue;
  } else if (firstValue != "" && firstValue < 0) {
    firstValue *= -1;
    result.innerHTML = firstValue;
  }
});

percent.addEventListener("click", () => {
  let percentResult = firstValue / 100;
  result.innerHTML = percentResult;
  firstValue = percentResult;
});

clear.addEventListener("click", () => {
  result.innerHTML = 0;
  result.classList.remove("size");
  firstValue = "";
  isFirstValue = false;
  secondValue = "";
  isSecondValue = false;
  sign = "";
  resultVal = 0;
  clear.innerHTML = "AC";
});

dot.addEventListener("click", () => {
  if (!firstValue.includes(".")) firstValue += ".";
  if (isFirstValue == true && !secondValue.includes(".")) secondValue += ".";
});
