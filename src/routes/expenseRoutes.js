const express = require("express");

const router = express.Router();

// Temporary endpoint
router.get("/", (req, res) => {
    res.status(200).json({
        message: "Expense API working"
    });
});

module.exports = router;