// Core
import * as mongoose from "mongoose";
// Libs
import * as debug from "debug";
// Utils
import { getDB } from "../utils";

const dg = debug("db");
const { DB_URL, DB_PORT, DB_NAME } = getDB();
const DB_FULL_URL = `mongodb://${ DB_URL }:${ DB_PORT }/${ DB_NAME }`;

const mongooseOptions = {
  promiseLibrary: global.Promise,
  poolSize: 50,
  keepAlive: true,
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: false
};

const connection = mongoose.connect(DB_FULL_URL, mongooseOptions);

connection
  .then(() => {
    dg(`DB ${ DB_NAME } connected to ${ DB_FULL_URL }`);
  })
  .catch(({ message }) => {
    dg(`DB ${ DB_NAME } connected with error: ${ message }`);
  });
