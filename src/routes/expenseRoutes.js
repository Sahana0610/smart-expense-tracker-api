const express = require("express");

const router = express.Router();

const expenseController = require("../controllers/expenseController");
const validateExpense = require("../middleware/validateExpense");

router.post(
    "/",
    validateExpense,
    expenseController.addExpense
);


router.get("/", (req, res) => {

    if (req.query.category) {
        return expenseController.getExpensesByCategory(req, res);
    }

    return expenseController.getAllExpenses(req, res);

});

router.get("/total", expenseController.getTotalExpenses);

router.get("/total/:category", expenseController.getTotalByCategory);

router.delete("/:id", expenseController.deleteExpense);

module.exports = router;