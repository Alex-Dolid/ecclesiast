import { LocaleType } from "../types";

export type BibleType = {
  _id: string,
  author: string,
  name: string,
  translators?: string[],
  edition?: string,
  verses: BibleVersesType,
  src?: string,
  locale: LocaleType
};

export type BibleBooksType = BibleBookType[];

export type BibleBookType = {
  _id: string
  name: string,
  locale: LocaleType
};

export type BibleChaptersType = BibleChapterType[];

export type BibleChapterType = {
  _id: string
  name: number
};

export type BibleVersesType = BibleVerseType[];

export type BibleVerseType = {
  _id: string,
  name: number,
  text: string
  locale: LocaleType,
  chapter: BibleChapterType,
  book: BibleBookType,
  bibleId: string
};
