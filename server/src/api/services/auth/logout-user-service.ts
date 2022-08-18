import { Request, Response } from "express";
import User from "../../models/User";
import TResponse from "../../types/TResponse";

const logoutUser = async (req: Request, res: Response) => {
  try {
    const id: string = res.locals.userId! as string;
    if (!id) {
      let response: TResponse = {
        statusCode: 400,
        success: false,
        errors: [{ msg: `invalid request` }],
      };
      return res.status(400).json({ ...response });
    }
    await User.updateOne({ _id: id }, { refreshToken: null });
    let response: TResponse = {
      statusCode: 200,
      success: true,
    };
    return res.status(200).json({ ...response });
  } catch {
    let response: TResponse = {
      statusCode: 500,
      success: false,
      errors: [{ msg: `an internal service error occured` }],
    };
    return res.status(500).json({ ...response });
  }
};

export default logoutUser;
