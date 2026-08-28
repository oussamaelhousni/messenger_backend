import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route";
import { errorHandler } from "./middlewares/errorHandler";
import { i18nMiddleware } from "./middlewares/i18n";

const app = express();

app.use(express.json());
app.use(cors());
app.use(i18nMiddleware);

app.use("/api/v1/auth", authRouter);

// Global Error Handler Middleware
app.use(errorHandler);

export { app };
