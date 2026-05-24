import jwt, { type SignOptions } from "jsonwebtoken";
import { pool } from "../../db";
import comparePassword from "../../utils/comparePassword";
import getUser from "../../utils/getUser";
import hashPassword from "../../utils/hashPassword";
import sendError from "../../utils/sendError";
import type { IUser } from "./auth.interface";
import config from "../../config";

const createUser = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const hashPass = await hashPassword(password);

  const result = await pool.query(
    `
    INSERT INTO users (name,email,password,role)
    VALUES($1,$2,$3,$4)
    RETURNING*
    `,
    [name, email, hashPass, role],
  );
  delete result.rows[0].password;

  return result;
};

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const user = await getUser(payload.email);

  if (!user) {
    throw new Error("User does not exists");
  }
  const hashedPass = user.password;

  const isCorrectPass = await comparePassword(payload.password, hashedPass);

  if (!isCorrectPass) {
    throw new Error("Incoccrect password");
  }

  const jwtPayload: Partial<IUser> = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(
    jwtPayload,
    config.JWT_ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: config.JWT_ACCESS_TOKEN_EXPIRE as string,
    } as SignOptions,
  );

  delete user.password;

  return {
    token,
    user,
  };
};



export const AuthService = {
  createUser,
  loginUserIntoDB,
};
