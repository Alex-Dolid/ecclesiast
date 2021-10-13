// Types
import { JSONSchemaType } from "ajv";
import { BibleVerse } from "../odm";

export type BibleVerseS = BibleVerse & { locale: string, chapter: string, book: string };
export type BibleVersesCommonScheme = JSONSchemaType<BibleVerseS>;
export type BibleVersesSchemes = BibleVersesCommonScheme;
