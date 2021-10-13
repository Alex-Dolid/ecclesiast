// Core
import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";
// Odm
import { LocalesOdm, Locale } from "../locales";
// Constants
import { TIMESTAMPS } from "../../constants";
import { COLLECTION_NAME } from "./constants";

export type BibleBook = {
  _id: string,
  name: string,
  locale: Locale
}

export type BibleBookDoc = Document & BibleBook;

const BibleBooksSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    locale: {
      type: Schema.Types.ObjectId,
      ref: LocalesOdm
    }
  },
  { timestamps: { createdAt: TIMESTAMPS.CREATED_AT, updatedAt: TIMESTAMPS.UPDATED_AT } }
);

export const Odm = mongoose.model<BibleBookDoc>(COLLECTION_NAME, BibleBooksSchema);
