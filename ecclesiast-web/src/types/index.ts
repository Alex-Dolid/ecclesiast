export { LocaleType, LocalesType } from "./locales";
export { BibleVersesType } from "./bible";
export { Mutation, ModuleTree, RootState, Action } from "./vuex";
export { ResponseStatus } from "./responseStatus";
export { BibleType } from "./bibles";
export { Response } from "./api";

export type MongooseDoc = {
  _id: string;
  created?: string;
  modified?: string;
  __v?: number;
}
