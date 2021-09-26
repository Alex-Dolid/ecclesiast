// Core
import * as express from "express";
// Routes
import { get, post, getById, removeById, updateById } from "./route";
// Utils
import { authenticate, limiter, validator } from "../../../utils";
// Schema
import { commonSchema, createSchema } from "../schemas";
// Constants
import { LIMIT_REQUEST } from "../../../constants";
// Types
import { UsersSchemas } from "../schemas/types";
import { User } from "../users.odm";

const router = express.Router();

router.use([ authenticate, limiter(LIMIT_REQUEST.MAX, LIMIT_REQUEST.RESET_IN) ]);

/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *      - Users
 *    summary: Get list of all users
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
router.get("/", get);

/**
 * @swagger
 * /users:
 *  post:
 *    tags:
 *      - Users
 *    summary: Create user
 *    requestBody:
 *      $ref: '#/components/requestBodies/UserCreate'
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/User'
 */
router.post("/", [ validator<User, UsersSchemas>(createSchema) ], post);


/**
 * @swagger
 * /users/${_id}:
 *  get:
 *    tags:
 *      - Users
 *    summary: Get one user by id
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.get("/:_id", getById);

/**
 * @swagger
 * /users/${_id}:
 *  put:
 *    tags:
 *      - Users
 *    summary: Update one user
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    requestBody:
 *      $ref: '#/components/requestBodies/UserCreate'
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/User'
 */
router.put("/:_id", [ validator<User, UsersSchemas>(commonSchema) ], updateById);

/**
 * @swagger
 * /users/${_id}:
 *  delete:
 *    tags:
 *      - Users
 *    summary: Delete one user
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/User'
 */
router.delete("/:_id", removeById);

export { router as usersRouter };
