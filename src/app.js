const express = require("express");

const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

// Middleware
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Smart Expense Tracker API is running 🚀"
    });
});

// Expense Routes
app.use("/api/expenses", expenseRoutes);

module.exports = app;