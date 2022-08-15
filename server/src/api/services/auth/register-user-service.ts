import User from "../../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import IUser from "../../interfaces/IUser";

import { validationResult } from "express-validator";

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
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password, email } = req.body! as TRegisterUser;

    //   check if a user with same username or email already exists
    let existingUser;

    existingUser = await User.findOne({ username: username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: `username ${username} is taken. Please user another username` }],
      });
    }

    existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        errors: [{ msg: `email address ${email} is taken. Please use another email` }],
      });
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
    return res.status(201).json({
      success: true,
    });
  } catch {
    return res.status(500).json({ success: false, errors: [{ msg: `an internal server error occured` }] });
  }
};

export default registerUser;
