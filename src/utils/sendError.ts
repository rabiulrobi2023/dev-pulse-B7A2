import type { Response } from "express";
import type { ISendError } from "../types";

const sendError = <T>(
  res: Response,
  { statusCode, message, error }: ISendError<T>,
) => {
  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

export default sendError;
