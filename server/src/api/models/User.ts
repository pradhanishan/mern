import IUser from "../interfaces/IUser";
import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  refreshToken: { type: String },
  hashedPassword: { type: String, required: true },
  lastPostedDate: { type: String },
});

const User = model<IUser>("User", userSchema);

export default User;
