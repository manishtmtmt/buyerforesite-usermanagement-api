import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import userRoutes from "./routes/userRoutes.js";

// Initialize SQLite3 database
import { dbReady } from "./db/db.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ message: "Welcome to the User Management API" });
});

dbReady
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
