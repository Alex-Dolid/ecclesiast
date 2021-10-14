// Core
import * as os from "os";
import * as debug from "debug";
import { app } from "./server";
// Instruments
import { getPort, logger } from "./utils";
// DB
import "./db";

const PORT = getPort();
const dg = debug("server:main");

// eslint-disable-next-line import/no-unresolved,import/extensions,@typescript-eslint/no-var-requires
const { name } = require("../package.json");

const server: any = app.listen(PORT, () => {
  dg(`Server API is up on port ${ PORT }`);
  logger.info(`
      Node.js App running at http://localhost:${ PORT }
        Some information for You:
          name: ${ name }
          version: ${ process.version }
          mode: ${ process.env.NODE_ENV?.toUpperCase() }
          address: ${ server.address().address }:${ PORT } (${ os.hostname() })}
          port: ${ PORT }
          hostname: ${ os.hostname() }
          time: ${ new Date().toISOString() }
          versions: ${ JSON.stringify(process.versions) }
    `);
});
