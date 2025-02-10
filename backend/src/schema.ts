// backend/src/schema.ts
import { pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(), // Hashed password
  resetToken: text('reset_token'), // New column for reset token (nullable)
  createdAt: timestamp('created_at').defaultNow(),
});

// Existing products table (if needed)
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});