import { Router } from "express";
import { addNewQuote, deleteQuote, getAllQuotes } from "../controllers/quotes-controller";
import authenticateUserAccessToken from "../services/auth/authenticate-user-access-token-service";
import { body } from "express-validator";
const router = Router();

router.get("/", authenticateUserAccessToken, getAllQuotes);
router.post("/", authenticateUserAccessToken, body("quote").isLength({ min: 1, max: 280 }), addNewQuote);
router.delete("/", authenticateUserAccessToken, body("id").not().isEmpty(), deleteQuote);
export default router;
