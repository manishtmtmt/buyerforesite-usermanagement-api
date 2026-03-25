import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ message: "Welcome to the User Management API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
