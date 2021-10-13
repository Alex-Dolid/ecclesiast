// Core
import * as express from "express";
// Routes
import { get, post, getById, removeById, updateById } from "./route";
// Utils
import { authenticate, limiter, validator, authorize } from "../../../middlewares";
// Schema
import { commonSchema, createSchema, LocaleSchemas } from "../schemas";
// Constants
import { LIMIT_REQUEST } from "../../../constants";
import { ROLES } from "../../accessRoles/constants";
// Types
import { Locale } from "../odm";

const router = express.Router();

router.use([
  limiter(LIMIT_REQUEST.MAX, LIMIT_REQUEST.RESET_IN),
  authenticate,
  authorize([ ROLES.ADMIN ])
]);

/**
 * @swagger
 * tags:
 *   name: Locales
 *   description: APIs to handle locales resources.
 */

/**
 * @swagger
 * /locales:
 *  get:
 *    tags:
 *      - Locales
 *    summary: Get list of all locales
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
 *                      - $ref: '#/components/schemas/Locale'
 */
router.get("/", get);

/**
 * @swagger
 * /locales:
 *  post:
 *    tags:
 *      - Locales
 *    summary: Create locale
 *    requestBody:
 *      $ref: '#/components/requestBodies/LocaleCreate'
 *    responses:
 *      '200':
 *        description: Success
 */
router.post("/", [ validator<Locale, LocaleSchemas>(createSchema) ], post);


/**
 * @swagger
 * /locales/{_id}:
 *  get:
 *    tags:
 *      - Locales
 *    summary: Get one locale by id
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
 *                - $ref: '#/components/schemas/Locale'
 */
router.get("/:_id", getById);

/**
 * @swagger
 * /locales/{_id}:
 *  put:
 *    tags:
 *      - Locales
 *    summary: Update one locale
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    requestBody:
 *      $ref: '#/components/requestBodies/LocaleCreate'
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *                - $ref: '#/components/schemas/ID'
 *                - $ref: '#/components/schemas/Locale'
 */
router.put("/:_id", [ validator<Locale, LocaleSchemas>(commonSchema) ], updateById);

/**
 * @swagger
 * /locales/{_id}:
 *  delete:
 *    tags:
 *      - Locales
 *    summary: Delete one locale
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    responses:
 *      '200':
 *        description: Success
 */
router.delete("/:_id", removeById);

export { router as localesRouter };
