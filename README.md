# Prep AI

> A full-stack Resume Analyzer web application that uses AI to analyze resumes and generate interview reports.

## Features

- Upload resumes and generate interview reports using AI
- User authentication (register, login)
- View and manage generated reports
- Simple, extensible backend (Node.js + Express) and frontend (React + Vite)

## Tech stack

- Backend: Node.js, Express, MongoDB
- Frontend: React, Vite
- AI service: integrated in `Backend/services/ai.service.js`

## Repository structure

- `Backend/` — API server, controllers, models, and services
- `frontend/` — React app (Vite) user interface

## Quick start

Prerequisites: `node` (v16+ recommended), `npm`, and a running MongoDB instance.

Backend

1. Open a terminal and run:

```bash
cd Backend
npm install
```

2. Create environment variables (example):

```bash
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

3. Start the backend:

```bash
npm run dev   # or: node server.js
```

Frontend

1. Open another terminal and run:

```bash
cd frontend
npm install
npm run dev
```

2. The frontend will typically be available at `http://localhost:5173` (Vite default).

## API overview

Key routes (see `Backend/routes`):

- `/api/auth` — authentication endpoints (`auth.routes.js`)
- `/api/interview` — interview/report endpoints (`interview.routes.js`)

Check the route files for exact endpoints and request/response details.

## Environment / Config

Backend configuration files live in `Backend/config` (for example database and env helpers). Common variables:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing auth tokens
- `PORT` — backend server port

## Development notes

- AI integration is implemented in `Backend/services/ai.service.js`.
- Middlewares are in `Backend/middlewares` (authentication, file handling).
- Models are in `Backend/models` (user, interview report, blacklist).

## Contributing

Feel free to open issues or pull requests. For major changes, please open an issue first to discuss the design.

## License

This project does not include a license file. Add a `LICENSE` if you plan to open-source it.

---

If you'd like, I can: add example `.env` files, create Postman collection, or update README with API examples. Reply which you'd prefer.
