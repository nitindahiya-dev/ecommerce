// backend/server.ts
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initDb, db } from "./src/db";
import { users } from "./src/schema";
// Import eq from drizzle-orm/expressions – adjust this if needed for your version
import { eq } from "drizzle-orm/expressions";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

// Initialize database (using drizzle with pg Pool)
initDb();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Registration endpoint
app.post("/api/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if a user with the same email already exists
    const existingUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (existingUsers.length > 0) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning();

    res.status(201).json({ message: "User registered successfully", user: newUser });
    return;
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

// Login endpoint
app.post("/api/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const foundUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (foundUsers.length === 0) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const user = foundUsers[0];

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate a JWT token (set an appropriate expiration)
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
    return;
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});


// Fetch all users endpoint
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const allUsers = await db
      .select()
      .from(users);

    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/api/logout", (req: Request, res: Response) => {
  // Clear the cookie named "token" (adjust the cookie name if needed)
  res.clearCookie("token", { httpOnly: true });
  res.status(200).json({ message: "Logged out successfully" });
});


// Test endpoint to verify the API is running
app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "E-commerce API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
