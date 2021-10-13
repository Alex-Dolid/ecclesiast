// Types
import { BibleVersesCommonScheme } from "./types";
// Schemas
import { common } from "./common";

export const create: BibleVersesCommonScheme = {
  ...common,
  required: [ "name", "locale", "text", "chapter", "book", "bibleId" ]
};
