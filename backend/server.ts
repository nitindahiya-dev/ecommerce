import express, { Request, Response } from "express";
import dotenv from "dotenv";
import nodemailer from 'nodemailer';
import cors from 'cors';
import { initDb, db } from "./src/db";
import { users } from "./src/schema";
import { eq } from "drizzle-orm/expressions";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendResetEmail } from "./src/mailer";
import { RequestHandler } from "express";


dotenv.config();

const app = express();

// Initialize database (using drizzle with pg Pool)
initDb();

// Configure CORS with a dynamic origin function
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL_PROD,
    process.env.FRONTEND_URL_DEV
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

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

// Add this before the test endpoint
app.delete("/api/delete-account", async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, password } = req.body;

    // Validate input
    if (!userId || !password) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    // Convert userId to a number if needed
    const numericUserId = Number(userId);

    // Verify user exists
    const [user] = await db.select().from(users).where(eq(users.id, numericUserId));
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Verify password
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    // Delete user
    await db.delete(users).where(eq(users.id, numericUserId));

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ message: "Error deleting account" });
  }
});

app.post(
  "/api/forgot-password",
  (async (req: Request, res: Response): Promise<void> => {
    try {
      const { email } = req.body;
      // Find the user
      const [user] = await db.select().from(users).where(eq(users.email, email));
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      // Generate a reset token (you can include additional info as needed)
      const resetToken = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

      // Store the token in the database (make sure your schema has a column for it)
      // If you haven’t already added the column, you need to alter your table:
      //   ALTER TABLE users ADD COLUMN reset_token TEXT;
      await db.update(users)
        .set({ resetToken }) // Note: If your column name is different (e.g. `reset_token`), adjust accordingly.
        .where(eq(users.id, user.id));

      // Send the reset email
      await sendResetEmail(email, resetToken);

      res.status(200).json({ message: "Reset instructions sent" });
    } catch (error) {
      console.error("Password reset error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }) as RequestHandler
);


app.post("/api/reset-password", async (req: Request, res: Response) => {
  try {
    const { token, email, newPassword } = req.body;
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    if (decoded.email !== email) {
      res.status(400).json({ message: "Invalid token" });
      return;
    }
    const foundUsers = await db.select().from(users).where(eq(users.email, email));
    if (foundUsers.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const user = foundUsers[0];
    if (user.resetToken !== token) {
      res.status(400).json({ message: "Invalid token" });
      return;
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.update(users)
      .set({ password: hashedPassword, resetToken: null })
      .where(eq(users.id, user.id));
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
});



// Test endpoint
app.get("/api", (req: Request, res: Response): void => {
  res.json({ message: "E-commerce API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
