import Quote from "../models/Quote";
import { RequestHandler } from "express";
import * as _db from "../services/db/crd-queries";
import IQuote from "../interfaces/IQuote";
import { validationResult } from "express-validator";

export const getAllQuotes: RequestHandler = async (req, res) => {
  try {
    const quotes = await _db.getAll(Quote);
    return res.status(200).json({ data: quotes, success: true });
  } catch {
    return res.status(500).json({
      errors: [
        {
          msg: "Internal server error",
        },
      ],
      success: false,
    });
  }
};

export const addNewQuote: RequestHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), success: false });
    }
    const addParams: IQuote = {
      quote: req.body.quote! as string,
      likes: 0,
      dislikes: 0,
      anonymous: req.body.anonymous! as boolean,
    };
    await _db.add(Quote, { ...addParams });
    return res.status(201).json({ success: true });
  } catch {
    return res.status(500).json({
      errors: [
        {
          msg: "Internal server error",
        },
      ],
      success: false,
    });
  }
};

export const deleteQuote: RequestHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.body!;
    await _db.deleteById(Quote, id);
    return res.status(200).json({ success: true });
  } catch {
    return res.status(400).json({
      errors: [
        {
          msg: "invalid id",
        },
      ],
      success: false,
    });
  }
};
