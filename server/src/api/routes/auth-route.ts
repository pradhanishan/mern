import { Router } from "express";
import authenticateUserAccessToken from "../services/auth/authenticate-user-access-token-service";
import loginUser from "../services/auth/login-user-service";
import logoutUser from "../services/auth/logout-user-service";
import refreshUserAccessToken from "../services/auth/refresh-user-access-token-service";
import registerUser from "../services/auth/register-user-service";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshUserAccessToken);
router.delete("/logout", authenticateUserAccessToken, logoutUser);

export default router;
