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
app.post("/api/register", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if a user with the same email already exists
    const existingUsers = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (existingUsers.length > 0) {
      void res.status(400).json({ message: "User already exists" });
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

    void res.status(201).json({ message: "User registered successfully", user: newUser });
    return;
  } catch (error) {
    console.error("Registration error:", error);
    void res.status(500).json({ message: "Internal server error" });
    return;
  }
});

// Login endpoint
app.post("/api/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const foundUsers = await db.select().from(users).where(eq(users.email, email));
    if (foundUsers.length === 0) {
      void res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const user = foundUsers[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      void res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    void res.status(200).json({ message: "Login successful", token, user });
    return;
  } catch (error) {
    console.error("Login error:", error);
    void res.status(500).json({ message: "Internal server error" });
    return;
  }
});



// Fetch all users endpoint
app.get("/api/users", async (req: Request, res: Response): Promise<void> => {
  try {
    const allUsers = await db
      .select()
      .from(users);
    void res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    void res.status(500).json({ message: "Internal server error" });
  }
});

// Update Profile endpoint
app.put("/api/update-profile", async (req: Request, res: Response): Promise<void> => {
  try {
    // Expecting the request body to include:
    // id, name, email, and optionally currentPassword and newPassword
    const { id, name, email, currentPassword, newPassword } = req.body;
    if (!id) {
      void res.status(400).json({ message: "User ID is required" });
      return;
    }

    // Find the user by id
    const foundUsers = await db
      .select()
      .from(users)
      .where(eq(users.id, id));
    if (foundUsers.length === 0) {
      void res.status(404).json({ message: "User not found" });
      return;
    }
    const user = foundUsers[0];

    // Initialize the password to remain unchanged
    let updatedPassword = user.password;

    // If a new password is provided, then currentPassword must be provided and valid
    if (newPassword) {
      if (!currentPassword) {
        void res.status(400).json({ message: "Current password is required to change password" });
        return;
      }
      const passwordMatch = await bcrypt.compare(currentPassword, user.password);
      if (!passwordMatch) {
        void res.status(401).json({ message: "Current password is incorrect" });
        return;
      }
      // Hash the new password
      updatedPassword = await bcrypt.hash(newPassword, 10);
    }

    // Update the user's details
    const [updatedUser] = await db
      .update(users)
      .set({
        name,
        email,
        password: updatedPassword,
      })
      .where(eq(users.id, id))
      .returning();

    void res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    return;
  } catch (error) {
    console.error("Update profile error:", error);
    void res.status(500).json({ message: "Internal server error" });
    return;
  }
});

// Logout endpoint
app.post("/api/logout", (req: Request, res: Response): void => {
  // Clear the cookie named "token" (adjust the cookie name if needed)
  res.clearCookie("token", { httpOnly: true });
  void res.status(200).json({ message: "Logged out successfully" });
});

// Test endpoint to verify the API is running
app.get("/api", (req: Request, res: Response): void => {
  void res.json({ message: "E-commerce API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
