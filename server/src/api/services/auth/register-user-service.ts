import User from "../../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import IUser from "../../interfaces/IUser";

import { validationResult } from "express-validator";
import TResponse from "../../types/TResponse";

// when creating a user, the request body should have a username, password and an email address
type TRegisterUser = {
  username: string;
  password: string;
  email: string;
};

const registerUser = async (req: Request, res: Response) => {
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
    const { username, password, email } = req.body! as TRegisterUser;

    //   check if a user with same username or email already exists
    let existingUser;

    existingUser = await User.findOne({ username: username });

    if (existingUser) {
      let response: TResponse = {
        statusCode: 400,
        success: false,
        errors: [{ msg: `username ${username} is taken. Please user another username` }],
      };
      return res.status(400).json({ ...response });
    }

    existingUser = await User.findOne({ email: email });

    if (existingUser) {
      let response: TResponse = {
        statusCode: 400,
        success: false,
        errors: [{ msg: `email address ${email} is taken. Please use another email` }],
      };
      return res.status(400).json({ ...response });
    }

    //   generate password hash

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser: IUser = {
      username,
      email,
      hashedPassword,
    };

    // create new user
    await User.create({ ...newUser });
    let response: TResponse = {
      statusCode: 201,
      success: true,
    };
    return res.status(201).json({ ...response });
  } catch {
    let response: TResponse = {
      statusCode: 500,
      success: false,
      errors: [{ msg: `an internal server error occured` }],
    };
    return res.status(500).json({ ...response });
  }
};

export default registerUser;
