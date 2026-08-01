const validateExpense = (req, res, next) => {
    let { title, amount, category, date } = req.body;

    const errors = [];

    // Validate title
    if (typeof title !== "string" || title.trim() === "") {
        errors.push("Title is required and must be a non-empty string.");
    } else {
        req.body.title = title.trim();
    }

    // Validate amount
    amount = Number(amount);

    if (!Number.isFinite(amount) || amount <= 0) {
        errors.push("Amount must be a positive number.");
    } else {
        req.body.amount = amount;
    }

    // Validate category
    if (typeof category !== "string" || category.trim() === "") {
        errors.push("Category is required and must be a non-empty string.");
    } else {
        req.body.category = category.trim();
    }

    // Validate date
    if (!date || Number.isNaN(Date.parse(date))) {
        errors.push("Date must be a valid date (YYYY-MM-DD).");
    }

    // Return all validation errors together
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors
        });
    }

    next();
};

module.exports = validateExpense;