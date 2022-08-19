import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as env from "../../../config/env-config";
import TResponse from "../../types/TResponse";
const authenticateUserAccessToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      let response: TResponse = {
        statusCode: 400,
        success: false,
        errors: [{ msg: "missing access token in header" }],
      };
      return res.status(400).json({ ...response });
    }
    const requestToken: string = req.headers.authorization!.split(" ")[1];
    // verify token
    jwt.verify(requestToken, env.ACCESS_TOKEN! as string, (err, user) => {
      if (err) {
        let response: TResponse = {
          statusCode: 403,
          success: false,
          errors: [{ msg: "failed authentication" }],
        };
        return res.status(403).json({ ...response });
      }
      // @ts-ignore: missing prop error
      res.locals.userId = user.userId;
      next();
    });
  } catch {
    let response: TResponse = {
      statusCode: 500,
      success: false,
      errors: [{ msg: "an internal service error occured" }],
    };
    return res.status(500).json({ ...response });
  }
};

export default authenticateUserAccessToken;
