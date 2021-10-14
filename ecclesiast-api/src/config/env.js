// Constants
import { ENV } from "../constants";

const { env } = process;
const NODE_ENV = (env.NODE_ENV || ENV.DEV).toLowerCase();

module.exports = {
  node_env: NODE_ENV,
  prod: NODE_ENV === ENV.PROD,
  dev: NODE_ENV === ENV.DEV,
  test: NODE_ENV === ENV.TEST
};
