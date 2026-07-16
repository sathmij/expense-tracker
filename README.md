# Personal Expense Tracker

A full-stack personal expense tracker. Users can record expenses (amount,
category, date, description), view them in a list, edit or delete entries,
and see a total summary overall and broken down by category.

## Tech Stack

- **Backend:** Java 17, Spring Boot 3, Spring Data JPA, H2 (in-memory database), Maven
- **Frontend:** Angular, TypeScript

## Running the Backend

From a clean checkout:

```bash
cd backend
mvn spring-boot:run
```

- API runs at `http://localhost:8080`
- H2 console available at `http://localhost:8080/h2-console`

## Running the Frontend

From a clean checkout, in a separate terminal:

```bash
cd frontend
npm install
npm start
```

(`npm start` runs `ng serve` via the local Angular CLI in `devDependencies` — the Angular CLI isn't installed globally here, so a bare `ng serve` won't work unless you've installed it yourself. `npx ng serve` works too.)

- App runs at `http://localhost:4200`

## REST API

Base path: `/api/expenses`

| Method | Path                        | Purpose                                   |
|--------|-----------------------------|--------------------------------------------|
| GET    | `/api/expenses`             | List all expenses                          |
| GET    | `/api/expenses/{id}`        | Get a single expense by ID                 |
| POST   | `/api/expenses`             | Create a new expense                       |
| PUT    | `/api/expenses/{id}`        | Update an existing expense                 |
| DELETE | `/api/expenses/{id}`        | Delete an expense                          |
| GET    | `/api/expenses/summary`     | Get total summary (overall and per category) |

## Status

### What's done

All Must-Have requirements from the brief are complete:
- Add, view, edit, and delete expenses (amount, category, date, description)
- Fixed expense categories (Food, Transport, Bills, Entertainment, Health, Other)
- Total summary, overall and per category
- REST API backend consumed by the Angular frontend
- Input validation (amount required and positive), enforced on both backend and frontend

Also done, from good-to-haves:
- A few backend unit tests (JUnit 5 + Mockito)

### What's partial / not done

Good-to-Have items yet to be implemented:
- Filter/search by category or date range
- Sort the list (by date, amount, or category)
- Spending summary chart
- Filter totals by month or date range
- User-managed categories
- Pagination
- Authentication (login)
- CSV export