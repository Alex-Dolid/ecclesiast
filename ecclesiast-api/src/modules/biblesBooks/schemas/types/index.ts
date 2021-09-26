// Types
import { JSONSchemaType } from "ajv";
import { BibleBookType } from "../../odm";

export type BibleBookSType = BibleBookType & { locale: string };
export type BiblesBooksCommonSchemeType = JSONSchemaType<BibleBookSType>;
export type BiblesBooksSchemasType = BiblesBooksCommonSchemeType;
