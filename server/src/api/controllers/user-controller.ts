import { Request, Response } from "express";
import User from "../models/User";
import * as _db from "../services/db/crd-queries";
import TResponse from "../types/TResponse";

export const getUserLastPostedDate = async (req: Request, res: Response) => {
  try {
    let dt = new Date();
    console.log(dt.toUTCString().toString());
    const userIdToFind = res.locals.userId;
    const user = await _db.getById(User, userIdToFind);
    if (!user) {
      let response: TResponse = {
        statusCode: 400,
        errors: [{ msg: `invalid user` }],
        success: false,
      };
      return res.status(400).json({ ...response });
    }
    let response: TResponse = {
      statusCode: 200,
      success: true,
      data: {
        lastPostedDate: user.lastPostedDate,
      },
    };
    return res.status(200).json({ ...response });
  } catch {
    let response: TResponse = {
      statusCode: 400,
      errors: [{ msg: "invalid id" }],
      success: false,
    };
    return res.status(400).json({ ...response });
  }
};
