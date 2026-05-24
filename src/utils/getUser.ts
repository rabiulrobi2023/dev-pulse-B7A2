import { pool } from "../db";

const getUser = async (email: string) => {
  const result = await pool.query(
    `
    SELECT* FROM users
        WHERE email = $1
        `,
    [email],
  );
  return result.rows[0];
};

export default getUser;
