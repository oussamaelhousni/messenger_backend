import { Router } from "express";
import { getSocket } from "../controllers/socket.controller";
import { protect } from "../middlewares/protect";

const router = Router();

router.get("/getSocket", protect, getSocket);

export default router;
