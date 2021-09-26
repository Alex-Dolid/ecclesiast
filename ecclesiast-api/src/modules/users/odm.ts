// Core
import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";
import { createOdm } from "../../common";
// Constants
import { COLLECTION_NAME } from "./constants";

export type User = {
  _id?: string,
  nickname: string,
  email: string,
  password: string,
  token?: string,
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
    token: {
      type: String
    }
  },
  { timestamps: { createdAt: "created", updatedAt: "modified" } }
);

export const Odm = createOdm<UserDoc>(COLLECTION_NAME, UserSchema);
