// Types
import { JSONSchemaType } from "ajv";
import { User } from "../odm";

export type UserS = User & { accessRole: string };
export type UsersCommonScheme = JSONSchemaType<UserS>;
export type UsersSchemas = UsersCommonScheme;
