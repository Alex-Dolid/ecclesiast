export type Locales = Locale[];

export type Locale = {
  code2: Locale2Codes,
  code3: Locale3Codes,
  name: string,
};

export type Locale2Codes = "en" | "ru" | "uk";
export type Locale3Codes = "eng" | "rus" | "ukr";

