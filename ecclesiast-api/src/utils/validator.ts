// Core
import { NextFunction, Request, Response } from "express";
// Libs
import Ajv, { ValidateFunction, JSONSchemaType } from "ajv";
// Utils
import { ValidationError } from "./errors";
// Types
import { LocalesSchemasType } from "../modules/locales";
import { BiblesSchemasType } from "../modules/bibles";
import { BiblesVersesSchemesType } from "../modules/biblesVerses";
import { BiblesChaptersSchemasType } from "../modules/biblesChapters";
import { BiblesBooksSchemasType } from "../modules/biblesBooks";

export const validator = (
  schema: JSONSchemaType<object>
    | LocalesSchemasType
    | BiblesSchemasType
    | BiblesVersesSchemesType
    | BiblesChaptersSchemasType
    | BiblesBooksSchemasType
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ajv = new Ajv({ allErrors: true });
    const validate: ValidateFunction = ajv.compile(schema);
    const valid = validate(req.body);

    if (valid) {
      return next();
    }

    let errorMessage = "Error validation";
    const errors = validate.errors?.map(({ message, dataPath }) => `${ dataPath } ${ message }`).join(", ");
    if (errors) {
      errorMessage = errors;
    }

    return next(new ValidationError(errorMessage, 400));
  };
};
