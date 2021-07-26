import { State, BiblesState } from "./state";
import { BibleType } from "@/types";
import { MutationsNames } from "./mutations";
import { CRUDActions } from "@/app/types";

type ACP = {
  [MutationsNames.setBibles]: BiblesState
};
export type Actions = CRUDActions<State, BibleType, ACP>;
