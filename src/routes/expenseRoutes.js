const express = require("express");

const router = express.Router();

// Temporary endpoint
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Smart Expense Tracker API is running",
        version: "1.0.0"
    });
});

module.exports = router;