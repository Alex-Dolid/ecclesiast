// Types
import { JSONSchemaType } from "ajv";
import { User } from "../odm";

export type UsersCommonScheme = JSONSchemaType<User>;
export type UsersSchemas = UsersCommonScheme;
