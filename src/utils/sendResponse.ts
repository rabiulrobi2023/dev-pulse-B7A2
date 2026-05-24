import type { Response } from "express";
import type { ISendSuccess } from "../types";

const sendResponse = <T>(
  res: Response,
  { statusCode, message, data }: ISendSuccess<T>,
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export default sendResponse;
