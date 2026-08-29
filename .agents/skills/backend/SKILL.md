# AGENTS.md - Backend API

## Stack

- Node.js (LTS)
- Express
- TypeScript (strict mode)
- Database layer: Drizzle ORM + PostgreSQL
- Validation: Zod
- Auth: JWT
- Realtime: Socket.IO
- File uploads: Multer
- Email: Nodemailer

## Structure

- `src/routes/` - Express routers, one file per resource
- `src/controllers/` - request handlers, no business logic here
- `src/services/` - business logic and database access
- `src/middlewares/`
- `src/types/` - shared TS types and interfaces
- `src/validators/` - Zod schemas

## Conventions

- Validate route input with Zod before hitting the controller
- Keep controllers thin and delegate work to services
- Throw `AppError` subclasses and handle them in `src/middlewares/errorHandler.ts`
- Wrap async handlers with `asyncHandler()` instead of raw `try/catch` blocks in controllers
- Use camelCase for files inside `src` and kebab-case for route paths

## Commands

- `npm run dev` - start the server with hot reload
- `npm run db:push` - push schema changes with Drizzle
- `npm run db:studio` - open Drizzle Studio
- `npm run lint` - run linting before committing
- `npm run typecheck` - run `tsc --noEmit`
- `npm test` - run the test suite when tests exist

## When adding a new endpoint

1. Add a Zod schema in `src/validators/`
2. Add a service function in `src/services/`
3. Add a controller in `src/controllers/`
4. Register the route in `src/routes/`
5. Write a Supertest test in `src/__tests__/`
6. Run lint, typecheck, and tests before considering it done
