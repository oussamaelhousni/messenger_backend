import { Router } from "express";
import { updateUser } from "../controllers/user.controller";
import { protect } from "../middlewares/protect";
import { validateBody } from "../middlewares/validateBody";
import { updateUserSchema } from "../validation/user.validation";

const router = Router();

router.patch("/me", protect, validateBody(updateUserSchema), updateUser);

export default router;
