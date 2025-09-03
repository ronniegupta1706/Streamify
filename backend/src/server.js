import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// First connect to DB, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to start server:", err.message);
  process.exit(1);
});
