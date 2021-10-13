// Types
import { JSONSchemaType } from "ajv";
import { BibleBook } from "../odm";

export type BibleBookS = BibleBook & { locale: string };
export type BibleBookCommonScheme = JSONSchemaType<BibleBookS>;
export type BibleBookSchemas = BibleBookCommonScheme;
