import type { TranslationKey } from "./en";

export const ar: Record<TranslationKey, string> = {
  // General & Errors
  EMAIL_ALREADY_EXISTS: "البريد الإلكتروني مستخدم بالفعل",
  INVALID_CREDENTIALS: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
  ACCOUNT_LOCKED:
    "محاولات تسجيل دخول فاشلة كثيرة. حاول مرة أخرى خلال {{hours}}س {{minutes}}د.",
  INVALID_REFRESH_TOKEN: "رمز التحديث غير صالح أو منتهي الصلاحية",
  REFRESH_TOKEN_REQUIRED: "رمز التحديث مطلوب",
  USER_NOT_FOUND: "المستخدم غير موجود",
  INVALID_INPUT: "مدخلات غير صالحة",
  VALIDATION_FAILED: "فشل التحقق من صحة البيانات",
  INTERNAL_SERVER_ERROR: "حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقًا.",
  USER_REGISTERED_SUCCESS: "تم تسجيل المستخدم بنجاح",
  LOGIN_SUCCESS: "تم تسجيل الدخول بنجاح",
  TOKEN_REFRESHED_SUCCESS: "تم تحديث الرمز بنجاح",
  FIELD_REQUIRED: "هذا الحقل مطلوب",

  // Validation keys
  FULL_NAME_REQUIRED: "الاسم الكامل مطلوب",
  NAME_MIN_LENGTH: "يجب أن يحتوي الاسم الكامل على حرفين على الأقل",
  NAME_MAX_LENGTH: "يجب ألا يتجاوز الاسم الكامل 50 حرفًا",
  EMAIL_REQUIRED: "البريد الإلكتروني مطلوب",
  INVALID_EMAIL: "عنوان بريد إلكتروني غير صالح",
  PASSWORD_REQUIRED: "كلمة المرور مطلوبة",
  PASSWORD_MIN_LENGTH: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل",
  PASSWORD_MAX_LENGTH: "كلمة المرور طويلة جدًا (بحد أقصى 72 حرفًا)",

  // Emails
  WELCOME_EMAIL_SUBJECT: "مرحبًا بك في تطبيق Messenger",
  WELCOME_EMAIL_TITLE: "مرحبًا {{name}}!",
  WELCOME_EMAIL_BODY: "شكرًا لتسجيلك في منصتنا.",
};
