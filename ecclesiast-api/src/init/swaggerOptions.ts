// import config from "../config";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as swaggerDefinition from "./swagger";

const swaggerOptions = {
  swaggerDefinition,
  // securityDefinitions: {
  //   bearerAuth: {
  //     type: "apiKey",
  //     name: config.auth.sessionid,
  //     in: "cookie"
  //   }
  // },
  apis: [ "src/modules/**/sw.yaml", "src/modules/**/index.**" ]
};

export default swaggerOptions;
