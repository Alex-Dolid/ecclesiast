// Core
import * as mongoose from "mongoose";
// Types
import { Document, Schema } from "mongoose";

const createOdm = <T extends Document>(name: string, schema?: Schema, collection?: string, skipInit?: boolean): mongoose.Model<T> => {
  return mongoose.model<T>(name, schema, collection, skipInit);
};

export default createOdm;
