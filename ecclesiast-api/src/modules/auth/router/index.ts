// Core
import * as express from "express";
// Routes
import { signIn, signUp, refresh } from "./route";
// Utils
import { authenticate, limiter, validator } from "../../../utils";
// Schema
import { signInSchema } from "../schemas";
// Constants
import { LIMIT_REQUEST } from "../../../constants";
// Types
import { AuthSchemas } from "../schemas/types";
import { SignInPayload } from "../model";
import { UserS, UsersSchemas, createSchema } from "../../users";

const router = express.Router();

router.use([ limiter(LIMIT_REQUEST.MAX, LIMIT_REQUEST.RESET_IN) ]);

/**
 * @swagger
 * /sign-in:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Sign in to the app
 *    requestBody:
 *      $ref: '#/components/requestBodies/AuthSignIn'
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/User'
 */
router.get("/sign-in", [ validator<SignInPayload, AuthSchemas>(signInSchema) ], signIn);

/**
 * @swagger
 * /sign-up:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Sign up in the app
 *    requestBody:
 *      $ref: '#/components/requestBodies/UserCreate'
 *    responses:
 *      '200':
 *        description: Success
 */
router.post("/sign-up", [ validator<UserS, UsersSchemas>(createSchema) ], signUp);


/**
 * @swagger
 * /refresh:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Refresh token for user
 *    requestBody:
 *      $ref: '#/components/requestBodies/AuthSignIn'
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 */
router.get("/refresh", [ authenticate, validator<SignInPayload, AuthSchemas>(signInSchema) ], refresh);

export { router as authRouter };
