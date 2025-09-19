import express from "express";
import {
  createUser,
  getAllusers,
  patchDeleteUser,
} from "../controller/userController.mjs";

const router = express.Router();

router.get("/", getAllusers);
router.post("/create", createUser);
router.patch("/:id", patchDeleteUser);

export default router;
