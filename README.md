# Employee Management System (MERN)

Admin dashboard to manage employee records. MongoDB + Express + React + Node.

```
employee-management-system/
  backend/    REST API (Express, Mongoose, express-validator)
  frontend/   React dashboard (Vite)
```

## Quick start
1. Make sure MongoDB is running locally (or use an Atlas URI in `backend/.env`).
2. Backend
   ```bash
   cd backend && npm install && cp .env.example .env && npm run seed && npm run dev
   ```
   API: http://localhost:5000/api/employees
3. Frontend (new terminal)
   ```bash
   cd frontend && npm install && npm run dev
   ```
   App: http://localhost:5173

## API
| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/employees | Add employee |
| GET | /api/employees | List (search, status, department, page, limit, sort) |
| GET | /api/employees/:id | Details |
| PUT | /api/employees/:id | Update |
| DELETE | /api/employees/:id | Delete |

Errors: `{ success:false, message, errors? }` with 400 / 404 / 409 (duplicate email) / 500.

## Submission checklist
- Add screenshots of the dashboard, add form and details drawer to a `screenshots/` folder.
- Push to GitHub, or zip the folder without `node_modules`.
