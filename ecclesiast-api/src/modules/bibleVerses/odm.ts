// Core
import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";
// Odm
import { LocalesOdm, Locale } from "../locales";
import { BibleChaptersOdm, BibleChapter } from "../bibleChapters";
import { BibleBook, BibleBooksOdm } from "../bibleBooks";
// Constants
import { COLLECTION_NAME } from "./constants";
import { TIMESTAMPS } from "../../constants";

export type BibleVerse = {
  _id: string,
  name: number,
  text: string
  locale: Locale,
  chapter: BibleChapter,
  book: BibleBook,
  bibleId: string
}

export type BibleVerseDoc = Document & BibleVerse;

const BibleVerseSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: Number,
      required: true,
      unique: true
    },
    text: {
      type: String,
      required: true
    },
    bibleId: {
      type: String,
      required: true
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: BibleBooksOdm,
      required: true
    },
    chapter: {
      type: Schema.Types.ObjectId,
      ref: BibleChaptersOdm,
      required: true
    },
    locale: {
      type: Schema.Types.ObjectId,
      ref: LocalesOdm,
      required: true
    }
  },
  { timestamps: { createdAt: TIMESTAMPS.CREATED_AT, updatedAt: TIMESTAMPS.UPDATED_AT } }
);

export const Odm = mongoose.model<BibleVerseDoc>(COLLECTION_NAME, BibleVerseSchema);
