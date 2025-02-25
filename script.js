//- See form validation messages if any field is incomplete
//================= General interactable elements =====================
// The number inputs
const mortgageAmount = document.getElementsByClassName("mortgage-amount");
const mortgageAmountValue = +mortgageAmount.value;

const mortgageTerm = document.getElementsByClassName("mortgage-term");
const mortgageTermValue = +mortgageTerm.value;

const interestRate = document.getElementsByClassName("interest-rate");
const interestRateValue = +interestRate.value;

//The two option inputs

//BUTTON
const button = document.getElementById("calculate-button");

//============== The bottom section of interactable elements ===============
//-------1
const monthlyRepaymnets = document.getElementsByClassName(
  ".monthly-payments-amount > p"
);
monthlyRepaymnets.textContent = "";
//--------1
const totalPayment = document.getElementsByClassName(
  ".term-repayment-amount > p"
);
totalPayment.textContent = "";

//============================= Functions =================================
function amountToPay() {
  //The rate
  const monthlyInterestRate = interestRateValue / 12;
  //The number of months to pay for
  const monthsTerm = mortgageTermValue * 12;
}
