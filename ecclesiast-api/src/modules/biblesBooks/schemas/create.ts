// Types
import { BiblesBooksCommonScheme } from "./types";
// Schemas
import { common } from "./common";

export const create: BiblesBooksCommonScheme = {
  ...common,
  required: [ "name", "locale" ]
};
