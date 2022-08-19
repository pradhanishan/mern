import IQuote from "../interfaces/IQuote";
import { Schema, model } from "mongoose";

const quoteSchema = new Schema<IQuote>({
  quote: { type: String, required: true },
  likers: [],
  dislikers: [],
  anonymous: { type: Boolean },
  author: { type: Object, required: true },
  addedDate: { type: String, required: true },
});

const Quote = model<IQuote>("Quote", quoteSchema);

export default Quote;
