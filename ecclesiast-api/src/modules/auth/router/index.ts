// Core
import * as express from "express";
// Routes
import { signIn, signUp, refresh } from "./route";
// Utils
import { authenticate, limiter, validator } from "../../../middlewares";
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
 * tags:
 *   name: Auth
 *   description: APIs to handle auth resources.
 */

/**
 * @swagger
 * /auth/sign-in:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Sign in to the app
 *    security: []
 *    requestBody:
 *      $ref: '#/components/requestBodies/AuthSignIn'
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ID'
 *                 - $ref: '#/components/schemas/User'
 */
router.post("/sign-in", [ validator<SignInPayload, AuthSchemas>(signInSchema) ], signIn);

/**
 * @swagger
 * /auth/sign-up:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Sign up in the app
 *    security: []
 *    requestBody:
 *      $ref: '#/components/requestBodies/UserCreate'
 *    responses:
 *      '200':
 *        description: Success
 */
router.post("/sign-up", [ validator<UserS, UsersSchemas>(createSchema) ], signUp);


/**
 * @swagger
 * /auth/refresh:
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
 *              allOf:
 *                - $ref: '#/components/schemas/ID'
 *                - $ref: '#/components/schemas/User'
 */
router.post("/refresh", [ authenticate, validator<SignInPayload, AuthSchemas>(signInSchema) ], refresh);

export { router as authRouter };
