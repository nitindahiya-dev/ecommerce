// backend/server.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initDb } from "./src/db";

dotenv.config();

const app = express();

// Initialize database (drizzle)
initDb();

app.use(cors());
app.use(express.json());

// Example API endpoint with typed parameters
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'E-commerce API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});