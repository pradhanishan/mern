import { Types } from "mongoose";
interface IQuotesList {
  _id: Types.ObjectId | string;
  author: string;
  quote: string;
  likes: number;
  dislikes: number;
  likedByMe: boolean;
}

export default IQuotesList;
