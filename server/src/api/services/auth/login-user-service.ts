import User from "../../models/User";
import { Request, Response } from "express";
import IUser from "../../interfaces/IUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as env from "../../../config/env-config";
import { validationResult } from "express-validator";
import TResponse from "../../types/TResponse";

type TLoginUser = {
  identifier: string;
  password: string;
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let response: TResponse = {
        statusCode: 400,
        success: false,
        errors: errors.array(),
      };
      return res.status(400).json({ ...response });
    }
    const { identifier, password } = req.body! as TLoginUser;

    //   check if user with entered email or username exists
    const loginUser: IUser = (await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    })) as IUser;

    if (!loginUser) {
      let response: TResponse = {
        statusCode: 403,
        success: false,
        errors: [{ msg: `user ${identifier} does not exist.}` }],
      };
      return res.status(403).json({ ...response });
    }
    //   validate user's password
    const isPasswordValid: boolean = await bcrypt.compare(password, loginUser.hashedPassword);

    if (!isPasswordValid) {
      let response: TResponse = {
        statusCode: 403,
        success: false,
        errors: [{ msg: `invalid credentials` }],
      };
      return res.status(403).json({ ...response });
    }
    //   generate access and refresh tokens

    const accessToken = jwt.sign({ userId: loginUser._id!.toString() }, env.ACCESS_TOKEN as string, {
      expiresIn: "18s",
    });
    const refreshToken = jwt.sign({ userId: loginUser._id!.toString() }, env.REFRESH_TOKEN as string);

    await User.updateOne({ _id: loginUser._id }, { refreshToken: refreshToken });
    let response: TResponse = {
      statusCode: 200,
      success: true,
      data: {
        refreshToken: `bearer ${refreshToken}`,
        accessToken: `bearer ${accessToken}`,
      },
      errors: [],
    };
    return res.status(200).json({
      ...response,
    });
  } catch {
    let response: TResponse = {
      statusCode: 500,
      success: false,
      errors: [{ msg: `an internal server error occured.` }],
    };
    return res.status(500).json({ ...response });
  }
};

export default loginUser;
