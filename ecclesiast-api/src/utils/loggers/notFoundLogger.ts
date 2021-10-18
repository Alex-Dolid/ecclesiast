// Core
import * as path from "path";
// Helpers
import { createFileLogger } from "./createFileLogger";

const filename = path.resolve(path.join("logs", "not_found_errors.log"));

export const notFoundLogger = createFileLogger(filename);
