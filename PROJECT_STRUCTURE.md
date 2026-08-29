# Project Structure

## Runtime entry points

| Path | Responsibility |
| --- | --- |
| `src/index.ts` | Creates the HTTP server and listens on `env.PORT` |
| `src/app.ts` | Creates the Express app and registers global middleware and routes |
| `src/socket.ts` | Provides a singleton Socket.IO server wrapper |
| `src/env.ts` | Loads the environment file and validates configuration with Zod |

## Source directories

```text
src/
  controllers/       HTTP handlers; translates requests into service calls
  db/
    index.ts         PostgreSQL pool and Drizzle client
    schemas/         Drizzle table definitions
    relations/       Database relation definitions
  i18n/              Supported languages and translation lookup
    locales/         English, French, and Arabic translations
  middlewares/       Express middleware for validation, language, and errors
  routes/            HTTP route registration
  services/          Business logic and database operations
  utils/             Shared helpers such as JWT, email, errors, and async handling
  validation/        Zod request schemas and inferred input types
```

## Top-level files

| Path | Responsibility |
| --- | --- |
| `package.json` | Dependencies and package scripts |
| `pnpm-lock.yaml` | Locked dependency versions |
| `drizzle.config.ts` | Drizzle Kit PostgreSQL configuration |
| `tsconfig.json` | TypeScript compiler configuration |

## Conventions

- Routes define URL paths and connect middleware to controllers.
- Controllers handle HTTP input and output but delegate business logic to services.
- Services access Drizzle tables and throw `AppError` for expected failures.
- `asyncHandler` forwards rejected controller promises to `errorHandler`.
- Request validation runs before controllers through `validateBody`.
- Error and validation codes are translated using the request language.

## Database models

- `users`: accounts, password hashes, login-attempt tracking, and timestamps.
- `conversations`: conversation metadata and last-message summary.
- `messages`: messages linking sender, recipient, and conversation.
- `users_conversations`: many-to-many membership between users and conversations.
