// Types
import { JSONSchemaType } from "ajv";
import { BibleType } from "../../bibles.odm";

export type BibleSType = BibleType & { locale: string, verses: string[] };
export type BiblesCommonSchemeType = JSONSchemaType<BibleSType>;
export type BiblesSchemasType = BiblesCommonSchemeType;
