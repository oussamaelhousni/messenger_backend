import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.route";
import { errorHandler } from "./middlewares/errorHandler";
import { i18nMiddleware } from "./middlewares/i18n";
import { apiRateLimiter } from "./middlewares/rateLimit";
import socketRouter from "./routes/socket.route";
import userRouter from "./routes/user.route";

const app = express();

app.use(express.json());
app.use(cors());
app.use(i18nMiddleware);
app.use("/api", morgan("dev"));
app.use("/api/v1", apiRateLimiter);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/socket", socketRouter);
app.use("/api/v1/users", userRouter);

// Global Error Handler Middleware
app.use(errorHandler);

export { app };
