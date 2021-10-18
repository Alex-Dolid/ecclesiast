// Core
import * as path from "path";
// Helpers
import { createFileLogger } from "./createFileLogger";

const filename = path.resolve(path.join("logs", "server_errors.log"));

export const serverLogger = createFileLogger(filename);
