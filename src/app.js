const express = require("express");
const swaggerUi = require("swagger-ui-express");

const expenseRoutes = require("./routes/expenseRoutes");
const swaggerSpec = require("./swagger");

const app = express();

/* ----------------------------- Middleware ----------------------------- */

// Parse incoming JSON requests
app.use(express.json());

/* ------------------------- Swagger Documentation ---------------------- */

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

/* --------------------------- Health Check ----------------------------- */

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Smart Expense Tracker API is running 🚀",
        version: "1.0.0"
    });
});

/* ---------------------------- API Routes ------------------------------ */

app.use("/api/expenses", expenseRoutes);

/* ------------------------ 404 Route Handler --------------------------- */

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

/* ---------------------- Global Error Handler -------------------------- */

app.use((err, req, res, next) => {
    console.error("Error:", err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;