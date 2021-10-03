// Types
import { Middleware } from "../types";

export const clearDataFromSecrets = (data: Record<string, any>, keys: string[]): Record<string, any> => {
  const newData = { ...data };

  Object.keys(newData).forEach((key) => keys.includes(key) ? delete newData[key] : null);

  return newData;
};

export const clearFromSecrets = (keys: string[]): Middleware => (data: any): any => {
  if (typeof data !== "object") {
    return data;
  }

  if (!Array.isArray(data)) {
    return clearDataFromSecrets(data, keys);
  }

  return data.map((item) => clearDataFromSecrets(item, keys));
};
