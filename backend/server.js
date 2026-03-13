import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/authRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import sipRoutes from "./routes/sipRoutes.js";
import rentRoutes from "./routes/rentRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get("/api", (req, res) => res.send("PayNest API is running"));
app.use("/api/auth", authRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/sip", sipRoutes);
app.use("/api/rent", rentRoutes);
app.use("/api/expense", expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
