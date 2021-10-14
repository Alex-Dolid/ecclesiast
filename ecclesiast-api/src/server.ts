// Core
import * as express from "express";
import { Request, Response, Application, NextFunction } from "express";
// Libs
import * as cors from "cors";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerJsdoc from "swagger-jsdoc";
// Instruments
import {
  errorLogger,
  getPort,
  logger,
  NotFoundError,
  notFoundLogger,
  validationLogger
} from "./utils";
import { swaggerOptions } from "./init";
import config from "./config";
// Helpers
import { sendResponse } from "./helpers";
// Routes
import { routes } from "./routers";
// Constants
import { Statuses } from "./constants";
// Types
import { IErrorHandler } from "./types";

const app: Application = express();
app.use(cors());

app.use(express.json({ limit: "10kb" }));

// Logger
if (process.env.NODE_ENV === "dev") {
  app.use((req, res, next) => {
    let body = null;

    if (req.method !== "GET") {
      body = JSON.stringify(req.body, null, 2);
    }

    logger.debug(`${ req.method } ${ req.url } ${ body ? `\n${ body }` : "" }`);
    next();
  });
}

// Routers
Object.entries(routes).forEach(([ route, router ]) => app.use(route, router));

// Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);
if (config.swagger.access === "true") {
  const SWAGGER_ROUTE = "/api-docs";
  const PORT = getPort();

  app.use(SWAGGER_ROUTE, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  logger.info(`Swagger API is available on URL: http://localhost:${ PORT }${ SWAGGER_ROUTE }`);
}

// NotFound Route
app.use("*", (req, res, next) => {
  const error = new NotFoundError(
    `Can not find right route for method ${ req.method } and path ${ req.originalUrl }`
  );
  next(error);
});

if (process.env.NODE_ENV !== "test") {
  app.use((error: Error & IErrorHandler, req: Request, res: Response, next: NextFunction) => {
    const { name, message, statusCode = Statuses.ServerError } = error;
    const errorMessage = `${ name }: ${ message }`;

    switch (error.name) {
      case "NotFoundError":
        notFoundLogger.error(errorMessage);
        break;

      case "ValidationError":
        validationLogger.error(errorMessage);
        break;

      default:
        errorLogger.error(errorMessage);
        break;
    }

    sendResponse(res, { type: "error", name: error.name, message }, { statusCode });
  });
}

export { app };
