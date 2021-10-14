// Core
import * as os from "os";
import * as mongoose from "mongoose";
import * as debug from "debug";
import { app } from "./server";
// Instruments
import { getPort, logger } from "./utils";
import config from "./config";
// DB
import "./db";

const { name } = require("../package.json");

const PORT = getPort();
const dg = debug("server:main");

const server: any = app.listen(PORT, () => {
  dg(`Server API is up on port ${ PORT }`);
  logger.info(`
      Node.js App running at http://localhost:${ PORT }
        Some information for You:
          name: ${ name }
          node: ${ process.version }
          mode: ${ config.env.node_env.toUpperCase() }
          address: ${ server.address().address }:${ PORT } (${ os.hostname() })}
          port: ${ PORT }
          hostname: ${ os.hostname() }
          time: ${ new Date().toISOString() }
          versions: ${ JSON.stringify(process.versions) }
    `);
});

const terminateHandler = () => {
  logger.warn("Received SIGTERM, closing server...");
  Promise.all([ mongoose.disconnect(), server.close() ]).then(() => {
    logger.warn("Server closed upon SIGTERM, exiting with code 0");
    // eslint-disable-next-line no-process-exit
    process.exit(0);
  });
};

process.on("SIGTERM", terminateHandler);
process.on("SIGINT", terminateHandler);
process.on("uncaughtException", logger.error);
process.on("unhandledRejection", logger.error);
