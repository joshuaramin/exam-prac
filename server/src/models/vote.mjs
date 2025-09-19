import { DataTypes } from "sequelize";
import { sequelize } from "./index.mjs";

const Vote = sequelize.define(
  "Vote",
  {
    vote_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vote_type: {
      type: DataTypes.ENUM("upvote", "downvote"),
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      is_deleted: false,
    },
  },
  {
    tableName: "votes",
    timestamps: true,
    underscored: true,
  }
);

export default Vote;
