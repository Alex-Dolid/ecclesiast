// Types
import { JSONSchemaType } from "ajv";
import { User } from "../users.odm";

export type UsersCommonScheme = JSONSchemaType<User>;
export type UsersSchemas = UsersCommonScheme;
