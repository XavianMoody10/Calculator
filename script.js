"use strict";

function operateCalculator() {
  const input = document.querySelector(".calculator__input");
  const btns = document.querySelectorAll(".calculator__btn");
  const equalBtn = document.querySelector(".calculator__btn--equal");
  const clearBtn = document.querySelector(".calculator__btn--clear");
  const clearHistoryBtn = document.querySelector(".history-clrbtn");
  let formula = "";
  let result = "";

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (result && input.value) {
        formula = result.toString();
        result = "";
      }

      if (btn === equalBtn || btn === clearBtn) {
        return;
      } else {
        formula += btn.textContent.trim();
        input.value = formula;
      }
    });
  });

  // Convert formula into readable string and solve it
  function solveEquation() {
    // Check if the first character of the test string is one of the specified characters
    const regex = /^[+\-×÷]/;

    const validFormulaCheck = regex.test(formula);

    if (validFormulaCheck) {
      return;
    } else {
      // Replace all '×' with '*'
      formula = formula.replace(/×/g, "*");

      // Replace all '÷' with '/'
      formula = formula.replace(/÷/g, "/");

      result = new Function(`return ${formula} + 0`)();

      input.value = `${result}`;

      addToHistory(`${formula} = ${result}`);
    }
  }

  // Reset Calculator
  function resetCalculator() {
    formula = "";
    result = "";
    input.value = "";
  }

  // Add to history
  function addToHistory(str) {
    const list = document.querySelector(".history-list");
    const strSpace = str.replace(/([+=])/g, " $1 ");

    const html = `<li class="history-item">
    <p class="history-item__text">${strSpace}</p>
    <i class="fa-solid fa-trash history-item__trash-icon"></i>
  </li>`;

    list.insertAdjacentHTML("beforeend", html);

    removeItemFromHistory();
  }

  // Removes specific item from history
  function removeItemFromHistory() {
    const trashIcon = document.querySelectorAll(".history-item__trash-icon");
    const items = document.querySelectorAll(".history-item");

    trashIcon.forEach((t, i) => {
      t.addEventListener("click", () => {
        items[i].remove();
      });
    });
  }

  // Clears history completely
  function clearHistory() {
    const items = document.querySelectorAll(".history-item");

    items.forEach((i) => {
      i.remove();
    });
  }

  input.addEventListener("keydown", function (event) {
    // Check if user types a letter(uppercase and lowercase)
    if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122)
    ) {
      event.preventDefault();
    }

    // Convert symbols to operation strings
    if (event.key === "*") {
      event.preventDefault();
      event.target.value = event.target.value + "×";
    } else if (event.key === "/") {
      event.preventDefault();
      event.target.value = event.target.value + "÷";
    }
  });

  input.addEventListener("input", (event) => {
    formula = event.target.value;
    result = "";
  });

  equalBtn.addEventListener("click", solveEquation);
  clearBtn.addEventListener("click", resetCalculator);
  clearHistoryBtn.addEventListener("click", clearHistory);
}

operateCalculator();
