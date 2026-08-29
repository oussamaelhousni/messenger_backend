# Current API

Base path: `/api/v1`

## Rate limiting

- General API limit: 100 requests per IP per 15 minutes.
- Authentication limit: 10 requests per IP per 15 minutes, in addition to the general limit.
- Limited responses return `429` with code `RATE_LIMIT_EXCEEDED` and standard rate-limit headers.

## Language

Set either header to choose the response language:

```text
x-language: en
```

Supported languages are `en`, `fr`, and `ar`. `Accept-Language` is used when `x-language` is absent. English is the fallback.

## Authentication

### Register

`POST /auth/register`

Request body:

```json
{
  "fullName": "Ada Lovelace",
  "email": "ada@example.com",
  "password": "correct horse battery staple"
}
```

Validation:

- `fullName`: string, 2 to 50 characters.
- `email`: valid email, normalized to lowercase.
- `password`: string, 8 to 72 characters.

Returns `201` with the created user and access and refresh tokens. The password is hashed before persistence and a welcome email is sent.

### Login

`POST /auth/login`

Request body:

```json
{
  "email": "ada@example.com",
  "password": "correct horse battery staple"
}
```

Returns `200` with the user and access and refresh tokens. Invalid credentials return `401`; an account locked after repeated failures returns `429`.

### Refresh token

`POST /auth/refresh-token`

Request body:

```json
{
  "refreshToken": "<refresh-jwt>"
}
```

Returns `200` with a new access token and refresh token. Invalid or expired tokens return `401`.

## Validation errors

Invalid request bodies return `400`:

```json
{
  "success": false,
  "message": "Validation failed",
  "issues": [
    {
      "field": "email",
      "message": "..."
    }
  ]
}
```

The exact messages depend on the selected language.
