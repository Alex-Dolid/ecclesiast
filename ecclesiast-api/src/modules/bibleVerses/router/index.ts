// Core
import * as express from "express";
// Routes
import { get, post, getById, removeById, updateById } from "./route";
// Utils
import { authenticate, limiter, validator, authorize } from "../../../middlewares";
// Schema
import { commonSchema, createSchema, BibleVersesSchemes, BibleVerseS } from "../schemas";
// Constants
import { LIMIT_REQUEST } from "../../../constants";
import { ROLES } from "../../accessRoles/constants";

const router = express.Router();

router.use([
  limiter(LIMIT_REQUEST.MAX, LIMIT_REQUEST.RESET_IN),
  authenticate,
  authorize([ ROLES.ADMIN ])
]);

/**
 * @swagger
 * tags:
 *   name: BibleVerses
 *   description: APIs to handle bible verses resources.
 */

/**
 * @swagger
 * /bible-verses:
 *  get:
 *    tags:
 *      - BibleVerses
 *    summary: Get list of all bible verses
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
 *                      - $ref: '#/components/schemas/BibleVerse'
 *                      - $ref: '#/components/schemas/LocaleObj'
 *                      - $ref: '#/components/schemas/BibleChapterObj'
 *                      - $ref: '#/components/schemas/BibleBookObj'
 */
router.get("/", get);

/**
 * @swagger
 * /bible-verses:
 *  post:
 *    tags:
 *      - BibleVerses
 *    summary: Create bible verse
 *    requestBody:
 *      $ref: '#/components/requestBodies/BibleVerseCreate'
 *    responses:
 *      '200':
 *        description: Success
 */
router.post("/", [ validator<BibleVerseS, BibleVersesSchemes>(createSchema) ], post);


/**
 * @swagger
 * /bible-verses/{_id}:
 *  get:
 *    tags:
 *      - BibleVerses
 *    summary: Get one bible verse by id
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
 *                - $ref: '#/components/schemas/BibleVerse'
 *                - $ref: '#/components/schemas/LocaleObj'
 *                - $ref: '#/components/schemas/BibleChapterObj'
 *                - $ref: '#/components/schemas/BibleBookObj'
 */
router.get("/:_id", getById);

/**
 * @swagger
 * /bible-verses/{_id}:
 *  put:
 *    tags:
 *      - BibleVerses
 *    summary: Update one bible verse by id
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    requestBody:
 *      $ref: '#/components/requestBodies/BibleVerseCreate'
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *                - $ref: '#/components/schemas/ID'
 *                - $ref: '#/components/schemas/BibleVerse'
 *                - $ref: '#/components/schemas/LocaleObj'
 *                - $ref: '#/components/schemas/BibleChapterObj'
 *                - $ref: '#/components/schemas/BibleBookObj'
 */
router.put("/:_id", [ validator<BibleVerseS, BibleVersesSchemes>(commonSchema) ], updateById);

/**
 * @swagger
 * /bible-verses/{_id}:
 *  delete:
 *    tags:
 *      - BibleVerses
 *    summary: Delete one bible verse by id
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    responses:
 *      '200':
 *        description: Success
 */
router.delete("/:_id", removeById);

export { router as bibleVersesRouter };
