let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateSummary() {
  let income = 0, expenses = 0;
  transactions.forEach(t => {
    if (t.type === 'income') income += t.amount;
    else expenses += t.amount;
  });

  document.getElementById("income").textContent = income;
  document.getElementById("expenses").textContent = expenses;
  document.getElementById("balance").textContent = income - expenses;
}

function renderTransactions() {
  const list = document.getElementById("transaction-list");
  list.innerHTML = "";
  transactions.forEach((t, index) => {
    const item = document.createElement("li");
    item.classList.add(t.type);
    item.innerHTML = `
      <span>${t.date} | ${t.description} : ₹${t.amount}</span>
      <button onclick="deleteTransaction(${index})">🗑️</button>
    `;
    list.appendChild(item);
  });
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTransactions();
  updateSummary();
}

document.getElementById("transaction-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const date = document.getElementById("date").value;

  if (!description || !amount || !date) return alert("Please fill all fields!");

  const transaction = { description, amount, type, date };
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  this.reset();
  renderTransactions();
  updateSummary();
});

renderTransactions();
updateSummary();
