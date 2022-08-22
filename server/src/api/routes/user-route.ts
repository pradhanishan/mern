import { Router } from "express";
import { getUserLastPostedDate } from "../controllers/user-controller";
import authenticateUserAccessToken from "../services/auth/authenticate-user-access-token-service";

const router = Router();

router.get("/get-last-posted-date", authenticateUserAccessToken, getUserLastPostedDate);

export default router;
