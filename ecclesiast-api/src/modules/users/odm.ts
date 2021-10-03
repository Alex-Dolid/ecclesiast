// Core
import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";
import { createOdm } from "../../common";
// Odm
import { AccessRole, AccessRolesOdm } from "../accessRoles";
// Constants
import { COLLECTION_NAME } from "./constants";

export type User = {
  _id: string,
  nickname: string,
  email: string,
  accessRole: AccessRole,
  password: string,
  token?: string | null,
}

export type UserDoc = Document & User;

export const UserSchema: Schema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    accessRole: {
      type: Schema.Types.ObjectId,
      ref: AccessRolesOdm,
      required: true
    },
    token: {
      type: String
    }
  },
  { timestamps: { createdAt: "created", updatedAt: "modified" } }
);

export const Odm = createOdm<UserDoc>(COLLECTION_NAME, UserSchema);
