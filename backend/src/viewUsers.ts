import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import { users } from './schema'; // Adjust the path if necessary
import { eq } from 'drizzle-orm/expressions';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function viewUsers() {
  try {
    const allUsers = await db
      .select()
      .from(users);

    console.log("Users in the database:", allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    await pool.end(); // Close the database connection
  }
}

viewUsers();