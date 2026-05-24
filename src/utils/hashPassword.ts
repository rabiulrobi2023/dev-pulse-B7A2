import bcrypt from "bcrypt";
import config from "../config";

const hashPassword = async (pass: string) => {
  const result = await bcrypt.hash(pass, Number(config.BCRYPT_SALT_ROUND));
  return result
};

export default hashPassword;
