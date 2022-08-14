import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const PORT = process.env.PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET;
