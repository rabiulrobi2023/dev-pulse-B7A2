import type { Request, Response } from "express";
import { IssuesService } from "./issue.service";
import type { JwtPayload } from "jsonwebtoken";
import sendResponse from "../../utils/sendResponse";
import sendError from "../../utils/sendError";
import type { IUser } from "../auth/auth.interface";

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

const getAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await IssuesService.getAllIssuesFromDB();
    if (result.length === 0) {
      return sendError(res, {
        statusCode: 404,
        message: "There is no any issues",
      });
    }
    sendResponse(res, {
      statusCode: 200,
      message: "Issues retrived successfully",
      data: result,
    });
  } catch (error) {
    sendError(res, {
      statusCode: 500,
      message: "Fail to retrived issues",
      error: error,
    });
  }
};
const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const result = await IssuesService.getSingleIssueFromDB(
      req.params.id as string,
    );

    if (result.length === 0) {
      return sendError(res, {
        statusCode: 404,
        message: "There is no any issue",
      });
    }
    sendResponse(res, {
      statusCode: 200,
      message: "Issue retrived successfully",
      data: result,
    });
  } catch (error) {
    sendError(res, {
      statusCode: 500,
      message: "Fail to retrived issues",
      error: error,
    });
  }
};

const updateIssue = async (req: Request, res: Response) => {
  const user = req.user as Partial<IUser>;
  const issueId = req.params.id;
  const body = req.body;

  try {
    const result = await IssuesService.updatIssueIntoDB(
      user,
      issueId as string,
      body,
    );

    sendResponse(res, {
      statusCode: 200,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error: any) {
    sendError(res, {
      statusCode: 500,
      message: error.message || "Fail to update issue",
      error: error,
    });
  }
};

export const IssueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
};
