import { Request, Response } from "express";
import User from "../../models/User";

const logoutUser = async (req: Request, res: Response) => {
  try {
    const id: string = res.locals.userId! as string;
    if (!id) {
      return res.status(400).json({ success: false, errors: [{ msg: `invalid request` }] });
    }
    await User.updateOne({ _id: id }, { refreshToken: null });
    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ success: false, errors: [{ msg: `an internal service error occured` }] });
  }
};

export default logoutUser;
