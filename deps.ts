/**
 * This file will serve similar purpose as
 * "dependencies" section of package.json in Node
 */

export {
  Application,
  Router,
  Status,
  STATUS_TEXT,
  Request,
  Response
} from "https://deno.land/x/oak@v10.5.1/mod.ts";

export {
  Bson,
  MongoClient,
  ObjectId
} from "https://deno.land/x/mongo@v0.30.0/mod.ts";