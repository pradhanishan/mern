import Quote from "../models/Quote";
import { RequestHandler } from "express";
import TResponse from "../types/TResponse";
import * as _db from "../services/db/crd-queries";

export const getAllQuotes: RequestHandler = async (req, res) => {
  const quotes = await _db.getAll(Quote);
  return res.status(200).json({ data: quotes, success: true });
};

export const addNewQuote: RequestHandler = async (req, res) => {
  const { quote } = req.body!;
  await _db.add(Quote, { quote: quote });
  return res.status(201).json({ success: true });
};

export const deleteQuote: RequestHandler = async (req, res) => {
  const { id } = req.body!;
  await _db.deleteById(Quote, id);
  return res.status(200).json({ success: true });
};
