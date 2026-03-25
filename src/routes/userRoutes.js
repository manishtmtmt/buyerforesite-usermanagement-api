import express from "express";
import { createUser, getAllUsers, getUser, deleteUser, updateUser } from "../controllers/userController.js";

const router = express.Router();

// Create user
router.post("/", createUser);

// Get all users
router.get("/", getAllUsers);

// Get user by ID 
router.get("/:id", getUser);

// Delete user by ID
router.delete("/:id", deleteUser);

// Update user by ID
router.put("/:id", updateUser);

export default router;
