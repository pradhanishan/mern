import { Types } from "mongoose";

interface IUser {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  hashedPassword: string;
  refreshToken?: string;
  lastPostedDate?: Date;
}

export default IUser;
