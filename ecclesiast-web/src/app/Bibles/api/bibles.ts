// Utils
import { constructCRUDApi } from "@/app/utils";
// Types
import { BibleType } from "@/types";

const NAME = "bibles";

export default {
  ...constructCRUDApi<BibleType>(NAME)
};
