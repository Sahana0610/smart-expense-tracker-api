const validateExpense = (req, res, next) => {

    const { title, amount, category, date } = req.body;

    // Validate title
    if (!title || title.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Title is required"
        });
    }

    // Validate amount
    if (amount === undefined || isNaN(amount) || Number(amount) <= 0) {
        return res.status(400).json({
            success: false,
            message: "Amount must be a positive number"
        });
    }

    // Validate category
    if (!category || category.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Category is required"
        });
    }

    // Validate date
    if (!date || isNaN(Date.parse(date))) {
        return res.status(400).json({
            success: false,
            message: "Invalid date"
        });
    }

    // Everything is valid
    next();
};

module.exports = validateExpense;