import IQuote from "../interfaces/IQuote";
import { Schema, model } from "mongoose";

const quoteSchema = new Schema<IQuote>({
  quote: { type: String, required: true },
});

const Quote = model<IQuote>("Quote", quoteSchema);

export default Quote;
