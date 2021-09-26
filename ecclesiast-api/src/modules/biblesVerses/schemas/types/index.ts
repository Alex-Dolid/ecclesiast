// Types
import { JSONSchemaType } from "ajv";
import { BibleVerseType } from "../../biblesVerses.odm";

export type BibleVerseSType = BibleVerseType & { locale: string, chapter: string, book: string };
export type BiblesVersesCommonSchemeType = JSONSchemaType<BibleVerseSType>;
export type BiblesVersesSchemesType = BiblesVersesCommonSchemeType;
