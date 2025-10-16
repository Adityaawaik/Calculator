const calDisplayer = document.querySelector(".cal-displayer");

const digits = document.querySelectorAll(".cal-each-digit");

const operators = document.querySelectorAll(".operator");

const equalToBtn = document.querySelector(".equal-to");

const clearAllBtn = document.querySelector(".all-clear-digit");

const clearDigit = document.querySelector(".clear-digit");

let numbers = "";

clearAllBtn.addEventListener("click", () => {
  numbers = "";
  calDisplayer.value = numbers;
});

clearDigit.addEventListener("click", () => {
  numbers = numbers.slice(0, -1);
  calDisplayer.value = numbers;
});

digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    if (numbers.length < 25) {
      numbers += digit.textContent;
      calDisplayer.value = numbers;
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    const removeLastCharacter = numbers.slice(-1);

    if ("+-*/%".includes(removeLastCharacter)) {
      numbers = numbers.slice(0, -1) + operator.textContent;
    } else {
      numbers += operator.textContent;
    }
    calDisplayer.value = numbers;
  });
});

equalToBtn.addEventListener("click", () => {
  try {
    let expression = numbers.replace(/%/g, "/100");
    const tokens = expression.match(/[0-9.]+|[+\-*/]/g);
    if (!tokens) {
      calDisplayer.value = "Error";
      return;
    }
    const step1 = [];
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token === "*" || token === "/") {
        const prev = Number(step1.pop());
        const next = Number(tokens[++i]);
        const res = token === "*" ? prev * next : prev / next;
        step1.push(res);
      } else {
        step1.push(token);
      }
    }
    let result = Number(step1[0]);
    for (let i = 1; i < step1.length; i += 2) {
      const operator = step1[i];
      const next = Number(step1[i + 1]);
      if (operator === "+") result += next;
      if (operator === "-") result -= next;
    }
    calDisplayer.value = result;
    numbers = result.toString();
  } catch (error) {
    calDisplayer.value = "Error";
  }
});
