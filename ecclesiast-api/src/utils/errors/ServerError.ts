// Utils
import { CommonError } from "./CommonError";
// Constants
import { Statuses, ErrorNames } from "../../constants";
// Types
import { ErrorArgs } from "../../types";

export class ServerError extends CommonError {
  constructor(message: Required<ErrorArgs["message"]>) {
    super({ name: ErrorNames.ServerError, message, statusCode: Statuses.ServerError });

    Error.captureStackTrace(this, ServerError);
  }
}
