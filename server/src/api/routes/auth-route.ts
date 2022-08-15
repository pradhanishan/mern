import { Router } from "express";
import authenticateUserAccessToken from "../services/auth/authenticate-user-access-token-service";
import loginUser from "../services/auth/login-user-service";
import logoutUser from "../services/auth/logout-user-service";
import refreshUserAccessToken from "../services/auth/refresh-user-access-token-service";
import registerUser from "../services/auth/register-user-service";
// validations
import { body } from "express-validator";

const router = Router();

router.post(
  "/register",
  body("username").isAlphanumeric().isLength({ min: 1, max: 30 }),
  body("email").isEmail(),
  body("password").isStrongPassword(),
  registerUser
);

router.post(
  "/login",
  body("identifier").if(body("identifier").contains("@")).isEmail(),
  body("identifier").if(body("identifier").not().contains("@")).isAlphanumeric(),
  body("password").isStrongPassword(),
  loginUser
);
router.post("/refresh-token", refreshUserAccessToken);
router.delete("/logout", authenticateUserAccessToken, logoutUser);

export default router;
