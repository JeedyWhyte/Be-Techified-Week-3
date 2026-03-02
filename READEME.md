# TODO API

Overview
This repository is a small Express + Mongoose REST API for todos.

Project layout (files and responsibilities)
- **Entry point**: [server.js](server.js) — starts the server and connects the database.
- **App setup**: [src/app.js](src/app.js) — configures middleware and mounts routes.
- **Environment config**: [src/config/env.js](src/config/env.js) — loads and exposes environment variables.
- **DB connect**: [src/config/db.js](src/config/db.js) — MongoDB connection logic.
- **Routes**: [src/routes/todo.routes.js](src/routes/todo.routes.js) — Express router for `/todos` endpoints.
- **Controllers**: [src/controllers/todo.controllers.js](src/controllers/todo.controllers.js) — request handlers and business logic.
- **Model**: [src/models/todo.model.js](src/models/todo.model.js) — Mongoose schema and model for Todo.
- **Middlewares**:
	- [src/middlewares/logger.js](src/middlewares/logger.js) — request logger.
	- [src/middlewares/validator.js](src/middlewares/validator.js) — POST body validation.
	- [src/middlewares/patchValidator.js](src/middlewares/patchValidator.js) — PATCH body validation.
- **Package manifest**: [package.json](package.json)

Environment variables
- Create a `.env` file at the project root with at least:

```env
PORT=3000
MONGODB_URI = your_mongodb-uri
```

Run locally
- Install dependencies:

```bash
npm install
```

- Start in development (nodemon):

```bash
npm run dev
```

- Start production:

```bash
npm start
```

API quick guide
- Base URL: `http://localhost:<PORT>` (defaults to the `PORT` in `.env` or 3000)
- Todos endpoints (mounted at `/todos`):
	- `GET /todos` — list all todos
	- `GET /todos/completed` — list completed todos
	- `GET /todos/pending` — list pending todos
	- `GET /todos/:id` — get a todo by id
	- `POST /todos` — create a todo (body validation via `validator` middleware)
	- `PATCH /todos/:id` — update a todo (body validation via `patchValidator` middleware)
	- `DELETE /todos/:id` — delete a todo

Notes
- Keep secrets out of version control. Use a secure mechanism for production credentials.
- If the database connection fails with `ECONNREFUSED`, verify network/DNS and the values in `.env`.

Technologies used
- **Node.js** (v18+)
- **Express** for the web framework
- **Mongoose** for MongoDB object modeling
- **dotenv** for environment configuration
- **Joi** for request validation
- **cors**, **helmet** for middleware security
- **nodemon** as a development dependency

 