import { sequelize } from "../config/database.mjs";

import Post from "./post.mjs";
import User from "./user.mjs";
import Vote from "./vote.mjs";

Post.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Post, { foreignKey: "user_id" });

User.hasMany(Vote, { foreignKey: "user_id" });
Vote.belongsTo(User, { foreignKey: "user-id" });

Post.hasMany(Vote, { foreignKey: "post_id" });
Vote.belongsTo(Post, { foreignKey: "post_id" });

export { Post, User, sequelize, Vote };
