const { v4: uuidv4 } = require("uuid");

const {
    readExpenses,
    writeExpenses
} = require("../utils/fileHandler");

/**
 * Create a new expense
 */
const addExpense = (expenseData) => {

    const expenses = readExpenses();

    const newExpense = {
        id: uuidv4(),
        ...expenseData
    };

    expenses.push(newExpense);

    writeExpenses(expenses);

    return newExpense;
};

/**
 * Get all expenses
 */
const getAllExpenses = () => {

    return readExpenses();

};

/**
 * Delete expense by ID
 */
const deleteExpense = (id) => {

    const expenses = readExpenses();

    const updatedExpenses = expenses.filter(
        expense => expense.id !== id
    );

    if (expenses.length === updatedExpenses.length) {

        return null;

    }

    writeExpenses(updatedExpenses);

    return true;
};

/**
 * Filter expenses by category
 */
const getExpensesByCategory = (category) => {

    const expenses = readExpenses();

    const searchCategory = category.trim().toLowerCase();

    return expenses.filter(expense =>
        expense.category.toLowerCase() === searchCategory
    );
};

/**
 * Calculate total of all expenses
 */
const getTotalExpenses = () => {

    const expenses = readExpenses();

    return expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );
};

/**
 * Calculate total for a category
 */
const getTotalByCategory = (category) => {

    const expenses = readExpenses();

    const searchCategory = category.trim().toLowerCase();

    return expenses
        .filter(expense =>
            expense.category.toLowerCase() === searchCategory
        )
        .reduce((total, expense) => total + expense.amount, 0);
};

module.exports = {
    addExpense,
    getAllExpenses,
    deleteExpense,
    getExpensesByCategory,
    getTotalExpenses,
    getTotalByCategory
};