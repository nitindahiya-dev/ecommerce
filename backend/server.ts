import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initDb, db } from "./src/db";
import { users } from "./src/schema";
import { eq } from "drizzle-orm/expressions";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

// Initialize database (using drizzle with pg Pool)
initDb();

// Define an array of allowed origins
const allowedOrigins = [
  "https://ecommerce-j22k.vercel.app",
  "http://192.168.1.9:3001",
];

// Configure CORS with a dynamic origin function
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        // Origin is allowed
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allow cookies and authorization headers if needed
  })
);

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Registration endpoint
app.post("/api/register", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const existingUsers = await db.select().from(users).where(eq(users.email, email));
    if (existingUsers.length > 0) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
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
app.post("/api/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const foundUsers = await db.select().from(users).where(eq(users.email, email));
    if (foundUsers.length === 0) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const user = foundUsers[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token, user });
    return;
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

// Update Profile endpoint
app.put("/api/update-profile", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, name, email, currentPassword, newPassword } = req.body;
    if (!id) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    const foundUsers = await db.select().from(users).where(eq(users.id, id));
    if (foundUsers.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const user = foundUsers[0];
    let updatedPassword = user.password;
    if (newPassword) {
      if (!currentPassword) {
        res.status(400).json({ message: "Current password is required to change password" });
        return;
      }
      const passwordMatch = await bcrypt.compare(currentPassword, user.password);
      if (!passwordMatch) {
        res.status(401).json({ message: "Current password is incorrect" });
        return;
      }
      updatedPassword = await bcrypt.hash(newPassword, 10);
    }
    const [updatedUser] = await db
      .update(users)
      .set({ name, email, password: updatedPassword })
      .where(eq(users.id, id))
      .returning();
    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    return;
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
});

// Logout endpoint
app.post("/api/logout", (req: Request, res: Response): void => {
  res.clearCookie("token", { httpOnly: true });
  res.status(200).json({ message: "Logged out successfully" });
});

// Test endpoint
app.get("/api", (req: Request, res: Response): void => {
  res.json({ message: "E-commerce API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
