// Core
import * as express from "express";
// Routes
import { get, post, getById, removeById, updateById } from "./route";
// Utils
import { authenticate, limiter, validator, authorize } from "../../../middlewares";
// Schema
import { commonSchema, createSchema } from "../schemas";
// Constants
import { LIMIT_REQUEST } from "../../../constants";
import { ROLES } from "../constants";
// Types
import { AccessRolesSchemas } from "../schemas/types";
import { AccessRole } from "../odm";

const router = express.Router();

router.use([
  limiter(LIMIT_REQUEST.MAX, LIMIT_REQUEST.RESET_IN),
  authenticate,
  authorize([ ROLES.SUPER_ADMIN ])
]);

// TODO anyof ID зробити для accessRoles, users !(останній раз рефакторив locales, продовжити...)!

/**
 * @swagger
 * tags:
 *   name: AccessRoles
 *   description: APIs to handle access roles resources.
 */

/**
 * @swagger
 * /access-roles:
 *  get:
 *    tags:
 *      - AccessRoles
 *    summary: Get list of all access roles
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
 *                    $ref: '#/components/schemas/AccessRole'
 */
router.get("/", get);

/**
 * @swagger
 * /access-roles:
 *  post:
 *    tags:
 *      - AccessRoles
 *    summary: Create access role
 *    requestBody:
 *      $ref: '#/components/requestBodies/AccessRoleCreate'
 *    responses:
 *      '200':
 *        description: Success
 */
router.post("/", [ validator<AccessRole, AccessRolesSchemas>(createSchema) ], post);


/**
 * @swagger
 * /access-roles/{_id}:
 *  get:
 *    tags:
 *      - AccessRoles
 *    summary: Get one access role by id
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AccessRole'
 */
router.get("/:_id", getById);

/**
 * @swagger
 * /access-roles/{_id}:
 *  put:
 *    tags:
 *      - AccessRoles
 *    summary: Update one access role
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    requestBody:
 *      $ref: '#/components/requestBodies/AccessRoleCreate'
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/AccessRole'
 */
router.put("/:_id", [ validator<AccessRole, AccessRolesSchemas>(commonSchema) ], updateById);

/**
 * @swagger
 * /access-roles/{_id}:
 *  delete:
 *    tags:
 *      - AccessRoles
 *    summary: Delete one access role
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    responses:
 *      '200':
 *        description: Success
 */
router.delete("/:_id", removeById);

export { router as accessRolesRouter };
