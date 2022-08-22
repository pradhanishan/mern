import Quote from "../models/Quote";
import { RequestHandler } from "express";
import * as _db from "../services/db/crd-queries";
import IQuote from "../interfaces/IQuote";
import { validationResult } from "express-validator";
import TResponse from "../types/TResponse";
import User from "../models/User";
import IQuotesList from "../interfaces/vms/IQuotesList";

export const getAllQuotes: RequestHandler = async (req, res) => {
  try {
    const quotes = await _db.getAll(Quote);

    let quotesList: IQuotesList[] = [];

    quotes.map((quote) => {
      let quoteListItem: IQuotesList = {
        // @ts-ignore: missing prop error
        _id: quote._id,
        author: !quote.anonymous ? quote.author : "anonymous",
        quote: quote.quote,
        likes: quote.likers.length,
        dislikes: quote.dislikers.length,
        likedByMe: quote.likers.includes(res.locals.userId!) ? true : false,
      };
      quotesList.push(quoteListItem);
    });

    let response: TResponse = {
      statusCode: 200,
      data: quotesList,
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

    const user = await _db.getById(User, res.locals.userId);
    if (!user) {
      let response: TResponse = {
        statusCode: 400,
        errors: [{ msg: `invalid user` }],
        success: false,
      };
      return res.status(400).json({ ...response });
    }

    if (user.lastPostedDate !== undefined && user.lastPostedDate !== null) {
      let nextAvailableDate = new Date(user.lastPostedDate!);
      nextAvailableDate.setDate(nextAvailableDate.getDate() + 1);
      let dt = new Date();
      const readyToPostAgain: boolean = dt.toUTCString() > nextAvailableDate.toUTCString();
      if (!readyToPostAgain) {
        let response: TResponse = {
          statusCode: 400,
          errors: [{ msg: `you can only make one post in a day` }],
          success: false,
        };

        return res.status(201).json({ ...response });
      }
    }
    let dt = new Date();
    let addedDate = dt.toUTCString();
    const addParams: IQuote = {
      quote: req.body.quote! as string,
      likers: [],
      dislikers: [],
      anonymous: req.body.anonymous! as boolean,
      author: user.username,
      addedDate,
    };
    await _db.add(Quote, { ...addParams });
    await User.updateOne({ _id: user._id }, { lastPostedDate: addedDate });
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

export const likeQuote: RequestHandler = async (req, res) => {
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
    const quoteId = req.body.quoteId;
    const quoteToUpdate = await Quote.findOne({ _id: quoteId });
    if (!quoteToUpdate) {
      let response: TResponse = {
        statusCode: 400,
        success: false,
        errors: [{ msg: `invalid request` }],
      };
      return res.status(400).json({ ...response });
    }
    const likingUser: string = res.locals.userId!;
    if (!quoteToUpdate.likers.includes(likingUser)) {
      console.log("reached");
      await Quote.updateOne({ _id: quoteId }, { likers: [...quoteToUpdate.likers, likingUser] });
      if (quoteToUpdate.dislikers.includes(likingUser)) {
        await Quote.updateOne({ _id: quoteId }, { dislikers: quoteToUpdate.dislikers.filter((x) => x !== likingUser) });
      }
      let response: TResponse = {
        statusCode: 200,
        success: true,
      };
      return res.status(200).json({ ...response });
    }
    if (!quoteToUpdate.dislikers.includes(likingUser)) {
      await Quote.updateOne({ _id: quoteId }, { dislikers: [...quoteToUpdate.dislikers, likingUser] });

      if (quoteToUpdate.likers.includes(likingUser)) {
        await Quote.updateOne({ _id: quoteId }, { likers: quoteToUpdate.likers.filter((x) => x !== likingUser) });
      }
      let response: TResponse = {
        statusCode: 200,
        success: true,
      };
      return res.status(200).json({ ...response });
    }
  } catch {
    let response: TResponse = {
      statusCode: 400,
      errors: [{ msg: "invalid id" }],
      success: false,
    };
    return res.status(400).json({ ...response });
  }
};
