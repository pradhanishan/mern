import IUser from "../interfaces/IUser";
import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  refreshToken: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  lastPostedDate: { type: Date, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
