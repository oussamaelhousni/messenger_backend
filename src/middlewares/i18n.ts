import type { NextFunction, Request, Response } from "express";
import { normalizeLanguage, t, type SupportedLanguage } from "../i18n";

declare global {
  namespace Express {
    interface Request {
      language: SupportedLanguage;
      t: (key: string, params?: Record<string, string | number>) => string;
    }
  }
}

export const i18nMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const customHeaderLang = req.headers["x-language"] as string | undefined;
  const acceptLang = req.headers["accept-language"] as string | undefined;

  const rawLanguage = customHeaderLang || acceptLang;
  const language = normalizeLanguage(rawLanguage);

  req.language = language;
  req.t = (key: string, params?: Record<string, string | number>) => t(key, language, params);

  // Set Content-Language header on the response
  res.setHeader("Content-Language", language);

  next();
};
