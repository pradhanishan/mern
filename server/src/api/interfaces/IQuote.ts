import { Types } from "mongoose";
interface IQuote {
  quote: string;
  likers: [];
  dislikers: [];
  anonymous: boolean;
  author: any;
  addedDate: string;
}

export default IQuote;
