// Core
import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";
import { createOdm } from "../../core";
// Constants
import { COLLECTION_NAME, ROLES } from "./constants";

export type AccessRole = {
  _id?: string,
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
  { timestamps: { createdAt: "created", updatedAt: "modified" } }
);

export const AccessRolesOdm = createOdm<AccessRoleDoc>(COLLECTION_NAME, AccessRoleSchema);
