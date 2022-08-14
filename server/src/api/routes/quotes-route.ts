import { Router } from "express";
import { addNewQuote, deleteQuote, getAllQuotes } from "../controllers/quotes-controller";

const router = Router();

router.get("/", getAllQuotes);
router.post("/", addNewQuote);
router.delete("/", deleteQuote);
export default router;
