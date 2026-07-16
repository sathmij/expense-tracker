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
ng serve
```

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


### What's partial


### What I'd do next with more time

