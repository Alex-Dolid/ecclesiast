// Core
import * as express from "express";
// Routes
import { get, post } from "./route";
import { getById, removeById, updateById } from "./hash";
// Utils
import { authenticate, limiter, validator } from "../../../middlewares";
// Schema
import { commonSchema, createSchema } from "../schemas";
import { BibleBookSType, BiblesBooksSchemasType } from "../schemas/types";

const router = express.Router();

router.get("/", [ limiter(10, 60 * 1000) ], get);
router.post("/", [ limiter(10, 60 * 1000), validator<BibleBookSType, BiblesBooksSchemasType>(createSchema) ], post);

router.get("/:_id", [ authenticate, limiter(10, 60 * 1000) ], getById);
router.put("/:_id", [ authenticate, limiter(10, 60 * 1000), validator<BibleBookSType, BiblesBooksSchemasType>(commonSchema) ], updateById);
router.delete("/:_id", [ authenticate, limiter(10, 60 * 1000) ], removeById);

export { router as biblesBooksRouter };
