import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL as string;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in the environment variables");
}

export const client = new Client({
  connectionString,
});

const main = async () => {
  await client.connect();
};
main();

const db = drizzle(client, { schema, logger: true });

export default db;
