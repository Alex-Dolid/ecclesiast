// Core
import * as mongoose from "mongoose";
// Types
import { Document, Schema } from "mongoose";
// Odm
import { LocalesOdm, Locale } from "../locales";
import { BiblesVersesOdm, BibleVerseType } from "../biblesVerses";

export type BibleType = {
  _id?: string,
  author: string,
  name: string,
  translators?: string[],
  edition?: string,
  verses: BibleVerseType[],
  src?: string,
  locale: Locale
}

export type BibleDocType = Document & BibleType;

const BibleSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    author: {
      type: String,
      required: true
    },
    translators: {
      type: [ String ]
    },
    edition: {
      type: String
    },
    src: {
      type: String
    },
    verses: [
      {
        type: Schema.Types.ObjectId,
        ref: BiblesVersesOdm
      }
    ],
    locale: {
      type: Schema.Types.ObjectId,
      ref: LocalesOdm,
      required: true
    }
  },
  { timestamps: { createdAt: "created", updatedAt: "modified" } }
);

export const Odm = mongoose.model<BibleDocType>("bibles", BibleSchema);
