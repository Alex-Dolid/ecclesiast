// Utils
import { CommonError } from "./CommonError";
// Constants
import { Statuses, ErrorNames } from "../../constants";
// Types
import { ErrorArgs } from "../../types";

export class NotFoundError extends CommonError {
  constructor(message: ErrorArgs["message"]) {
    super({ name: ErrorNames.NotFoundError, message, statusCode: Statuses.NotFound });

    Error.captureStackTrace(this, NotFoundError);
  }
}
