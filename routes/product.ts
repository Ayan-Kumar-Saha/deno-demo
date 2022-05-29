import { Router } from "../deps.ts";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.ts";

const router = new Router();

router
  .get("/api/products", getProducts)
  .get("/api/products/:id", getProduct)
  .post("/api/products", addProduct)
  .put("/api/products/:id", updateProduct)
  .delete("/api/products/:id", deleteProduct);

export default router;
