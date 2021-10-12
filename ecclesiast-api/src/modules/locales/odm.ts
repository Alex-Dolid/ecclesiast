// Core
import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
// Constants
import { COLLECTION_NAME } from "./constants";

export type Locale = {
  _id: string,
  code2: string,
  code3: string,
  name: string,
}

export type LocaleDoc = Document & Locale;

const LocaleSchema: Schema = new Schema(
  {
    code2: {
      type: String,
      required: true,
      unique: true
    },
    code3: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: "created", updatedAt: "modified" } }
);

export const Odm = mongoose.model<LocaleDoc>(COLLECTION_NAME, LocaleSchema);
