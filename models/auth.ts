import { ObjectId } from "../deps.ts";
import db from "../services/database.ts";
import { Collection } from "../constants/collection.ts";

interface AuthSchema {
  _id?: ObjectId;
  email: string;
  password: string;
}

const authModel = db.collection<AuthSchema>(Collection.AUTH);

export { db, authModel };