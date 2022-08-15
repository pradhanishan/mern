import IQuote from "../interfaces/IQuote";
import { Schema, model } from "mongoose";

const quoteSchema = new Schema<IQuote>({
  quote: { type: String, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  anonymous: { type: Boolean },
});

const Quote = model<IQuote>("Quote", quoteSchema);

export default Quote;
