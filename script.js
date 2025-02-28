//================= General interactable elements =====================
// The number inputs
const mortgageAmount = document.querySelector(".mortgage-amount input");

const mortgageTerm = document.querySelector(".mortgage-term input");

const interestRate = document.querySelector(".interest-rate input");

//The two option inputs
let mortgageType = document.querySelector(
  'input[name="mortgageType"]:checked'
).value;

//button
const button = document.getElementById("calculate-button");

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

  let monthlyFractionResult;
  let totalRepaymentAmount;

  if (mortgageType === "repayment") {
    //The rate
    const monthlyInterestRate = interestRateValue / 100 / 12;
    //The number of months to pay for
    const monthsTerm = mortgageTermValue * 12;
    //The bottom section of the fraction (operation)
    const denominator = 1 - Math.pow(1 + monthlyInterestRate, -monthsTerm);

    monthlyFractionResult =
      (mortgageAmountValue * monthlyInterestRate) / denominator;

    totalRepaymentAmount = monthlyFractionResult * monthsTerm;
    //- See form validation messages if any field is incomplete

    monthlyRepaymnets.textContent = Math.round(monthlyFractionResult);
    totalPayment.textContent = Math.round(totalRepaymentAmount);
  } else {
    monthlyFractionResult = (mortgageAmountValue * interestRateValue) / 12;
  }
}

button.addEventListener("click", amountToPay);
