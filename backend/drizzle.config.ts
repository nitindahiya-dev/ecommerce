// drizzle.config.ts
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',         // Directory where generated files (migrations, types, etc.) will be placed
  schema: './src/schema.ts', // Path to your schema file
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
