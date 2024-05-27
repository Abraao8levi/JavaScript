document.addEventListener('DOMContentLoaded', () => {
    const balanceAmount = document.getElementById('balance-amount');
    const totalIncomeElement = document.getElementById('total-income');
    const totalExpensesElement = document.getElementById('total-expenses');
    const incomeList = document.getElementById('income-list');
    const expensesList = document.getElementById('expenses-list');
    const transactionForm = document.getElementById('transaction-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');

    let balance = 0;
    let income = 0;
    let expenses = 0;
    let transactions = [];

    const updateBalance = () => {
        balance = income - expenses;
        balanceAmount.textContent = `R$ ${balance.toFixed(2)}`;
        totalIncomeElement.textContent = `R$ ${income.toFixed(2)}`;
        totalExpensesElement.textContent = `R$ ${expenses.toFixed(2)}`;
    };

    const addTransactionToDOM = (transaction) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.description}: R$ ${transaction.amount.toFixed(2)}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => {
            removeTransaction(transaction.id);
        };

        listItem.appendChild(deleteButton);

        if (transaction.amount > 0) {
            incomeList.appendChild(listItem);
        } else {
            expensesList.appendChild(listItem);
        }
    };

    const addTransaction = (description, amount) => {
        const transaction = {
            id: transactions.length + 1,
            description,
            amount
        };
        transactions.push(transaction);

        if (amount > 0) {
            income += amount;
        } else {
            expenses += Math.abs(amount);
        }

        addTransactionToDOM(transaction);
        updateBalance();
    };

    const removeTransaction = (id) => {
        const transaction = transactions.find(t => t.id === id);

        if (transaction) {
            if (transaction.amount > 0) {
                income -= transaction.amount;
            } else {
                expenses -= Math.abs(transaction.amount);
            }

            transactions = transactions.filter(t => t.id !== id);
            renderTransactions();
            updateBalance();
        }
    };

    const renderTransactions = () => {
        incomeList.innerHTML = '';
        expensesList.innerHTML = '';
        transactions.forEach(addTransactionToDOM);
    };

    transactionForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const description = descriptionInput.value.trim();
        const amount = parseFloat(amountInput.value.trim());

        if (description && !isNaN(amount) && amount >= -100000 && amount <= 100000) {
            addTransaction(description, amount);
            descriptionInput.value = '';
            amountInput.value = '';
        }
    });
});
