// Utils
import { CommonError } from "./CommonError";
// Constants
import { ErrorNames, Statuses } from "../../constants";
// Types
import { ErrorArgs } from "../../types";

export class ValidationError extends CommonError {
  constructor(message: ErrorArgs["message"], errors?: ErrorArgs["errors"]) {
    super({ name: ErrorNames.ValidationError, message, statusCode: Statuses.BadRequest, errors });

    Error.captureStackTrace(this, ValidationError);
  }
}
