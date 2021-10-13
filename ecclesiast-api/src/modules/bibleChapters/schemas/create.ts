// Types
import { BibleChapterCommonScheme } from "./types";
// Schemas
import { common } from "./common";

export const create: BibleChapterCommonScheme = {
  ...common,
  required: [ "name" ]
};
