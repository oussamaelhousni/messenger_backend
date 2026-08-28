import { rateLimit } from "express-rate-limit";
import type { Request, Response } from "express";

const rateLimitHandler = (req: Request, res: Response) => {
  return res.status(429).json({
    success: false,
    code: "RATE_LIMIT_EXCEEDED",
    message: req.t("RATE_LIMIT_EXCEEDED"),
  });
};

// Protect every versioned API route from bursts while keeping normal usage responsive.
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: rateLimitHandler,
});

// Authentication endpoints need a tighter limit because they perform expensive work.
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: rateLimitHandler,
});
