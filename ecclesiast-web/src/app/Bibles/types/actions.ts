import { State, BiblesState } from "./state";
import { Action, BibleType } from "@/types";
import { MutationsNames } from "./mutations";
import { CRUDActions } from "@/app/types";

type ACP = {
  [MutationsNames.setBibles]: BiblesState;
};

export enum ActionsNames {
  update = "update"
}

type ACD = {
  [ActionsNames.update]: BibleType;
}
export type Actions = CRUDActions<State, BibleType, ACP, ACD> & {
  update: Action<State, BibleType, ACP>;
};
