// Core
import * as express from "express";
// Routes
import { get, post, getById, removeById, updateById } from "./route";
// Utils
import { authenticate, limiter, validator, authorize } from "../../../middlewares";
// Schema
import { commonSchema, createSchema, BibleChapterSchemas } from "../schemas";
// Constants
import { LIMIT_REQUEST } from "../../../constants";
import { ROLES } from "../../accessRoles/constants";
// Types
import { BibleChapter } from "../odm";

const router = express.Router();

router.use([
  limiter(LIMIT_REQUEST.MAX, LIMIT_REQUEST.RESET_IN),
  authenticate,
  authorize([ ROLES.ADMIN ])
]);

/**
 * @swagger
 * tags:
 *   name: BibleChapters
 *   description: APIs to handle bible chapters resources.
 */

/**
 * @swagger
 * /bible-chapters:
 *  get:
 *    tags:
 *      - BibleChapters
 *    summary: Get list of all bible chapters
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                pagination:
 *                  $ref: '#/components/schemas/Pagination'
 *                data:
 *                  type: array
 *                  items:
 *                    allOf:
 *                      - $ref: '#/components/schemas/ID'
 *                      - $ref: '#/components/schemas/BibleChapter'
 */
router.get("/", get);

/**
 * @swagger
 * /bible-chapters:
 *  post:
 *    tags:
 *      - BibleChapters
 *    summary: Create bible chapter
 *    requestBody:
 *      $ref: '#/components/requestBodies/BibleChapterCreate'
 *    responses:
 *      '200':
 *        description: Success
 */
router.post("/", [ validator<BibleChapter, BibleChapterSchemas>(createSchema) ], post);


/**
 * @swagger
 * /bible-chapters/{_id}:
 *  get:
 *    tags:
 *      - BibleChapters
 *    summary: Get one bible chapter by id
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *                - $ref: '#/components/schemas/ID'
 *                - $ref: '#/components/schemas/BibleChapter'
 */
router.get("/:_id", getById);

/**
 * @swagger
 * /bible-chapters/{_id}:
 *  put:
 *    tags:
 *      - BibleChapters
 *    summary: Update one bible chapter
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    requestBody:
 *      $ref: '#/components/requestBodies/BibleChapterCreate'
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *                - $ref: '#/components/schemas/ID'
 *                - $ref: '#/components/schemas/BibleChapter'
 */
router.put("/:_id", [ validator<BibleChapter, BibleChapterSchemas>(commonSchema) ], updateById);

/**
 * @swagger
 * /bible-chapters/{_id}:
 *  delete:
 *    tags:
 *      - BibleChapters
 *    summary: Delete one bible chapter
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    responses:
 *      '200':
 *        description: Success
 */
router.delete("/:_id", removeById);

export { router as bibleChaptersRouter };
