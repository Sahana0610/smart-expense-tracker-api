const express = require("express");

const router = express.Router();

const expenseController = require("../controllers/expenseController");
const validateExpense = require("../middleware/validateExpense");

router.post(
    "/",
    validateExpense,
    expenseController.addExpense
);


router.get("/", expenseController.getAllExpenses);

router.delete("/:id", expenseController.deleteExpense);

module.exports = router;