// Types
import { JSONSchemaType } from "ajv";
import { SignInPayload } from "../model";

export type AuthSignInScheme = JSONSchemaType<SignInPayload>;
export type AuthSchemas = AuthSignInScheme;
