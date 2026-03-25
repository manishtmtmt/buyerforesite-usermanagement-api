import sqlite3Pkg from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const sqlite3 = sqlite3Pkg.verbose();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file path
const dbPath = path.resolve(__dirname, "../../user-management.db");

// Open or create the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the user-management SQLite database.");
  }
});

// Create user table if it doesn't exist, fail fast on error
export const dbReady = new Promise((resolve, reject) => {
  const query = `
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone_number TEXT NOT NULL,
      company_name TEXT NOT NULL
    )
  `;
  db.run(query, (err) => {
    if (err) {
      console.error("Error creating user table:", err.message);
      // Fail fast: exit process if table creation fails
      reject(err);
    } else {
      console.log("User table ensured.");
      resolve();
    }
  });
});

export default db;
