# Messenger Backend

TypeScript backend for a messenger application. The HTTP API is built with Express, data access uses Drizzle ORM with PostgreSQL, authentication uses JWTs, and Socket.IO is available for realtime features.

## Requirements

- Node.js
- pnpm
- PostgreSQL
- SMTP credentials for Gmail email delivery

## Setup

Install dependencies:

```bash
pnpm install
```

Create the environment file selected by `NODE_ENV`:

- `.env.development` when `NODE_ENV=development`
- `.env.production` when `NODE_ENV=production`

Required variables:

```text
DB_URL=postgresql://user:password@localhost:5432/messenger
PORT=3000
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-smtp-or-app-password
JWT_SECRET=your-access-token-secret
JWT_REFRESH_SECRET=your-refresh-token-secret
```

Start the development server:

```bash
pnpm dev
```

The API is mounted under `/api/v1`.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server with `tsx` watch mode |
| `pnpm db:push` | Push the Drizzle schema to PostgreSQL |
| `pnpm db:studio` | Open Drizzle Studio |
| `pnpm exec tsc --noEmit` | Type-check the project |

## Documentation

- [Project structure](PROJECT_STRUCTURE.md)
- [Architecture and request flow](ARCHITECTURE.md)
- [Current API contract](API.md)
