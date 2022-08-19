import { Request, Response } from "express";
import * as env from "../../../config/env-config";
import jwt from "jsonwebtoken";
import TResponse from "../../types/TResponse";

const refreshUserAccessToken = (req: Request, res: Response) => {
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
    jwt.verify(requestToken, env.REFRESH_TOKEN as string, (err, user) => {
      if (err) {
        let response: TResponse = {
          statusCode: 403,
          success: false,
          errors: [{ msg: `failed authentication` }],
        };
        return res.status(403).json({ ...response });
      }
      // @ts-ignore: missing prop error
      const accessToken = jwt.sign({ userId: user.userId }, env.ACCESS_TOKEN as string, { expiresIn: "1800s" });
      let response: TResponse = {
        statusCode: 200,
        success: true,
        errors: [{ msg: `authentication successful` }],
        data: { accessToken: `bearer ${accessToken}` },
      };
      return res.status(200).json({
        ...response,
      });
    });
  } catch {
    let response: TResponse = {
      statusCode: 500,
      success: false,
      errors: [{ msg: `an internal service error occured` }],
    };
    return res.status(500).json({ ...response });
  }
};

export default refreshUserAccessToken;
