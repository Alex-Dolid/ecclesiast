// Types
import { BibleChapterCommonScheme } from "./types";

export const common: BibleChapterCommonScheme = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      nullable: true
    },
    name: {
      type: "number",
      minimum: 1
    }
  },
  additionalProperties: false,
  required: []
};
