import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  PORT: process.env.PORT,
  NEON_CONNECTING_STRING: process.env.NEON_CONNECTING_STRING,
  BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRE: process.env.JWT_ACCESS_TOKEN_EXPIRE,
};

export default config;
