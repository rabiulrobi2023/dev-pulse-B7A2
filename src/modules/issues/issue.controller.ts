import type { Request, Response } from "express";
import { IssuesService } from "./issue.service";
import type { JwtPayload } from "jsonwebtoken";
import sendResponse from "../../utils/sendResponse";
import sendError from "../../utils/sendError";

const createIssue = async (req: Request, res: Response) => {
  try {
    const user = req.user as JwtPayload;
    const result = await IssuesService.createIssueIntoDB(user.id, req.body);
    sendResponse(res, {
      statusCode: 201,
      message: "Issue created successfully",
      data: result,
    });
  } catch (error) {
    sendError(res, {
      statusCode: 500,
      message: "Issue create fail",
      error: error,
    });
  }
};

export const IssueController = {
    createIssue
}
