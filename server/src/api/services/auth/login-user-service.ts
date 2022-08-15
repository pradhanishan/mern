import User from "../../models/User";
import { Request, Response } from "express";
import IUser from "../../interfaces/IUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as env from "../../../config/env-config";
import { validationResult } from "express-validator";

type TLoginUser = {
  identifier: string;
  password: string;
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { identifier, password } = req.body! as TLoginUser;

    //   check if user with entered email or username exists
    const loginUser: IUser = (await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    })) as IUser;

    if (!loginUser) {
      return res.status(403).json({
        success: false,
        message: `user ${identifier} does not exist.}`,
      });
    }
    //   validate user's password
    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      loginUser.hashedPassword
    );

    if (!isPasswordValid) {
      return res
        .status(403)
        .json({ success: false, message: `invalid credentials` });
    }
    //   generate access and refresh tokens

    const accessToken = jwt.sign(
      { userId: loginUser._id!.toString() },
      env.ACCESS_TOKEN as string,
      { expiresIn: "1800s" }
    );
    const refreshToken = jwt.sign(
      { userId: loginUser._id!.toString() },
      env.REFRESH_TOKEN as string
    );
    console.log(refreshToken);
    await User.updateOne(
      { _id: loginUser._id },
      { refreshToken: refreshToken }
    );
    return res.status(200).json({
      success: true,
      message: "logged in successfully",
      data: {
        refreshToken: `bearer ${refreshToken}`,
        accessToken: `bearer ${accessToken}`,
      },
    });
  } catch {
    return res
      .status(500)
      .json({ success: false, message: `an internal server error occured.` });
  }
};

export default loginUser;
