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

const getExpensesByCategory = (req, res) => {

    const expenses = expenseService.getExpensesByCategory(
        req.query.category
    );

    res.status(200).json({
        success: true,
        count: expenses.length,
        data: expenses
    });

};

const getTotalExpenses = (req, res) => {

    const total = expenseService.getTotalExpenses();

    res.status(200).json({
        success: true,
        total
    });

};

const getTotalByCategory = (req, res) => {

    const total = expenseService.getTotalByCategory(
        req.params.category
    );

    res.status(200).json({
        success: true,
        category: req.params.category,
        total
    });

};

module.exports = {
    addExpense,
    getAllExpenses,
    deleteExpense,
    getExpensesByCategory,
    getTotalExpenses,
    getTotalByCategory
};