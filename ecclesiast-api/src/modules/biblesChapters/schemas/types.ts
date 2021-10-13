// Types
import { JSONSchemaType } from "ajv";
import { BibleChapter } from "../odm";

export type BiblesChaptersCommonSchemeType = JSONSchemaType<BibleChapter>;
export type BiblesChaptersSchemasType = BiblesChaptersCommonSchemeType;
