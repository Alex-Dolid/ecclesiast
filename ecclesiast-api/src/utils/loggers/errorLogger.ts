// Core
import * as path from "path";
// Helpers
import { createFileLogger } from "./createFileLogger";

const filename = path.resolve(path.join("logs", "errors.log"));

export const errorLogger = createFileLogger(filename);
