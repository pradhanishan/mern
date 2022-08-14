import { Router, Request, Response } from "express";
const path = require("path");

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../documentation/api-docs.html"));
});

export default router;
