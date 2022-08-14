import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import * as env from "./config/env-config";

// routes
import quotesRoute from "./api/routes/quotes-route";
import authRoute from "./api/routes/auth-route";
import apiDocumentationRoute from "./api/routes/api-documentation-route";

const app = express();
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

// routes
app.use("/api-docs", apiDocumentationRoute);
app.use("/quotes", quotesRoute);
app.use("/auth", authRoute);

const connectionString: string = `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@cluster0.umh4j1f.mongodb.net/${env.DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString)
  .then((result) =>
    app.listen(env.PORT || 5000, () => {
      console.log(`Server started on port ${env.PORT}`);
    })
  )
  .catch((err) => console.log(err));
