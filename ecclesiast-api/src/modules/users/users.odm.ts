// Core
import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";
import { createOdm } from "../../common";
// Constants
import { COLLECTION_NAME } from "./constants";

export type User = {
  _id?: string,
  email: string,
  password: string,
}

export type UserDoc = Document & User;

export const UserSchema: Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: "created", updatedAt: "modified" } }
);

export const UsersOdm = createOdm<UserDoc>(COLLECTION_NAME, UserSchema);
