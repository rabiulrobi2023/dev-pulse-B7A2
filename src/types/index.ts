import type { Role } from "../constant";

export interface ISendSuccess<T> {
  statusCode: number;
  message: string;
  data?: T;
}

export interface ISendError<T> {
  statusCode: number;
  message: string;
  error?: T;
}

export type TRole = (typeof Role)[keyof typeof Role];
