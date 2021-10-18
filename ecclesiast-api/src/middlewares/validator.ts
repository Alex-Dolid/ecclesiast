// Core
import { NextFunction, Request, Response } from "express";
// Libs
import Ajv, { ValidateFunction, JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
// Utils
import { ValidationError } from "../utils";
// Types
import { IError } from "../types";

export const validator = <T, SchemasType extends JSONSchemaType<T>>(
  schema: SchemasType
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ajv = new Ajv({ allErrors: true });
    addFormats(ajv);
    const validate: ValidateFunction = ajv.compile(schema);
    const valid = validate(req.body);

    if (valid) {
      return next();
    }

    const errors: IError["errors"] = {};

    // eslint-disable-next-line no-unused-expressions
    validate.errors?.forEach(({ message, instancePath, keyword }) => {
      const propName = instancePath.substring(1);
      if (!errors[propName]) {
        errors[propName] = {};
      }
      errors[propName] = { ...errors[propName], [keyword]: message };
    });

    return next(new ValidationError("Data is not valid", validate.errors?.length && errors ? errors : null));
  };
};
