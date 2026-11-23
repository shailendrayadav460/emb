# Employee Management System - Backend

Node.js + Express + MongoDB (Mongoose) REST API.

## Setup
```bash
npm install
cp .env.example .env     # edit MONGO_URI if needed
npm run dev              # or: npm start
npm run seed             # optional: load sample employees
```
Requires Node 18+ and a running MongoDB (local or Atlas).

## Environment variables
| Key | Description | Default |
|---|---|---|
| PORT | API port | 5000 |
| MONGO_URI | MongoDB connection string | mongodb://127.0.0.1:27017/employee_management |
| CLIENT_URL | Allowed CORS origin(s), comma separated | http://localhost:5173 |

## Endpoints
| Method | URL | Description |
|---|---|---|
| GET | /api/health | Health check |
| POST | /api/employees | Add employee |
| GET | /api/employees | List (query: `search`, `status`, `department`, `page`, `limit`, `sort`) |
| GET | /api/employees/:id | Employee details |
| PUT | /api/employees/:id | Update employee |
| DELETE | /api/employees/:id | Delete employee |

Employee body: `name, email, phone, department, designation, joiningDate, status (Active|Inactive)`

Errors return `{ success: false, message, errors? }` with 400 (validation), 404, 409 (duplicate email) or 500.
