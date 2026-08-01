# API Reference — Smart Expense Tracker API

Detailed endpoint documentation, request/response examples, data model, and error handling for the Smart Expense Tracker API.

Base URL: `http://localhost:3000/api/expenses`

Interactive Swagger docs are also available at `http://localhost:3000/api-docs`.

---

## Table of Contents

- [Data Model](#data-model)
- [Endpoints](#endpoints)
  - [1. Add an Expense](#1-add-an-expense)
  - [2. Get All Expenses](#2-get-all-expenses)
  - [3. Filter by Category](#3-filter-by-category)
  - [4. Get Total Expenses](#4-get-total-expenses)
  - [5. Get Total by Category](#5-get-total-by-category)
  - [6. Delete an Expense](#6-delete-an-expense)
- [Input Validation Rules](#input-validation-rules)
- [Error Handling](#error-handling)
- [Example Requests (cURL)](#example-requests-curl)
- [Data Storage Notes](#data-storage-notes)

---

## Data Model

Each expense object follows this schema:

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string (UUID) | Auto-generated | Unique identifier for the expense |
| `title` | string | ✅ | Short description of the expense |
| `amount` | number | ✅ | Amount spent (must be positive) |
| `category` | string | ✅ | Expense category (e.g. Food, Travel, Entertainment) |
| `date` | string (`YYYY-MM-DD`) | ✅ | Date the expense occurred |

---

## Endpoints

### 1. Add an Expense

**POST** `/api/expenses`

**Request Body:**
```json
{
  "title": "Netflix",
  "amount": 199,
  "category": "Entertainment",
  "date": "2026-08-01"
}
```

**Success Response — `201 Created`:**
```json
{
  "id": "b3f1c2e4-1234-4a5b-9c6d-abcdef123456",
  "title": "Netflix",
  "amount": 199,
  "category": "Entertainment",
  "date": "2026-08-01"
}
```

---

### 2. Get All Expenses

**GET** `/api/expenses`

**Success Response — `200 OK`:**
```json
[
  {
    "id": "b3f1c2e4-1234-4a5b-9c6d-abcdef123456",
    "title": "Netflix",
    "amount": 199,
    "category": "Entertainment",
    "date": "2026-08-01"
  },
  {
    "id": "a1b2c3d4-5678-4e9f-8a1b-abcdef654321",
    "title": "Groceries",
    "amount": 1450,
    "category": "Food",
    "date": "2026-07-30"
  }
]
```

---

### 3. Filter by Category

**GET** `/api/expenses?category=Food`

Returns only expenses matching the given category.

**Success Response — `200 OK`:**
```json
[
  {
    "id": "a1b2c3d4-5678-4e9f-8a1b-abcdef654321",
    "title": "Groceries",
    "amount": 1450,
    "category": "Food",
    "date": "2026-07-30"
  }
]
```

---

### 4. Get Total Expenses

**GET** `/api/expenses/total`

**Success Response — `200 OK`:**
```json
{
  "total": 1649
}
```

---

### 5. Get Total by Category

**GET** `/api/expenses/total/{category}`

Example: `/api/expenses/total/Food`

**Success Response — `200 OK`:**
```json
{
  "category": "Food",
  "total": 1450
}
```

---

### 6. Delete an Expense

**DELETE** `/api/expenses/{id}`

Example: `/api/expenses/b3f1c2e4-1234-4a5b-9c6d-abcdef123456`

**Success Response — `200 OK`:**
```json
{
  "message": "Expense deleted successfully",
  "id": "b3f1c2e4-1234-4a5b-9c6d-abcdef123456"
}
```

**Not Found Response — `404 Not Found`:**
```json
{
  "error": "Expense not found"
}
```

---

## Input Validation Rules

Validation middleware enforces the following before an expense is created:

- `title` — required, non-empty string
- `amount` — required, must be a positive number
- `category` — required, non-empty string
- `date` — required, must be a valid date in `YYYY-MM-DD` format

Requests failing validation return a `400 Bad Request` with a descriptive error message.

---

## Error Handling

| Status Code | Meaning | Example Scenario |
|---|---|---|
| `400 Bad Request` | Invalid or missing input | Missing `title`, negative `amount` |
| `404 Not Found` | Resource doesn't exist | Deleting a non-existent expense ID |
| `500 Internal Server Error` | Unexpected server-side failure | File read/write error |

**Example error response:**
```json
{
  "error": "Amount must be a positive number"
}
```

---

## Example Requests (cURL)

**Add an expense:**
```bash
curl -X POST http://localhost:3000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{"title":"Netflix","amount":199,"category":"Entertainment","date":"2026-08-01"}'
```

**Get all expenses:**
```bash
curl http://localhost:3000/api/expenses
```

**Filter by category:**
```bash
curl "http://localhost:3000/api/expenses?category=Food"
```

**Get total expenses:**
```bash
curl http://localhost:3000/api/expenses/total
```

**Get total by category:**
```bash
curl http://localhost:3000/api/expenses/total/Food
```

**Delete an expense:**
```bash
curl -X DELETE http://localhost:3000/api/expenses/b3f1c2e4-1234-4a5b-9c6d-abcdef123456
```

---

## Data Storage Notes

- All expense data is stored in `expenses.json` at the project root.
- No external database is required — ideal for local development, demos, and learning purposes.
- This setup is **not recommended for production** or multi-user/concurrent-write scenarios. For production use, consider migrating to a proper database (MongoDB, PostgreSQL, etc.).