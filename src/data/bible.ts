import { BibleType } from "../types";

export const bible: BibleType = {
  author: "JW",
  name: "Перевод нового світу",
  translators: ["Якийсь перекладач"],
  edition: "JW",
  books: [
    {
      name: "Буття",
      chapters: [
        {
          name: 1,
          verses: [
            {
              name: 1,
              text: "На початку Бог створив небо і землю."
            }
          ]
        }
      ]
    }
  ],
  src: "https://jw.org",
  lang: {
    code2: "uk",
    code3: "ukr",
    name: "Українська"
  }
};
