// Types
import { JSONSchemaType } from "ajv";
import { User } from "../odm";

export type UserS = User & { accessRole: string };
export type UserCommonScheme = JSONSchemaType<UserS>;
export type UserSchemas = UserCommonScheme;
