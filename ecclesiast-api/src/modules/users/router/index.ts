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
 *    summary: Get all users
 *    responses:
 *      '200':
 *        description: Get all users data success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Users'
 */
router.get("/", [ authenticate, limiter(LIMIT_REQUEST.MAX, LIMIT_REQUEST.RESET_IN) ], get);
router.post("/", [ authenticate, limiter(LIMIT_REQUEST.MAX, LIMIT_REQUEST.RESET_IN), validator<User, UsersSchemas>(createSchema) ], post);

router.get("/:_id", [ authenticate, limiter(LIMIT_REQUEST.MAX, LIMIT_REQUEST.RESET_IN) ], getById);
router.put("/:_id", [ authenticate, limiter(LIMIT_REQUEST.MAX, LIMIT_REQUEST.RESET_IN), validator<User, UsersSchemas>(commonSchema) ], updateById);
router.delete("/:_id", [ authenticate, limiter(LIMIT_REQUEST.MAX, LIMIT_REQUEST.RESET_IN) ], removeById);

export { router as usersRouter };