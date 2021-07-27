// Utils
import { constructCRUDApi } from "@/app/utils";
// Types
import { LocaleType } from "@/types";

const NAME = "locales";

export default {
  ...constructCRUDApi<LocaleType>(NAME)
};
