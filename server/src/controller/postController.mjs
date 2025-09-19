import Post from "../models/post.mjs";
import User from "../models/user.mjs";
import Vote from "../models/vote.mjs";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { is_deleted: false },
      order: [["createdAt", "DESC"]],
      include: [
        { model: Vote, required: false },
        { model: User, attributes: ["email", "username"] },
      ],
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Faield to list posts" });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.query;

  try {
    const posts = await Post.findByPk(id);

    if (!posts) return res.status(404).json({ message: "Post is not found" });

    return res.json(posts);
  } catch (err) {
    console.error(err);
  }
};

export const createNewPost = async (req, res) => {
  const { title, user_id } = req.body;

  try {
    const newPost = await Post.create({ title, user_id });

    return res.json(newPost);
  } catch (err) {
    console.error(err);
  }
};

export const deletePost = async (req, res) => {};
