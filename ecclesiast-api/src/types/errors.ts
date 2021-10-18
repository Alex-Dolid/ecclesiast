// Constants
import { ErrorNames } from "../constants";

export interface IError {
  type: "error",
  name: ErrorNames,
  message: string,
  statusCode: number,
  errors?: Record<string, Record<string, string | void>> | null
}
export type ErrorArgs = Omit<Partial<IError>, "name" | "type">;
