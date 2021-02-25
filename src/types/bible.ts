import { Locale } from "@/types/locales";

export type Bible = {
  author: string,
  name: string,
  translators: string[],
  edition?: string,
  books: BibleBooks,
  src?: string,
  lang: Locale
};

export type BibleBooks = BibleBook[];

export type BibleBook = {
  name: string,
  chapters: BibleChapters
};

export type BibleChapters = BibleChapter[];

export type BibleChapter = {
  name: number,
  verses: BibleVerses
};

export type BibleVerses = BibleVerse[];

export type BibleVerse = {
  name: number,
  text: string
};
