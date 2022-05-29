import { ObjectId } from "../deps.ts";
import db from "../services/database.ts";
import { Collection } from "../constants/collection.ts";

interface ProductSchema {
  _id?: ObjectId;
  productName: string;
  productPrice: number;
}

const productModel = db.collection<ProductSchema>(Collection.PRODUCTS);

export { db, productModel };
