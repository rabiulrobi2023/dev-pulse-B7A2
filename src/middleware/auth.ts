import type { NextFunction, Request, Response } from "express";
import type { TRole } from "../types";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import getUser from "../utils/getUser";
import sendError from "../utils/sendError";
const auth = (...roles: TRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("Token not found");
      }

      const decoded = jwt.verify(
        token,
        config.JWT_ACCESS_TOKEN_SECRET as string,
      ) as JwtPayload;

      const user = await getUser(decoded.email);
      
      if (!user) {
        sendError(res, {
          statusCode: 404,
          message: "User not found",
        });
      }
      if (roles.length > 0 && !roles.includes(user.role)) {
        sendError(res, {
          statusCode: 403,
          message: "Forbidden",
        });
      }

      req.user = decoded;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
