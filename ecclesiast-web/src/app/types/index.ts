import { Action } from "@/types";

export type CRUDActions<S, T, ACP, ACD = unknown> = {
  createAsync: Action<S, T, ACP, ACD>;
  updateAsync: Action<S, { id: string; payload: Partial<T>}, ACP, ACD>;
  deleteAsync: Action<S, { id: string }, ACP, ACD>;
  getAllAsync: Action<S, unknown, ACP, ACD>;
  getByIdAsync: Action<S, { id: string }, ACP, ACD>;
}
