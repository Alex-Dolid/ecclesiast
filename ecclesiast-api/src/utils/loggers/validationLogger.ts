// Core
import * as path from "path";
// Helpers
import { createFileLogger } from "./createFileLogger";

const filename = path.resolve(path.join("logs", "validation_errors.log"));

export const validationLogger = createFileLogger(filename);
