import type { NextFunction, Request, Response } from "express";
import type { ZodIssue, ZodTypeAny } from "zod";
import { t } from "../i18n";

const formatIssueMessage = (issue: ZodIssue, req: Request): string => {
  const language = req.language || "en";

  // Check if issue message is a translation key
  const translated = t(issue.message, language);
  if (translated !== issue.message) {
    return translated;
  }

  // Handle common Zod default codes if not already translated
  if (issue.code === "invalid_type" && issue.input === undefined) {
    const fieldName = issue.path[issue.path.length - 1];
    const specificKey = `${String(fieldName).toUpperCase()}_REQUIRED`;
    const specificTranslated = t(specificKey, language);
    if (specificTranslated !== specificKey) {
      return specificTranslated;
    }
    return t("FIELD_REQUIRED", language);
  }

  if (issue.code === "invalid_format" && issue.format === "email") {
    return t("INVALID_EMAIL", language);
  }

  return issue.message;
};

export const validateBody = (schema: ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const language = req.language || "en";
      const message = t("VALIDATION_FAILED", language);

      return res.status(400).json({
        success: false,
        message,
        issues: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: formatIssueMessage(issue, req),
        })),
      });
    }

    req.body = result.data;

    next();
  };
};

