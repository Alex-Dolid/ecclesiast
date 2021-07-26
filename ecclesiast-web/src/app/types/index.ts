import { Action } from "@/types";

type CRUDPayload = {
  id: string;
}
export type CRUDActions<S, T, ACP> = {
  createAsync: Action<S, T, ACP>;
  updateAsync: Action<S, CRUDPayload & { payload: Partial<T>}, ACP>;
  deleteAsync: Action<S, CRUDPayload, ACP>;
  get: Action<S, Partial<CRUDPayload>, ACP>
}
