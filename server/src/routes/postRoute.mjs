import express from "express";
import {
  createNewPost,
  getAllPosts,
  getPostById,
} from "../controller/postController.mjs";
import { authenticateUser } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/create", authenticateUser, createNewPost);

export default router;
