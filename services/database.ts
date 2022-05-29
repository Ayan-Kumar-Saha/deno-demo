import { MongoClient } from "../deps.ts";
import { config } from "../dev_deps.ts";

const {
  DB_NAME,
  DB_HOST_SERVER_0,
  DB_HOST_SERVER_1,
  DB_HOST_SERVER_2,
  DB_USERNAME,
  DB_PASSWORD,
} = config();

const client = new MongoClient();
const db = await client
  .connect({
    db: DB_NAME || "",
    tls: true,
    servers: [
      {
        host: DB_HOST_SERVER_0 || "",
        port: 27017,
      },
      {
        host: DB_HOST_SERVER_1 || "",
        port: 27017,
      },
      {
        host: DB_HOST_SERVER_2 || "",
        port: 27017,
      },
    ],
    credential: {
      username: DB_USERNAME,
      password: DB_PASSWORD,
      db: DB_NAME,
      mechanism: "SCRAM-SHA-1",
    },
  });

export default db;
