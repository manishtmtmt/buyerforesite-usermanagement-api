import {
  createUser as createUserModel,
  deleteUserById,
  getAllUsers as getAllUsersModel,
  getUserById,
  updateUserById,
} from "../models/userModel.js";
import {
  validateUserInput,
  validateUserParam,
  validateUserUpdateInput,
} from "../utils/validation.js";

export const createUser = (req, res) => {
  const validation = validateUserInput(req.body);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  createUserModel(req.body, (err, userId) => {
    if (err) {
      return res.status(500).json({ error: "Failed to create user." });
    }
    const { name, email, phone_number, company_name } = req.body;
    res
      .status(201)
      .json({ id: userId, name, email, phone_number, company_name });
  });
};

export const getAllUsers = (req, res) => {
  getAllUsersModel((err, users) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch users." });
    }
    res.status(200).json(users);
  });
};

export const getUser = (req, res) => {
  const validation = validateUserParam(req.params);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  getUserById(validation.id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch user." });
    }
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(user);
  });
};

export const deleteUser = (req, res) => {
  const validation = validateUserParam(req.params);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  deleteUserById(validation.id, (err, changes) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete user." });
    }
    if (changes === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully." });
  });
};

export const updateUser = (req, res) => {
  const paramValidation = validateUserParam(req.params);

  if (!paramValidation.valid) {
    return res.status(400).json({ error: paramValidation.error });
  }

  const bodyValidation = validateUserUpdateInput(req.body);

  if (!bodyValidation.valid) {
    return res.status(400).json({ error: bodyValidation.error });
  }

  updateUserById(paramValidation.id, req.body, (err, changes) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ error: "Failed to update user." });
    }
    if (changes === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ message: "User updated successfully." });
  });
};
