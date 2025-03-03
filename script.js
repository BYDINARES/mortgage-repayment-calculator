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

//========================== Function ================================//
function amountToPay() {
  const mortgageAmountValue = +mortgageAmount.value;
  const mortgageTermValue = +mortgageTerm.value;
  const interestRateValue = +interestRate.value;

  mortgageAmount.addEventListener("input", isTheProcessCorrect);

  //The two option inputs
  let mortgageType = document.querySelector(
    'input[name="mortgageType"]:checked'
  ).value;

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
  } else {
    monthlyRepaymnets.textContent = "";
    totalPayment.textContent = "";
  }
}

function isTheProcessCorrect() {
  const arrayOfInputElements = [mortgageAmount, mortgageTerm, interestRate];

  for (let i = 0; i < arrayOfInputElements.length; i++) {
    const input = arrayOfInputElements[i];

    if (isNaN(input.value) || input.value === "") {
      input.parentNode.parentNode.insertAdjacentHTML(
        "beforeend",
        "<p style='color: red; font-size: 1rem;'>You typed wrong</p>"
      );
    }
  }

  /*         input.insertAdjacentHTML(
          "afterend",
          `<p class="error-message" style="color:red;">Please enter a valid number</p>`
 */
}

button.addEventListener("click", amountToPay);
button.addEventListener("click", isTheProcessCorrect);

function clearAll() {
  mortgageAmount.value = "";
  mortgageTerm.value = "";
  interestRate.value = "";
  monthlyRepaymnets.textContent = "";
  totalPayment.textContent = "";
}
clearAllButton.addEventListener("click", clearAll);
