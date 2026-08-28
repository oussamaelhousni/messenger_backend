import { Router } from "express";
import { login, refreshToken, register } from "../controllers/auth.controller";
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from "../validation/user.validation";
import { validateBody } from "../middlewares/validateBody";

const router = Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.post("/refresh-token", validateBody(refreshTokenSchema), refreshToken);

export default router;
