// Types
import { JSONSchemaType } from "ajv";
import { BibleChapter } from "../odm";

export type BibleChapterCommonScheme = JSONSchemaType<BibleChapter>;
export type BibleChapterSchemas = BibleChapterCommonScheme;
