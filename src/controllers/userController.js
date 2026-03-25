import {
  createUser as createUserModel,
  getAllUsers as getAllUsersModel,
} from "../models/userModel.js";
import { validateUserInput } from "../utils/validation.js";

export const createUser = (req, res) => {
  const validation = validateUserInput(req.body);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }
  const { name, email, phone_number, company_name } = req.body;
  
  createUserModel(
    { name, email, phone_number, company_name },
    (err, userId) => {
      if (err) {
        return res.status(500).json({ error: "Failed to create user." });
      }
      res
        .status(201)
        .json({ id: userId, name, email, phone_number, company_name });
    },
  );
};

export const getAllUsers = (req, res) => {
  getAllUsersModel((err, users) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch users." });
    }
    res.status(200).json(users);
  });
};
