const express = require("express");
const { getAllPosts } = require("../controller/postController");

const router = express.Router();

router.get("/", getAllPosts);

export default router;
