import { LocaleType } from "@/types";

export type LocalesState = LocaleType[] | null;
export type State = {
  locales: LocalesState;
}
