export const en = {
  // General & Errors
  EMAIL_ALREADY_EXISTS: "Email already exists",
  INVALID_CREDENTIALS: "Invalid email or password",
  ACCOUNT_LOCKED:
    "Too many failed login attempts. Try again in {{hours}}h {{minutes}}m.",
  INVALID_REFRESH_TOKEN: "Invalid or expired refresh token",
  REFRESH_TOKEN_REQUIRED: "Refresh token is required",
  USER_NOT_FOUND: "User not found",
  INVALID_INPUT: "Invalid input",
  VALIDATION_FAILED: "Validation failed",
  INTERNAL_SERVER_ERROR: "Something went wrong. Please try again later.",
  USER_REGISTERED_SUCCESS: "User registered successfully",
  LOGIN_SUCCESS: "Login successful",
  TOKEN_REFRESHED_SUCCESS: "Token refreshed successfully",
  FIELD_REQUIRED: "This field is required",

  // Validation keys
  FULL_NAME_REQUIRED: "Full name is required",
  NAME_MIN_LENGTH: "Full name must contain at least 2 characters",
  NAME_MAX_LENGTH: "Full name must contain at most 50 characters",
  EMAIL_REQUIRED: "Email is required",
  INVALID_EMAIL: "Invalid email address",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN_LENGTH: "Password must contain at least 8 characters",
  PASSWORD_MAX_LENGTH: "Password is too long (max 72 characters)",

  // Emails
  WELCOME_EMAIL_SUBJECT: "Welcome to Messenger App",
  WELCOME_EMAIL_TITLE: "Welcome {{name}}!",
  WELCOME_EMAIL_BODY: "Thank you for registering on our platform.",
};

export type TranslationKey = keyof typeof en;
