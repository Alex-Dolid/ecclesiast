// Constants
import { Statuses, ErrorNames } from "../../constants";
// Types
import { IError, ErrorArgs } from "../../types";

export abstract class CommonError extends Error implements IError {
  type: IError["type"];
  name: IError["name"];
  statusCode: IError["statusCode"];
  errors?: IError["errors"];

  protected constructor({
    name = ErrorNames.CommonError,
    message = "Common Error",
    statusCode = Statuses.BadRequest,
    errors
  }: ErrorArgs & { name: IError["name"] }) {
    super(message);

    if (!/^[1-5]{1}[0-9]{2}$/.test(statusCode.toString())) {
      throw new Error(
        `statusCode in ${ name } should be a number in range from 100 to 599`
      );
    }

    Error.captureStackTrace(this, CommonError);
    this.type = "error";
    this.name = name;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
