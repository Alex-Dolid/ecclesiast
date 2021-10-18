// Utils
import { CommonError } from "./CommonError";
// Constants
import { ErrorNames } from "../../constants";
// Types
import { ErrorArgs } from "../../types";

export class PermissionError extends CommonError {
  constructor(message: ErrorArgs["message"], statusCode?: ErrorArgs["statusCode"]) {
    super({ name: ErrorNames.PermissionError, message, statusCode });

    Error.captureStackTrace(this, PermissionError);
  }
}
