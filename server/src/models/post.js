import { DataTypes } from "sequelize";
import { getSequelize } from "../config/database";
import { User } from "./user";

const sequelize = getSequelize();

export const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "posts",
    timestamps: true,
    underscored: true,
    createdAt: true,
    updatedAt: "updateTimestamp",
  }
);

Post.hasOne(User);
