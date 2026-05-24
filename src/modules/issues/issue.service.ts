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
    [title, description, type, userId],
  );

  return result.rows[0];
};

const getAllIssuesFromDB = async () => {
  const result = await pool.query(`
        SELECT
            issues.id,
            issues.title,
            issues.description,
            issues.type,
            issues.status,
            json_build_object(
                'id', users.id,
                'name', users.name,
                'role', users.role 
            ) AS reporter,
            issues.created_at,
            issues.updated_at
         FROM issues
         JOIN users
         ON issues.reporter_id = users.id
        `);

  return result.rows;
};

export const IssuesService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
};
