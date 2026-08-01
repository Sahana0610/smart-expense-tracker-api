const expenseService = require("../services/expenseService");

/**
 * POST /expenses
 */
const addExpense = (req, res) => {

    const expense = expenseService.addExpense(req.body);

    res.status(201).json({
        success: true,
        message: "Expense added successfully",
        data: expense
    });

};

/**
 * GET /expenses
 */
const getAllExpenses = (req, res) => {

    const expenses = expenseService.getAllExpenses();

    res.status(200).json({
        success: true,
        count: expenses.length,
        data: expenses
    });

};

/**
 * DELETE /expenses/:id
 */
const deleteExpense = (req, res) => {

    const deleted = expenseService.deleteExpense(req.params.id);

    if (!deleted) {

        return res.status(404).json({
            success: false,
            message: "Expense not found"
        });

    }

    res.status(200).json({
        success: true,
        message: "Expense deleted successfully"
    });

};

module.exports = {
    addExpense,
    getAllExpenses,
    deleteExpense
};