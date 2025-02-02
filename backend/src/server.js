import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// DATABASE_URL: "postgresql://postgres:ByQUgeHFMEvSXzrUzLbBcIKCVybhjZEn@viaduct.proxy.rlwy.net:52739/railway"

import taskRoutes from "./routes/tasks.js";
import stepRoutes from "./routes/steps.js";
import userRoutes from "./modules/users/users.route.js";
import authRoutes from "./modules/auth/auth.route.js";
import tagRoutes from "./modules/tags/tags.route.js";
import articleRoutes from "./modules/articles/articles.route.js";
import commentRoutes from "./modules/comments/comments.route.js";

const app = express();
const port = 3000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/steps", stepRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/comments", commentRoutes);
// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Task Manager API" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
