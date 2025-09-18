const { Post } = require("../models/post");

export const getAllPosts = (req, res) => {
  try {

    const posts = Post.findAll({
        where: {}
    })
  } catch (err) {
    res.status(500).json({ message: "Faield to list posts" });
  }
};
