import { Types } from "mongoose";
interface IQuote {
  quote: string;
  likers: string[];
  dislikers: string[];
  anonymous: boolean;
  author: string;
  addedDate: string;
}

export default IQuote;
