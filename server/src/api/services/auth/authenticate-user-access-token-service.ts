import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as env from "../../../config/env-config";
const authenticateUserAccessToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({ success: false, message: "missing access token in header" });
    }
    const requestToken: string = req.headers.authorization!.split(" ")[1];
    // verify token
    jwt.verify(requestToken, env.ACCESS_TOKEN! as string, (err, user) => {
      if (err) {
        return res.status(403).json({ success: false, message: `failed authentication` });
      }
      // @ts-ignore: missing prop error
      res.locals.userId = user.userId;
      next();
    });
  } catch {
    return res.status(500).json({ success: false, message: `an internal service error occured` });
  }
};

export default authenticateUserAccessToken;
