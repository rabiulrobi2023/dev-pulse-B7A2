import type { IIssue } from "./issue.interface";
import { pool } from "../../db";
import type { IUser } from "../auth/auth.interface";

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

const getSingleIssueFromDB = async (id: string) => {
  const result = await pool.query(
    `
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
         WHERE issues.id = $1
        `,
    [id],
  );

  return result.rows;
};

const updatIssueIntoDB = async (
  user: Partial<IUser>,
  issueId: string,
  payload: Partial<IIssue>,
) => {
  const { title, description, type } = payload;
  const issue = await pool.query(
    `
    SELECT* FROM issues
      WHERE id = $1
    `,
    [issueId],
  );

  if (issue.rows.length === 0) {
    throw new Error("Issue not found");
  }

  console.log(user.id, issue.rows[0].reporter_id);
  if (user.role === "contributor" && user.id != issue.rows[0].reporter_id) {
    throw new Error("User have not permission to update others issue");
  }

  if (user.role === "contributor" && issue.rows[0].status != "open") {
    throw new Error("User cannot cahange status");
  }

  const result = await pool.query(
    `
    UPDATE issues 
      SET 
        title = COALESCE ($1, title),
        description = COALESCE ($2, description),
        type = COALESCE ($3, type)
    WHERE
      id = $4
      RETURNING*
    `,
    [title, description, type, issueId],
  );

  return result.rows[0];
};

export const IssuesService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updatIssueIntoDB,
};
