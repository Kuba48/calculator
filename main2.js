const inputEl = document.querySelector("#input");
const btnEl = document.querySelectorAll(".btn");
const customTip = document.querySelector("#customTip");
const errorEl = document.querySelector("#error");
const peopleEl = document.querySelector("#people");
const totalVal = document.querySelectorAll(".tipValue");
const resetEl = document.querySelector(".reset");
let billVal = 0;
let peopleVal = 1;
let tipVal = 0.15;
inputEl.addEventListener("input", validateBill);
peopleEl.addEventListener("input", setPeopleValue);
resetEl.addEventListener("click", handleReset);
customTip.addEventListener("input", tipCustomVal);

btnEl.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});
function handleClick(e) {
  btnEl.forEach((btn) => {
    btn.classList.remove("active");
    if (e.target.innerHTML === btn.innerHTML) {
      btn.classList.add("active");
      tipVal = parseFloat(btn.innerHTML) / 100;
    }
  });
  customTip.value = "";
  calculate();
}

function validateBill() {
  if (inputEl.value.includes(",")) {
    inputEl.value.replace(",", ".");
  }
  billVal = parseFloat(inputEl.value);
  calculate();
}

function tipCustomVal() {
  tipVal = parseFloat(customTip.value / 100);
  btnEl.forEach((btn) => {
    btn.classList.remove("active");
  });
  if (customTip.value !== 0) {
    calculate();
  }
}

function setPeopleValue() {
  peopleVal = parseFloat(peopleEl.value);
  if (peopleVal <= 0) {
    document.getElementById("error").style.color = "red";
    errorEl.innerHTML = "Nie może wynosić 0";
    document.getElementById("people").style.borderColor = "red";
    setTimeout(() => {
      errorEl.innerHTML = "";
    }, 2000);
  }
  calculate();
}

function calculate() {
  if (peopleVal >= 1) {
    let tip = (billVal * tipVal) / peopleVal;
    let totalAmount = (billVal * (tipVal + 1)) / peopleVal;
    totalVal[0].innerHTML = tip.toFixed(2) + " zł";
    totalVal[1].innerHTML = totalAmount.toFixed(2) + " zł";
  }
}

function handleReset() {
  inputEl.value = 0.0;
  validateBill();
  btnEl[-1].click();
  peopleEl.value = 1;
  setPeopleValue();
}