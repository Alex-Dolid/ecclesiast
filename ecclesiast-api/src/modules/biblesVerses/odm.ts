// Core
import * as mongoose from "mongoose";
// Types
import { Document, Schema } from "mongoose";
// Odm
import { LocalesOdm, Locale } from "../locales";
import { BiblesChaptersOdm, BibleChapter } from "../bibleChapters";
import { BibleBook, BiblesBooksOdm } from "../bibleBooks";

export type BibleVerseType = {
  _id?: string,
  name: number,
  text: string
  locale: Locale,
  chapter: BibleChapter,
  book: BibleBook,
  bibleId: string
}

export type BibleVerseDocType = Document & BibleVerseType;

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
      ref: BiblesBooksOdm,
      required: true
    },
    chapter: {
      type: Schema.Types.ObjectId,
      ref: BiblesChaptersOdm,
      required: true
    },
    locale: {
      type: Schema.Types.ObjectId,
      ref: LocalesOdm,
      required: true
    }
  },
  { timestamps: { createdAt: "created", updatedAt: "modified" } }
);

export const Odm = mongoose.model<BibleVerseDocType>("bibles-verses", BibleVerseSchema);
