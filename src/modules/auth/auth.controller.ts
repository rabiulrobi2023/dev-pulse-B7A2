import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import sendError from "../../utils/sendError";
import { AuthService } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
  const payload = req.body;
  const result = (await AuthService.createUser(payload)).rows[0];

  try {
    sendResponse(res, {
      statusCode: 201,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    sendError(res, {
      statusCode: 500,
      message: "User created fail",
      error: error,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.loginUserIntoDB(req.body);

    sendResponse(res, {
      statusCode: 200,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    sendError(res, {
      statusCode: 500,
      message: "Login fail",
      error: error.message,
    });
  }
};

export const AuthController = {
  createUser,
  loginUser,
};
