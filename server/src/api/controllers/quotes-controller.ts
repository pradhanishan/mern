import Quote from "../models/Quote";
import { RequestHandler } from "express";
import * as _db from "../services/db/crd-queries";
import IQuote from "../interfaces/IQuote";
import { validationResult } from "express-validator";
import TResponse from "../types/TResponse";

export const getAllQuotes: RequestHandler = async (req, res) => {
  try {
    const quotes = await _db.getAll(Quote);
    let response: TResponse = {
      statusCode: 200,
      data: quotes,
      success: true,
    };
    return res.status(200).json({ ...response });
  } catch {
    let response: TResponse = {
      statusCode: 500,
      errors: [{ msg: "Internal server error" }],
      success: false,
    };
    return res.status(500).json({ ...response });
  }
};

export const addNewQuote: RequestHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let response: TResponse = {
        statusCode: 400,
        errors: errors.array(),
        success: false,
      };
      return res.status(400).json({ ...response });
    }
    const addParams: IQuote = {
      quote: req.body.quote! as string,
      likes: 0,
      dislikes: 0,
      anonymous: req.body.anonymous! as boolean,
    };
    await _db.add(Quote, { ...addParams });
    let response: TResponse = {
      statusCode: 201,
      success: true,
    };
    return res.status(201).json({ ...response });
  } catch {
    let response: TResponse = {
      statusCode: 500,
      success: false,
      errors: [{ msg: "Internal server error" }],
    };
    return res.status(500).json({ ...response });
  }
};

export const deleteQuote: RequestHandler = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let response: TResponse = {
        statusCode: 400,
        success: false,
        errors: errors.array(),
      };
      return res.status(400).json({ ...response });
    }
    const { id } = req.body!;
    await _db.deleteById(Quote, id);
    let response: TResponse = {
      statusCode: 200,
      success: true,
    };
    return res.status(200).json({ ...response });
  } catch {
    let response: TResponse = {
      statusCode: 400,
      errors: [{ msg: "invalid id" }],
      success: false,
    };
    return res.status(400).json({ ...response });
  }
};
