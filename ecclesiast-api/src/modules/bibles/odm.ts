// Core
import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";
// Odm
import { LocalesOdm, Locale } from "../locales";
import { BiblesVersesOdm, BibleVerseType } from "../biblesVerses";
// Constants
import { COLLECTION_NAME } from "./constants";
import { TIMESTAMPS } from "../../constants";

export type Bible = {
  _id: string,
  author: string,
  name: string,
  translators: string[],
  edition?: string,
  verses: BibleVerseType[],
  src?: string,
  locale: Locale
}

export type BibleDoc = Document & Bible;

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
  { timestamps: { createdAt: TIMESTAMPS.CREATED_AT, updatedAt: TIMESTAMPS.UPDATED_AT } }
);

export const Odm = mongoose.model<BibleDoc>(COLLECTION_NAME, BibleSchema);
