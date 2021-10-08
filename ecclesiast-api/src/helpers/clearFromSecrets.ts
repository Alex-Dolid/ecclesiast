// Libs
import { omit, PropertyName } from "lodash";
// Types
import { Middleware } from "../types";

type ReturnedData<T, K extends PropertyName[]> = Pick<T, Exclude<keyof T, K[number]>> | null | undefined;
export const clearFromSecrets = <T extends object, K extends PropertyName[]>(paths: K): Middleware => {
  return (data: T | null | undefined)
    : ReturnedData<T, K> | ReturnedData<T, K>[] => {
    if (typeof data !== "object") {
      return data;
    }

    if (!Array.isArray(data)) {
      return omit<T, typeof paths>(data, ...paths);
    }

    return data.map((item) => omit<T, typeof paths>(item, ...paths));
  };
};
