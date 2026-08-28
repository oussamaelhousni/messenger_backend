import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { t } from "../i18n";
import chalk from "chalk";

const getErrorMessage = (err: AppError | Error, req: Request): string => {
  const language = req.language || "en";
  if (err instanceof AppError && err.code) {
    const translated = t(err.code, language, err.params);
    if (translated !== err.code) return translated;
  }
  return err.message;
};

const sendErrorDev = (err: AppError | Error, req: Request, res: Response) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const code = err instanceof AppError ? err.code : undefined;
  const message = getErrorMessage(err, req);

  console.error(chalk.red("💥 [ERROR - DEV]:"), err);

  return res.status(statusCode).json({
    success: false,
    statusCode,
    code,
    message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err: AppError | Error, req: Request, res: Response) => {
  const language = req.language || "en";

  if (err instanceof AppError) {
    const message = getErrorMessage(err, req);
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      code: err.code,
      message,
    });
  }

  // Programming or other unknown error: don't leak error details
  console.error(chalk.red("💥 [ERROR - PROD]:"), err);

  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: t("INTERNAL_SERVER_ERROR", language),
  });
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, req, res);
  } else {
    sendErrorDev(err, req, res);
  }
};

