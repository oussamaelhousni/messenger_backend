import type { TranslationKey } from "./en";

export const fr: Record<TranslationKey, string> = {
  // General & Errors
  EMAIL_ALREADY_EXISTS: "L'adresse e-mail existe déjà",
  INVALID_CREDENTIALS: "Email ou mot de passe incorrect",
  ACCOUNT_LOCKED:
    "Trop de tentatives de connexion échouées. Réessayez dans {{hours}}h {{minutes}}m.",
  INVALID_REFRESH_TOKEN: "Jeton de rafraîchissement invalide ou expiré",
  REFRESH_TOKEN_REQUIRED: "Le jeton de rafraîchissement est requis",
  USER_NOT_FOUND: "Utilisateur non trouvé",
  INVALID_INPUT: "Entrée invalide",
  VALIDATION_FAILED: "Échec de validation",
  INTERNAL_SERVER_ERROR: "Une erreur est survenue. Veuillez réessayer plus tard.",
  USER_REGISTERED_SUCCESS: "Utilisateur enregistré avec succès",
  LOGIN_SUCCESS: "Connexion réussie",
  TOKEN_REFRESHED_SUCCESS: "Jeton rafraîchi avec succès",
  FIELD_REQUIRED: "Ce champ est requis",
  RATE_LIMIT_EXCEEDED: "Trop de requêtes. Veuillez réessayer plus tard.",

  // Validation keys
  FULL_NAME_REQUIRED: "Le nom complet est requis",
  NAME_MIN_LENGTH: "Le nom complet doit contenir au moins 2 caractères",
  NAME_MAX_LENGTH: "Le nom complet doit contenir au maximum 50 caractères",
  EMAIL_REQUIRED: "L'adresse e-mail est requise",
  INVALID_EMAIL: "Adresse e-mail invalide",
  PASSWORD_REQUIRED: "Le mot de passe est requis",
  PASSWORD_MIN_LENGTH: "Le mot de passe doit contenir au moins 8 caractères",
  PASSWORD_MAX_LENGTH: "Le mot de passe est trop long (max 72 caractères)",

  // Emails
  WELCOME_EMAIL_SUBJECT: "Bienvenue sur Messenger App",
  WELCOME_EMAIL_TITLE: "Bienvenue {{name}} !",
  WELCOME_EMAIL_BODY: "Merci de vous être inscrit sur notre plateforme.",
};
