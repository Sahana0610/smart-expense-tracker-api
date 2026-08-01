const request = require("supertest");
const fs = require("fs");
const path = require("path");

const app = require("../src/app");

const expensesFile = path.join(__dirname, "../expenses.json");

beforeEach(() => {
    // Reset the JSON file before every test
    fs.writeFileSync(expensesFile, "[]");
});

describe("Smart Expense Tracker API", () => {

    // -------------------- Health Check --------------------

    test("GET / should return API status", async () => {

        const res = await request(app).get("/");

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toContain("Smart Expense Tracker API");

    });

    // -------------------- Add Expense --------------------

    test("POST /api/expenses should add a new expense", async () => {

        const res = await request(app)
            .post("/api/expenses")
            .send({
                title: "Pizza",
                amount: 350,
                category: "Food",
                date: "2026-08-01"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.title).toBe("Pizza");

    });

    // -------------------- Validation --------------------

    test("POST /api/expenses should reject invalid expense", async () => {

        const res = await request(app)
            .post("/api/expenses")
            .send({
                title: "",
                amount: -100,
                category: "",
                date: "abc"
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);

    });

    // -------------------- Get All Expenses --------------------

    test("GET /api/expenses should return all expenses", async () => {

        await request(app)
            .post("/api/expenses")
            .send({
                title: "Coffee",
                amount: 150,
                category: "Food",
                date: "2026-08-01"
            });

        const res = await request(app).get("/api/expenses");

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.count).toBe(1);

    });

    // -------------------- Filter by Category --------------------

    test("GET /api/expenses?category=Food should filter expenses", async () => {

        await request(app)
            .post("/api/expenses")
            .send({
                title: "Pizza",
                amount: 300,
                category: "Food",
                date: "2026-08-01"
            });

        await request(app)
            .post("/api/expenses")
            .send({
                title: "Netflix",
                amount: 199,
                category: "Entertainment",
                date: "2026-08-01"
            });

        const res = await request(app)
            .get("/api/expenses?category=Food");

        expect(res.statusCode).toBe(200);
        expect(res.body.count).toBe(1);
        expect(res.body.data[0].category).toBe("Food");

    });

    // -------------------- Total Expenses --------------------

    test("GET /api/expenses/total should return total expenses", async () => {

        await request(app)
            .post("/api/expenses")
            .send({
                title: "Pizza",
                amount: 300,
                category: "Food",
                date: "2026-08-01"
            });

        await request(app)
            .post("/api/expenses")
            .send({
                title: "Burger",
                amount: 200,
                category: "Food",
                date: "2026-08-01"
            });

        const res = await request(app)
            .get("/api/expenses/total");

        expect(res.statusCode).toBe(200);
        expect(res.body.total).toBe(500);

    });

    // -------------------- Delete Expense --------------------

    test("DELETE /api/expenses/:id should delete an expense", async () => {

        const addRes = await request(app)
            .post("/api/expenses")
            .send({
                title: "Coffee",
                amount: 120,
                category: "Food",
                date: "2026-08-01"
            });

        const expenseId = addRes.body.data.id;

        const deleteRes = await request(app)
            .delete(`/api/expenses/${expenseId}`);

        expect(deleteRes.statusCode).toBe(200);
        expect(deleteRes.body.success).toBe(true);

        const getRes = await request(app)
            .get("/api/expenses");

        expect(getRes.body.count).toBe(0);

    });

});