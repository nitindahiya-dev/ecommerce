// backend/src/db.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import postgres, { Sql } from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

let db: ReturnType<typeof drizzle>;

export function initDb() {
  const client: Sql = postgres(process.env.DATABASE_URL!);
  db = drizzle(client);
  console.log('Database initialized.');
}

export { db };