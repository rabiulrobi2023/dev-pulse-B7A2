import type { TRole } from "../../types";

export type IUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: TRole;
};
