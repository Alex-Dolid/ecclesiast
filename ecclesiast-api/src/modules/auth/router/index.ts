// Core
import * as express from "express";
// Routes
import { signIn, signUp, refresh, signOut, getSignInValidationSchema } from "./route";
// Utils
import { authenticate, limiter, validator } from "../../../middlewares";
// Schema
import { signInSchema, AuthSchemas } from "../schemas";
// Constants
import { LIMIT_REQUEST } from "../../../constants";
// Types
import { SignInPayload } from "../model";
import { UserS, UserSchemas, createSchema } from "../../users";

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
 * /auth/sign-in/validation-schema:
 *  get:
 *    tags:
 *      - Auth
 *    summary: Get sign in validation schema
 *    security: []
 *    responses:
 *      '200':
 *        description: Success
 */
router.get("/sign-in/validation-schema", getSignInValidationSchema);

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
router.post("/sign-up", [ validator<UserS, UserSchemas>(createSchema) ], signUp);


/**
 * @swagger
 * /auth/refresh/{id}:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Refresh token for user
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
 *                - $ref: '#/components/schemas/User'
 */
router.post("/refresh/:_id", [ authenticate ], refresh);

/**
 * @swagger
 * /auth/sign-out/{_id}:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Sign out in the app
 *    parameters:
 *      - $ref: '#/components/parameters/ID'
 *    responses:
 *      '200':
 *        description: Success
 */
router.post("/sign-out/:_id", [ authenticate ], signOut);

export { router as authRouter };
