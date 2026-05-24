import type { JwtPayload } from "jsonwebtoken";
import type { IIssue } from "./issue.interface";
import { pool } from "../../db";

const createIssueIntoDB = async (userId: number, payload: IIssue) => {
  const { title, description, type } = payload;

  const result = await pool.query(
    `
        INSERT INTO issues (title,description,type,reporter_id)
            VALUES($1,$2,$3,$4) RETURNING*
        `,
    [title, description, type,userId],
  );

  return result.rows[0];
};

export const IssuesService = {
  createIssueIntoDB,
};
