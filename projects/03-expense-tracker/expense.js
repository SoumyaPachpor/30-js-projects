const form = document.getElementById("expense-form");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const expensesList = document.getElementById("expenses-list");
const totalEl = document.getElementById("total");
const runningTotalE = document.getElementById("running-total");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

let expenses = JSON.parse(localStorage.getItem("data")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const desc = descInput.value;
  const amount = Number(amountInput.value);
  const category = categoryInput.value;
  expenses.push({ desc, amount, category });
  descInput.value = "";
  amountInput.value = "";
  saveData();
  showExpenses();
});

const showExpenses = () => {
  expensesList.innerHTML = "";
  const filtered = expenses.filter((exp) => exp.amount >= 100);
  filtered.map((exp, idx) => {
    const div = document.createElement("div");
    div.className = "expense";
    div.innerHTML = `<span>${exp.desc} (${exp.category}) - ₹${exp.amount}</span>
                     <button onclick="deleteExp(${idx})">❌</button>`;
    expensesList.appendChild(div);
  });
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  totalEl.textContent = total;
};

const deleteExp = (idx) => {
  expenses.splice(idx, 1);
  saveData();
  showExpenses();
};

const saveData = () => {
  localStorage.setItem("data", JSON.stringify(expenses));
};

showExpenses();

setInterval(() => {
  const runningTotal = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  runningTotalE.textContent = runningTotal;
}, 3000);