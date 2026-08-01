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

module.exports = {
    addExpense,
    getAllExpenses,
    deleteExpense
};