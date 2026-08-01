# Smart Expense Tracker API

A RESTful API built with **Node.js** and **Express.js** to manage personal expenses. Supports adding, viewing, filtering, calculating totals, and deleting expenses. Data is stored in a local JSON file — no database required.

---

## Features

- Add a new expense
- View all expenses
- Filter expenses by category
- Calculate total expenses
- Calculate total expenses by category
- Delete an expense
- Input validation middleware
- Swagger API documentation
- Automated API tests using Jest and Supertest

---

## Tech Stack

- Node.js
- Express.js
- Swagger (OpenAPI)
- Jest
- Supertest

---

## Project Structure

```
smart-expense-tracker-api/
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── swagger.js
│
├── tests/
│   └── expense.test.js
│
├── expenses.json
├── package.json
├── README.md
└── AI_NOTES.md
```

---

## Installation

```bash
git clone <repository-url>
cd smart-expense-tracker-api
npm install
```

---

## Run the Server

```bash
npm run dev
```
or
```bash
npm start
```

Server runs at `http://localhost:3000`

---

## Swagger Documentation

```
http://localhost:3000/api-docs
```

---

## Run Tests

```bash
npm test
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/expenses` | Add a new expense |
| GET | `/api/expenses` | Get all expenses |
| GET | `/api/expenses?category=Food` | Filter by category |
| GET | `/api/expenses/total` | Get total expenses |
| GET | `/api/expenses/total/{category}` | Get total by category |
| DELETE | `/api/expenses/{id}` | Delete an expense |

---

## Example Expense

```json
{
  "title": "Netflix",
  "amount": 199,
  "category": "Entertainment",
  "date": "2026-08-01"
}
```

---

## Testing

Automated tests cover:
- API health check
- Add expense
- Input validation
- Get all expenses
- Filter by category
- Total expenses
- Delete expense

---
📄 Full API reference: [API.md](API.md)
## Author

Sahana Nandigavi
https://github.com/Sahana0610
Passionate Learner who loves to do vibe-coding and learn new technologies.
