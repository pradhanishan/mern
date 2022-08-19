import { Types } from "mongoose";
interface IQuote {
  quote: string;
  likers: [];
  dislikers: [];
  anonymous: boolean;
  author: string;
  addedDate: string;
}

export default IQuote;
