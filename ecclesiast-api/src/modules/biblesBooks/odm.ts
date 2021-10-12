// Core
import * as mongoose from "mongoose";
// Types
import { Document, Schema } from "mongoose";
// Odm
import { LocalesOdm, Locale } from "../locales";

export type BibleBookType = {
  _id?: string,
  name: string,
  locale: Locale
}

export type BibleBooksDocType = Document & BibleBookType;

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
  { timestamps: { createdAt: "created", updatedAt: "modified" } }
);

export const Odm = mongoose.model<BibleBooksDocType>("bibles-books", BibleBooksSchema);
