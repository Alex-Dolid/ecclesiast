import { State, LocalesState } from "./state";
import { Action, LocaleType } from "@/types";
import { MutationsNames } from "./mutations";
import { CRUDActions } from "@/app/types";

type ACP = {
  [MutationsNames.setLocales]: LocalesState;
};

export enum ActionsNames {
  update = "update"
}

type ACD = {
  [ActionsNames.update]: LocaleType;
}
export type Actions = CRUDActions<State, LocaleType, ACP, ACD> & {
  update: Action<State, LocaleType, ACP>;
};
