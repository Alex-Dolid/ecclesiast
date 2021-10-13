// Types
import { JSONSchemaType } from "ajv";
import { Bible } from "../odm";

export type BibleS = Bible & { locale: string, verses: string[] };
export type BibleCommonScheme = JSONSchemaType<BibleS>;
export type BibleSchemas = BibleCommonScheme;
