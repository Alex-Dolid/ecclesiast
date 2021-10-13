// Types
import { BibleBookCommonScheme } from "./types";

export const common: BibleBookCommonScheme = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      nullable: true
    },
    name: {
      type: "string",
      minLength: 3
    },
    locale: {
      type: "string",
      minLength: 3
    }
  },
  additionalProperties: false,
  required: []
};
