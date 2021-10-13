// Types
import { JSONSchemaType } from "ajv";
import { BibleBook } from "../odm";

export type BibleBookS = BibleBook & { locale: string };
export type BiblesBooksCommonScheme = JSONSchemaType<BibleBookS>;
export type BiblesBooksSchemas = BiblesBooksCommonScheme;
