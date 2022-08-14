interface IUser {
  username: string;
  email: string;
  hashedPassword: string;
  refreshToken?: string;
  lastPostedDate?: Date;
}

export default IUser;
