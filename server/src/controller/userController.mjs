import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { Post, User } from "../models/index.mjs";

export const getAllusers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { is_deleted: false },
      include: [{ model: Post, where: { is_deleted: false }, required: false }],
    });

    res.json(users);
  } catch (err) {
    console.error(err);
  }
};

export const createUser = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({
      message: "Email, username, and password are required",
    });
  }

  const orConditions = [];
  if (email) orConditions.push({ email });
  if (username) orConditions.push({ username });

  const existingUser = await User.findOne({
    where: {
      [Op.or]: orConditions,
    },
  });

  if (existingUser) {
    return res.status(400).json({
      message: "Email or username already in use",
    });
  }

  const pass = await bcrypt.hash(password, 12);

  try {
    const newUser = await User.create({
      email,
      username,
      password: pass,
    });

    return res.json(newUser);
  } catch (err) {
    console.error(err);
  }
};

export const patchDeleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const [updatedRows] = await User.update(
      { is_deleted: true },
      { where: { user_id: id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: `User ${id} marked as deleted` });
  } catch (err) {
    console.error("❌ Error updating user:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
