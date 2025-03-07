//================= General interactable elements =====================
// The number inputs
const mortgageAmount = document.querySelector(".mortgage-amount input");

const mortgageTerm = document.querySelector(".mortgage-term input");

const interestRate = document.querySelector(".interest-rate input");

//button
const button = document.getElementById("calculate-button");
const clearAllButton = document.querySelector(".clear-all");

//======================= THE RESULTS ELEMENTS ==========================
//-------1
const monthlyRepaymnets = document.querySelector(
  ".monthly-payments-amount > p"
);

//--------2
const totalPayment = document.querySelector(".term-repayment-amount > p");

//========================= The two results pages =======================
const emptyResults = document.querySelector(".empty-results");
const completedResults = document.querySelector(".completed-results");

//========================== Function ================================//

// The variable which determines if the function is right or not
let isValid = false;

//============= The function which determines if the process is correct ============
function isTheProcessCorrect(input) {
  // Remove previous error messages
  const existingError =
    input.parentNode.parentNode.querySelector(".error-message");

  if (existingError) {
    existingError.remove();
    input.parentNode.classList.remove("error");
  }

  // Check if input is a number
  if (input.value.trim() === "") {
    input.parentNode.parentNode.insertAdjacentHTML(
      "beforeend",
      `<p class="error-message" style="color: red; font-size: 1rem;">You typed nothing</p>`
    );
    input.parentNode.classList.add("error");
    isValid = false;
  } else if (isNaN(input.value)) {
    input.parentNode.parentNode.insertAdjacentHTML(
      "beforeend",
      `<p class="error-message" style="color: red; font-size: 1rem;">You typed wrong</p>`
    );
    input.parentNode.classList.add("error");
    isValid = false;
  } else {
    input.parentNode.classList.remove("error");
    isValid = true;
  }
}

mortgageAmount.addEventListener("input", () =>
  isTheProcessCorrect(mortgageAmount)
);
mortgageTerm.addEventListener("input", () => isTheProcessCorrect(mortgageTerm));
interestRate.addEventListener("input", () => isTheProcessCorrect(interestRate));

function amountToPay() {
  const mortgageAmountValue = +mortgageAmount.value;
  const mortgageTermValue = +mortgageTerm.value;
  const interestRateValue = +interestRate.value;

  mortgageAmount.addEventListener("input", isTheProcessCorrect);

  //The two option inputs
  let mortgageType = document.querySelector(
    'input[name="mortgageType"]:checked'
  ).value;

  if (isValid) {
    if (mortgageType === "repayment") {
      //The rate
      const monthlyInterestRate = interestRateValue / 100 / 12;
      //The number of months to pay for
      const monthsTerm = mortgageTermValue * 12;
      //The bottom section of the fraction (operation)
      const denominator = 1 - Math.pow(1 + monthlyInterestRate, -monthsTerm);

      const monthlyFractionResult =
        (mortgageAmountValue * monthlyInterestRate) / denominator;

      const totalRepaymentAmount = monthlyFractionResult * monthsTerm;
      //- See form validation messages if any field is incomplete

      monthlyRepaymnets.textContent = Math.round(monthlyFractionResult);
      totalPayment.textContent = Math.round(totalRepaymentAmount);
    } else if (mortgageType === "interest-only") {
      const monthlyInterestToPay =
        (mortgageAmountValue * (interestRateValue / 100)) / 12;
      monthlyRepaymnets.textContent = Math.round(monthlyInterestToPay);

      const totalInterestsToPay = monthlyInterestToPay * 12 * mortgageTermValue;
      totalPayment.textContent = Math.round(
        totalInterestsToPay + mortgageAmountValue
      );
    }
    emptyResults.style.zIndex = "0";
    completedResults.style.zIndex = "1";
  } else {
    monthlyRepaymnets.textContent = "";
    totalPayment.textContent = "";
    emptyResults.style.zIndex = "1";
    completedResults.style.zIndex = "0";
  }
}
button.addEventListener("click", amountToPay);

//========= The button ====================
function clearAll() {
  mortgageAmount.value = "";
  mortgageTerm.value = "";
  interestRate.value = "";
  monthlyRepaymnets.textContent = "";
  totalPayment.textContent = "";
  const allErrorAlerts = document.querySelectorAll(".error-message");
  allErrorAlerts.textContent = "";
  isValid = false;
  //The two results pages
  emptyResults.style.zIndex = "1";
  completedResults.style.zIndex = "0";

  // Remove all error messages
  document
    .querySelectorAll(".error-message")
    .forEach((error) => error.remove());

  //For the two option section
  document
    .querySelectorAll('input[name="mortgageType"]')
    .forEach((radio) => (radio.checked = false));

  // Reset input borders
  const allInputContainers = document.querySelectorAll(".iput-boxes");
  allInputContainers.classList.remove();
}

clearAllButton.addEventListener("click", clearAll);
if (isValid) {
  emptyResults.style.zIndex = "0";
  completedResults.style.zIndex = "1"; // fix this here ===============================================================
}
