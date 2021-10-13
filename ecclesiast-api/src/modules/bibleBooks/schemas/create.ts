// Types
import { BibleBookCommonScheme } from "./types";
// Schemas
import { common } from "./common";

export const create: BibleBookCommonScheme = {
  ...common,
  required: [ "name", "locale" ]
};
