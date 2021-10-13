// Core
import * as express from "express";
// Routes
import { get, post, getById, removeById, updateById } from "./route";
// Utils
import { authenticate, limiter, validator, authorize } from "../../../middlewares";
// Schema
import { commonSchema, createSchema, BibleBookSchemas, BibleBookS } from "../schemas";
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
 *   name: BibleBooks
 *   description: APIs to handle bible books resources.
 */

/**
 * @swagger
 * /bible-books:
 *  get:
 *    tags:
 *      - BibleBooks
 *    summary: Get list of all bible books
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
 *      - BibleBooks
 *    summary: Create bible book
 *    requestBody:
 *      $ref: '#/components/requestBodies/BibleBookCreate'
 *    responses:
 *      '200':
 *        description: Success
 */
router.post("/", [ validator<BibleBookS, BibleBookSchemas>(createSchema) ], post);


/**
 * @swagger
 * /bible-books/{_id}:
 *  get:
 *    tags:
 *      - BibleBooks
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
 * /bible-books/{_id}:
 *  put:
 *    tags:
 *      - BibleBooks
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
router.put("/:_id", [ validator<BibleBookS, BibleBookSchemas>(commonSchema) ], updateById);

/**
 * @swagger
 * /bible-books/{_id}:
 *  delete:
 *    tags:
 *      - BibleBooks
 *    summary: Delete one bible book
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    responses:
 *      '200':
 *        description: Success
 */
router.delete("/:_id", removeById);

export { router as bibleBooksRouter };
