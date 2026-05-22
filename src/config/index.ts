import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  PORT: process.env.PORT,
  NEON_CONNECTING_STRING: process.env.NEON_CONNECTING_STRING,
};

export default config;
