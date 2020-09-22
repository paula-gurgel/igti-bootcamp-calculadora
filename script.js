window.addEventListener("load", start);

var inputA;
var inputB;
var button;
var resultContents = [
  {
    name: "Adição: ",
    calcFunction: sum,
    direction: "a_b",
    type: "number",
  },
  {
    name: "Subtração 1 (A - B): ",
    calcFunction: subtraction,
    direction: "a_b",
    type: "number",
  },
  {
    name: "Subtração 2 (B -A): ",
    calcFunction: subtraction,
    direction: "b_a",
    type: "number",
  },
  {
    name: "Multiplicação: ",
    calcFunction: multiplication,
    direction: "b_a",
    type: "number",
  },
  {
    name: "Divisão 1 (A / B): ",
    calcFunction: division,
    direction: "a_b",
    type: "number",
  },
  {
    name: "Divisão 2 (B / A): ",
    calcFunction: division,
    direction: "b_a",
    type: "number",
  },
  {
    name: "Quadrado de A: ",
    calcFunction: power,
    direction: "a",
    type: "number",
  },
  {
    name: "Quadrado de B: ",
    calcFunction: power,
    direction: "b",
    type: "number",
  },
  {
    name: "Fatorial de A: ",
    calcFunction: fatorial,
    direction: "a",
    type: "number",
  },
  {
    name: "Fatorial de B: ",
    calcFunction: fatorial,
    direction: "b",
    type: "number",
  },
  {
    name: "Divisores inteiros de A: ",
    calcFunction: intDivisors,
    direction: "a",
    type: "array",
  },
  {
    name: "Divisores inteiros de B: ",
    calcFunction: intDivisors,
    direction: "b",
    type: "array",
  },
];

function start() {
  preventFormSubmit();
  inputA = document.querySelector("#inputA");
  inputB = document.querySelector("#inputB");
  button = document.querySelector("#buttonCalc");
  button.addEventListener("click", atributeValue);
  inputA.focus();
}

function atributeValue() {
  var hasTextOnA = !!inputA.value && inputA.value.trim() !== "";
  var hasTextOnB = !!inputB.value && inputB.value.trim() !== "";
  if (!hasTextOnA || !hasTextOnB) {
    alert("Informe os dois números");
    return;
  }
  const numA = parseInt(inputA.value, 10);
  const numB = parseInt(inputB.value, 10);

  var calc = document.getElementById("calc");
  calc.innerHTML = "";
  resultContents.forEach((element) => {
    var div = document.createElement("div");

    var operationName = document.createElement("span");
    operationName.textContent = element.name;

    var result = document.createElement("span");
    result.textContent =
      element.type === "number"
        ? getResult(element, numA, numB)
        : getResultString(element, numA, numB);

    div.appendChild(operationName);
    div.appendChild(result);
    calc.appendChild(div);
  });
}

function preventFormSubmit() {
  var form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

function getResultString(element, a, b) {
  return element.direction === "a"
    ? convertArrayString(element.calcFunction(a))
    : convertArrayString(element.calcFunction(b));
}
function convertArrayString(array) {
  return `${array.join()} (${array.length})`;
  // return array.join() + " (" + array.length + ")";
}

function getResult(element, a, b) {
  var result;
  if (element.direction === "a_b") {
    result = element.calcFunction(a, b);
  }
  if (element.direction === "b_a") {
    result = element.calcFunction(b, a);
  }
  if (element.direction === "a") {
    result = element.calcFunction(a);
  }
  if (element.direction === "b") {
    result = element.calcFunction(b);
  }
  return formatNumber(result.toFixed(2));
}

function formatNumber(number) {
  return new Intl.NumberFormat("pt-BR").format(number);
}

function sum(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    return "Divisão por zero";
  }
  return a / b;
}

function power(a) {
  return a * a;
}

function intDivisors(a) {
  var index = 1;
  var result = [];
  while (index <= a) {
    if (a % index === 0) {
      result.push(index);
    }
    index++;
  }
  return result;
}

function fatorial(a) {
  var index = 1;
  var temp = 1;
  while (index < a) {
    temp = temp * (index + 1);

    index++;
  }
  return temp;
}

// function recursiveFact(n) {
//   if (n === 1) {
//     return 1;
//   }
//   return n * recursiveFact(n - 1);
// }
