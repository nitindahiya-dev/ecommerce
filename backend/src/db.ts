// backend/src/db.js
import { drizzle } from 'drizzle-orm/node-postgres';
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

let db;

export function initDb() {
  const client = postgres(process.env.DATABASE_URL);
  db = drizzle(client);
  console.log('Database initialized.');
}

export { db };
