# AI Usage Notes

AI tools were used throughout this project as a development assistant. This document breaks down what I wrote myself, where AI helped, what I changed and why, and what I chose not to use.
---

## 1. AI-Assisted vs. Self-Written Code

I used **Claude** as a development assistant throughout this assignment.

| Component | Origin |
|---|---|
| `Project structure`(Dividing Controllers,Routes,Services)| Written by me |
| `app.js` (Express app setup) | Written by me |
| `controllers/expenseController.js` | Written by me |
| `services/expenseService.js` | Written by me |
| File handler (reading/writing `expenses.json`) | Written by me |
| `tests/expense.test.js` (Jest + Supertest) | Written by me |
| `routes/expenseRoutes.js` | AI-assisted as swagger was included |
| `middleware/validation.js` | Written by me, AI tailored|
| Swagger/OpenAPI config (`swagger.js`) | AI-generated, then corrected by me to match my actual routes |

The core logic — controllers, services, file persistence, and tests — is entirely mine. Routes and validation middleware were built with AI assistance, and I reviewed and adjusted both to fit how the rest of the app was structured. Swagger was the one file I started from AI output rather than my own draft, since I hadn't written OpenAPI specs by hand before.

---

## 2. What I Validated, Tested, or Changed — and Why

- **Reviewed and adjusted AI-assisted routes.** I checked that `routes/expenseRoutes.js` correctly mapped each HTTP method and path to the right controller function, and matched what my controller actually expected.
- **Refined AI-assisted validation logic.** The validation middleware was built with AI's help, but I made sure it trimmed input and rejected empty-after-trim strings, rather than just checking for falsy values — this came up when testing edge cases like `"   "` as a title.
- **Fixed case-sensitive category filtering.** While testing manually, I found the category filter didn't match `?category=food` against a stored `"Food"` entry. I fixed this in the service layer by lowercasing both sides before comparing.
- **Kept business logic (controller/service/file handler) fully self-written.** I didn't use AI to draft these — I wrote and debugged them myself, which is why I was confident enough in them to build validation and routing around them.
- **Corrected the Swagger paths.** The AI-generated Swagger config referenced route params that didn't initially match my actual routes. I went through each path definition and fixed them to match.
- **Wrote and debugged my own test suite.** I wrote `tests/expense.test.js` myself, covering health check, validation failures, filtering, totals, and delete behavior (including deleting a non-existent ID).
- **Manual verification beyond automated tests.** I tested every endpoint in Postman, including invalid input and deleting non-existent IDs, and checked `expenses.json` directly after requests to confirm data was actually persisting.

---

## 3. AI Suggestions Not Used — and Why

- **Joi / express-validator** — AI suggested using a validation library instead of hand-written checks. I kept validation custom-built since the project is small enough that plain checks are easier to read and don't add an extra dependency.
- **Docker support** — not required by the assignment, and it would add setup overhead for something meant to run locally with just `npm install`.
- **Reusable Swagger `$ref` components** — reasonable for a larger API, but overkill here; it would have made `swagger.js` harder to follow for someone reviewing the project.

---

## Validation Process Summary

- Manually tested every endpoint in Postman, including edge cases.
- Verified `expenses.json` persistence directly after each request.
- Confirmed totals and category filtering against hand-calculated expected values.
- Ran `npm test` (my own test suite) repeatedly while fixing issues, until all tests passed with none skipped or failing.