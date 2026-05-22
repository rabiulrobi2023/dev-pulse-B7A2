import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.NEON_CONNECTING_STRING,
});

export const initDB = async () => {
  try {
    console.log("Database connected successfully!!!");
  } catch (error) {
    console.log(error);
  }
};
