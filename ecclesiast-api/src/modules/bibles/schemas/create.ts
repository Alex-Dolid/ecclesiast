// Types
import { BibleCommonScheme } from "./types";
// Schemas
import { common } from "./common";

export const create: BibleCommonScheme = {
  ...common,
  required: [ "name", "locale", "author" ]
};
