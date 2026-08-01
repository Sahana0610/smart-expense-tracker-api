const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../expenses.json");

/**
 * Reads all expenses from expenses.json
 */
const readExpenses = () => {
    try {
        const data = fs.readFileSync(filePath, "utf-8");

        // If file is empty return []
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
};

/**
 * Writes updated expenses array to expenses.json
 */
const writeExpenses = (expenses) => {
    fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2));
};

module.exports = {
    readExpenses,
    writeExpenses
};