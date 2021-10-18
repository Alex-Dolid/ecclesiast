// Core
import * as path from "path";
// Helpers
import { createFileLogger } from "./createFileLogger";

const filename = path.resolve(path.join("logs", "permission_errors.log"));

export const permissionLogger = createFileLogger(filename);
