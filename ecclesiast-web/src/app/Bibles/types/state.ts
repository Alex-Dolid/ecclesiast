import { BibleType } from "@/types";

export type BiblesState = BibleType[] | null;
export type State = {
  bibles: BiblesState;
}
