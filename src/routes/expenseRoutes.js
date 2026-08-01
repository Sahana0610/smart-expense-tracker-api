const express = require("express");

const router = express.Router();

const expenseController = require("../controllers/expenseController");
const validateExpense = require("../middleware/validateExpense");

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Add a new expense
 *     tags:
 *       - Expenses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - category
 *               - date
 *             properties:
 *               title:
 *                 type: string
 *                 example: Pizza
 *               amount:
 *                 type: number
 *                 example: 350
 *               category:
 *                 type: string
 *                 example: Food
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-08-01"
 *     responses:
 *       201:
 *         description: Expense added successfully
 */
router.post("/", validateExpense, expenseController.addExpense);

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Get all expenses or filter by category
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter expenses by category
 *     responses:
 *       200:
 *         description: List of expenses
 */
router.get("/", (req, res) => {

    if (req.query.category) {
        return expenseController.getExpensesByCategory(req, res);
    }

    return expenseController.getAllExpenses(req, res);

});

/**
 * @swagger
 * /api/expenses/total:
 *   get:
 *     summary: Calculate total expenses
 *     tags:
 *       - Expenses
 *     responses:
 *       200:
 *         description: Total expenses
 */
router.get("/total", expenseController.getTotalExpenses);

/**
 * @swagger
 * /api/expenses/total/{category}:
 *   get:
 *     summary: Calculate total expenses by category
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense category
 *     responses:
 *       200:
 *         description: Total expenses for the category
 */
router.get("/total/:category", expenseController.getTotalByCategory);

/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete an expense
 *     tags:
 *       - Expenses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Expense ID
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 */
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;