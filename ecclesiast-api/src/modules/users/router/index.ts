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
router.get("/", [ authenticate, limiter(LIMIT_REQUEST.MAX, LIMIT_REQUEST.RESET_IN) ], get);
router.post("/", [ authenticate, limiter(LIMIT_REQUEST.MAX, LIMIT_REQUEST.RESET_IN), validator<User, UsersSchemas>(createSchema) ], post);


/**
 * @swagger
 * /users/${_id}:
 *  get:
 *    tags:
 *      - Users
 *    summary: Get one user by id
 *    parameters:
 *      - name: _id
 *        in: path
 *        description: id of user
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.get("/:_id", [ authenticate, limiter(LIMIT_REQUEST.MAX, LIMIT_REQUEST.RESET_IN) ], getById);
router.put("/:_id", [ authenticate, limiter(LIMIT_REQUEST.MAX, LIMIT_REQUEST.RESET_IN), validator<User, UsersSchemas>(commonSchema) ], updateById);
router.delete("/:_id", [ authenticate, limiter(LIMIT_REQUEST.MAX, LIMIT_REQUEST.RESET_IN) ], removeById);

export { router as usersRouter };
