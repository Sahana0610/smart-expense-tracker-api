# AI Usage Notes

## AI-assisted Components

I used ChatGPT,Claude(Anthropic)as a development assistant throughout this assignment, mainly to speed up boilerplate and sanity-check design decisions. Specific areas where I used it:

- Scaffolding the initial Express folder structure (`controllers/`, `middleware/`, `routes/`, `services/`).
- Getting a walkthrough of how routing should hand off to controllers, and controllers to services, since I hadn't structured a layered Express app before.
- A first draft of the validation middleware (checking required fields, types).
- Generating the initial Swagger/OpenAPI YAML — writing that by hand from scratch would have taken a lot longer.
- A starting set of Jest + Supertest test cases to cover the main endpoints.
- General code review — I pasted in a few files and asked if anything looked off or non-idiomatic.

## What I Reviewed and Changed

I didn't take any of the AI output as final. Specific changes I made after reviewing:

- The first draft put the total/category-sum logic directly inside the controller. I moved that into `services/expenseService.js` so the controller just handles req/res and the service owns the calculation logic.
- The category filter AI wrote did an exact string match, so `?category=food` wouldn't match `"Food"`. I changed it to lowercase both sides before comparing.
- Validation originally just checked `if (!title)`, which let through strings like `"   "`. I added `.trim()` checks and made sure empty-after-trim values get rejected with a 400 instead of silently passing.
- The Swagger config AI generated used a route structure that didn't match what I'd actually built (different param names), so I went through each path definition and corrected it to match my real routes.
- I went through all the generated test cases myself, ran them, and rewrote a couple of assertions that were checking the wrong status code (some expected 200 where I return 201 on create).

## AI Suggestions Not Used

A few things AI suggested that I intentionally left out:

- Using Joi or express-validator for validation — the assignment felt small enough that plain hand-written checks were easier to read and didn't need an extra dependency.
- Docker setup — not asked for, and it would have added setup overhead for something meant to run locally with `npm install`.
- More elaborate Swagger schemas with reusable `$ref` components — reasonable for a bigger API, but overkill here and would have made the swagger.js file harder to follow for someone reviewing it.

## Validation Process

Before considering anything done, I:

- Hit every endpoint manually in Postman, including edge cases (missing fields, invalid amount types, deleting an ID that doesn't exist).
- Checked `expenses.json` directly after each request to confirm it was actually persisting correctly, not just returning a response.
- Verified totals and category filtering against numbers I calculated by hand from the test data.
- Ran `npm test` repeatedly while fixing things, until every test passed with no skipped or failing cases.