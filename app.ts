import { Application, Router } from "./deps.ts";
import "./services/database.ts";
import { config } from "./dev_deps.ts";
const { PORT } = config();

import productRoutes from "./routes/product.ts";
import authRoutes from "./routes/authentication.ts";

const PORT_NO: number = parseInt(PORT || "8000");

const app: Application = new Application();
const router: Router = new Router();

app.use(productRoutes.routes());
app.use(authRoutes.routes());
app.use(router.allowedMethods());

console.log(`Server is running at PORT ${PORT}`);
await app.listen({ port: PORT_NO });
