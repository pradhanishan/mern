import { Router } from "express";
import registerUser from "../services/auth/register-user-service";

const router = Router();

router.post("/register", registerUser);

export default router;
