
const expenseForm = document.getElementById("expenseForm");
const expenseTableBody = document.getElementById("expenseTableBody");
const totalExpensesEl = document.getElementById("totalExpenses");

// Global Variables
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Utility Functions
const updateTotalExpenses = () => {
  const total = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );
  totalExpensesEl.textContent = `$${total.toFixed(2)}`;
};

const saveToLocalStorage = () => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

const renderExpenses = () => {
  expenseTableBody.innerHTML = "";
  expenses.forEach((expense, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${expense.name}</td>
      <td>$${expense.amount}</td>
      <td>${expense.date}</td>
      <td>${expense.category}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" onclick="editExpense(${index})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteExpense(${index})">Delete</button>
      </td>
    `;
    expenseTableBody.appendChild(row);
  });
  updateTotalExpenses();
};

// Event Listeners
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("expenseName").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);
  const date = document.getElementById("expenseDate").value;
  const category = document.getElementById("expenseCategory").value;

  expenses.push({ name, amount, date, category });
  saveToLocalStorage();
  renderExpenses();

  expenseForm.reset();
});

// Edit Expense
window.editExpense = (index) => {
  const expense = expenses[index];

  document.getElementById("expenseName").value = expense.name;
  document.getElementById("expenseAmount").value = expense.amount;
  document.getElementById("expenseDate").value = expense.date;
  document.getElementById("expenseCategory").value = expense.category;

  expenses.splice(index, 1);
  saveToLocalStorage();
  renderExpenses();
};

// Delete Expense
window.deleteExpense = (index) => {
  expenses.splice(index, 1);
  saveToLocalStorage();
  renderExpenses();
};

// Initialize
renderExpenses();
