import { en, type TranslationKey } from "./locales/en";
import { fr } from "./locales/fr";
import { ar } from "./locales/ar";

export type SupportedLanguage = "en" | "fr" | "ar";
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ["en", "fr", "ar"];
export const DEFAULT_LANGUAGE: SupportedLanguage = "en";

const translations: Record<SupportedLanguage, Record<TranslationKey, string>> = {
  en,
  fr,
  ar,
};

export const normalizeLanguage = (lang?: string | null): SupportedLanguage => {
  if (!lang) return DEFAULT_LANGUAGE;
  const cleanLang = lang.trim().toLowerCase().slice(0, 2) as SupportedLanguage;
  if (SUPPORTED_LANGUAGES.includes(cleanLang)) {
    return cleanLang;
  }
  return DEFAULT_LANGUAGE;
};

export const t = (
  key: string,
  lang: SupportedLanguage = DEFAULT_LANGUAGE,
  params?: Record<string, string | number>,
): string => {
  const dictionary = translations[lang] || translations[DEFAULT_LANGUAGE];
  let text = dictionary[key as TranslationKey] || translations[DEFAULT_LANGUAGE][key as TranslationKey] || key;

  if (params) {
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      text = text.replace(new RegExp(`{{${paramKey}}}`, "g"), String(paramValue));
    });
  }

  return text;
};

export default t;
