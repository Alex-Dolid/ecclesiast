// Types
import { LocaleCommonScheme } from "./types";
// Schemas
import { common } from "./common";

export const create: LocaleCommonScheme = {
  ...common,
  required: [ "code2", "code3", "name" ]
};
