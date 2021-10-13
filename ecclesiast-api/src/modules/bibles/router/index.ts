// Core
import * as express from "express";
// Routes
import { get, post, getById, removeById, updateById } from "./route";
// Utils
import { authenticate, limiter, validator, authorize } from "../../../middlewares";
// Schema
import { commonSchema, createSchema, BibleSchemas, BibleS } from "../schemas";
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
 *   name: Bibles
 *   description: APIs to handle bibles resources.
 */

/**
 * @swagger
 * /bibles:
 *  get:
 *    tags:
 *      - Bibles
 *    summary: Get list of all bibles
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
 *                      - $ref: '#/components/schemas/Bible'
 *                      - $ref: '#/components/schemas/LocaleObj'
 *                      - $ref: '#/components/schemas/BibleVersesObj'
 */
router.get("/", get);

/**
 * @swagger
 * /bibles:
 *  post:
 *    tags:
 *      - Bibles
 *    summary: Create bible
 *    requestBody:
 *      $ref: '#/components/requestBodies/BibleCreate'
 *    responses:
 *      '200':
 *        description: Success
 */
router.post("/", [ validator<BibleS, BibleSchemas>(createSchema) ], post);


/**
 * @swagger
 * /bibles/{_id}:
 *  get:
 *    tags:
 *      - Bibles
 *    summary: Get one bible by id
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
 *                - $ref: '#/components/schemas/Bible'
 *                - $ref: '#/components/schemas/LocaleObj'
 *                - $ref: '#/components/schemas/BibleVersesObj'
 */
router.get("/:_id", getById);

/**
 * @swagger
 * /bibles/{_id}:
 *  put:
 *    tags:
 *      - Bibles
 *    summary: Update one bible by id
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    requestBody:
 *      $ref: '#/components/requestBodies/BibleCreate'
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *                - $ref: '#/components/schemas/ID'
 *                - $ref: '#/components/schemas/Bible'
 *                - $ref: '#/components/schemas/LocaleObj'
 *                - $ref: '#/components/schemas/BibleVersesObj'
 */
router.put("/:_id", [ validator<BibleS, BibleSchemas>(commonSchema) ], updateById);

/**
 * @swagger
 * /bibles/{_id}:
 *  delete:
 *    tags:
 *      - Bibles
 *    summary: Delete one bible by id
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    responses:
 *      '200':
 *        description: Success
 */
router.delete("/:_id", removeById);

export { router as biblesRouter };
