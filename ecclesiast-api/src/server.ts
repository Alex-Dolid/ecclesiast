// Core
import * as express from "express";
import { Application } from "express";
// Libs
import * as cors from "cors";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerJsdoc from "swagger-jsdoc";
// Utils
import { getPort, logger } from "./utils";
import { swaggerOptions } from "./init";
import config from "./config";
// Middlewares
import { ErrorHandler, handleNotFoundRoute, requestResponseLogger } from "./middlewares";
// Routes
import { routes } from "./routers";
// Constants
import { ENV } from "./constants";

const app: Application = express();

// Common Middlewares
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// Debug Logger
if (config.env.node_env === ENV.DEV) {
  app.use(requestResponseLogger);
}

// Routers
Object.entries(routes).forEach(([ route, router ]) => app.use(route, router));

// Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);
if (config.swagger.access) {
  const SWAGGER_ROUTE = "/api-docs";
  const PORT = getPort();

  app.use(SWAGGER_ROUTE, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  logger.info(`Swagger API is available on URL: http://localhost:${ PORT }${ SWAGGER_ROUTE }`);
}

// NotFound Route
app.use("*", handleNotFoundRoute);

// Error Handler
if (config.env.node_env !== ENV.TEST) {
  app.use(ErrorHandler);
}

export { app };
