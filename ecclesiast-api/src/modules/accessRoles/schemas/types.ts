// Types
import { JSONSchemaType } from "ajv";
import { AccessRole } from "../odm";

export type AccessRolesCommonScheme = JSONSchemaType<AccessRole>;
export type AccessRolesSchemas = AccessRolesCommonScheme;
