// Core
import * as express from "express";
// Routes
import { get, post, getById, removeById, updateById } from "./route";
// Utils
import { authenticate, limiter, validator, authorize } from "../../../middlewares";
// Schema
import { commonSchema, createSchema, BiblesBooksSchemas, BibleBookS } from "../schemas";
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
 *   name: BiblesBooks
 *   description: APIs to handle bibles books resources.
 */

/**
 * @swagger
 * /bibles-books:
 *  get:
 *    tags:
 *      - BiblesBooks
 *    summary: Get list of all bibles books
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
 *                      - $ref: '#/components/schemas/BibleBook'
 *                      - $ref: '#/components/schemas/LocaleObj'
 */
router.get("/", get);

/**
 * @swagger
 * /bibles-book:
 *  post:
 *    tags:
 *      - BiblesBooks
 *    summary: Create bible book
 *    requestBody:
 *      $ref: '#/components/requestBodies/BibleBookCreate'
 *    responses:
 *      '200':
 *        description: Success
 */
router.post("/", [ validator<BibleBookS, BiblesBooksSchemas>(createSchema) ], post);


/**
 * @swagger
 * /bibles-books/{_id}:
 *  get:
 *    tags:
 *      - BiblesBooks
 *    summary: Get one bible book by id
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
 *                - $ref: '#/components/schemas/BibleBook'
 *                - $ref: '#/components/schemas/LocaleObj'
 */
router.get("/:_id", getById);

/**
 * @swagger
 * /bibles-books/{_id}:
 *  put:
 *    tags:
 *      - BiblesBooks
 *    summary: Update one bible books
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    requestBody:
 *      $ref: '#/components/requestBodies/BibleBookCreate'
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *                - $ref: '#/components/schemas/ID'
 *                - $ref: '#/components/schemas/BibleBook'
 *                - $ref: '#/components/schemas/LocaleObj'
 */
router.put("/:_id", [ validator<BibleBookS, BiblesBooksSchemas>(commonSchema) ], updateById);

/**
 * @swagger
 * /bibles-books/{_id}:
 *  delete:
 *    tags:
 *      - BiblesBooks
 *    summary: Delete one bible book
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    responses:
 *      '200':
 *        description: Success
 */
router.delete("/:_id", removeById);

export { router as biblesBooksRouter };
