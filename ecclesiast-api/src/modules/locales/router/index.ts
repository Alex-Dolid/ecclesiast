// Core
import * as express from "express";
// Routes
import { get, post } from "./route";
import { getById, removeById, updateById } from "./hash";
// Utils
import { authenticate, limiter, validator } from "../../../utils";
// Schemas
import { commonSchema, createSchema } from "../schemas";
// Types
import { LocaleType } from "../locales.odm";
import { LocalesSchemasType } from "../schemas/types";

const router = express.Router();

router.get("/", [ limiter(10, 60 * 1000) ], get);
router.post("/", [ limiter(10, 60 * 1000), validator<LocaleType, LocalesSchemasType>(createSchema) ], post);

router.get("/:_id", [ authenticate, limiter(10, 60 * 1000) ], getById);
router.put("/:_id", [ limiter(10, 60 * 1000), validator<LocaleType, LocalesSchemasType>(commonSchema) ], updateById);
router.delete("/:_id", [ authenticate, limiter(10, 60 * 1000) ], removeById);

export { router as localesRouter };
