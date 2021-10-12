// Core
import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";
import { createOdm } from "../../core";
// Constants
import { COLLECTION_NAME, ROLES } from "./constants";
import { TIMESTAMPS } from "../../constants";

export type AccessRole = {
  _id: string,
  name: ROLES,
}

export type AccessRoleDoc = Document & AccessRole;

export const AccessRoleSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: [ ...Object.values(ROLES) ],
      minLength: 3
    }
  },
  { timestamps: { createdAt: TIMESTAMPS.CREATED_AT, updatedAt: TIMESTAMPS.UPDATED_AT } }
);

export const AccessRolesOdm = createOdm<AccessRoleDoc>(COLLECTION_NAME, AccessRoleSchema);
