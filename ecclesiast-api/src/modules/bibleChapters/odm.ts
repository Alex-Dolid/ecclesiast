// Core
import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";
// Constants
import { COLLECTION_NAME } from "./constants";
import { TIMESTAMPS } from "../../constants";

export type BibleChapter = {
  _id: string,
  name: number,
}

export type BibleChapterDoc = Document & BibleChapter;

const BibleChaptersSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: Number,
      required: true,
      unique: true
    }
  },
  { timestamps: { createdAt: TIMESTAMPS.CREATED_AT, updatedAt: TIMESTAMPS.UPDATED_AT } }
);

export const Odm = mongoose.model<BibleChapterDoc>(COLLECTION_NAME, BibleChaptersSchema);
