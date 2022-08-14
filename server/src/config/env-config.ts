import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

export const PORT = process.env.PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DATABASE_NAME = process.env.DATABASE_NAME;
