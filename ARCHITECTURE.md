# Architecture and Request Flow

## HTTP startup

1. `src/index.ts` imports the configured Express app.
2. `src/app.ts` creates an HTTP server through `http.createServer(app)`.
3. The server listens on the validated `PORT` value.
4. `src/socket.ts` can attach a singleton Socket.IO server to the same HTTP server.

## Express middleware order

Requests currently pass through the following order:

1. `express.json()` parses JSON request bodies.
2. `cors()` enables cross-origin requests.
3. `i18nMiddleware` sets `req.language`, `req.t`, and `Content-Language`.
4. `apiRateLimiter` limits requests under `/api/v1` to 100 requests per IP per 15 minutes.
5. The matching router handles the request. Auth routes apply an additional limit of 10 requests per IP per 15 minutes.
6. `errorHandler` formats uncaught errors.

When adding global middleware, preserve this order unless the middleware has a documented dependency on another step.

## Authentication request flow

```text
HTTP request
  -> route
  -> validateBody(schema)
  -> controller
  -> service
  -> Drizzle/PostgreSQL or email provider
  -> controller response
```

Registration and login return access and refresh JWTs. Access tokens expire after 15 minutes; refresh tokens expire after 7 days. Login failures are tracked on the user record and the account is locked after three failed attempts for three hours.

## Error flow

- Expected application failures use `AppError(statusCode, code, params)`.
- Controller promise failures are forwarded by `asyncHandler`.
- `errorHandler` translates known error codes using the request language.
- Development responses include stack and error details.
- Production responses hide details for unknown errors.

## Configuration flow

`src/env.ts` chooses `.env.development` or `.env.production` from `NODE_ENV`, loads it with dotenv, validates the required values with Zod, and exits during startup if validation fails. Database and email modules import the validated configuration.

## Current boundaries

- Only authentication HTTP routes are registered today.
- Database schemas for conversations and messages exist, but corresponding HTTP controllers and routes are not present.
- Socket.IO initialization is available as a wrapper, but event handlers are not defined in this repository yet.
- Rate-limit counters use the package default in-memory store. Use a shared store such as Redis before running multiple API instances.
