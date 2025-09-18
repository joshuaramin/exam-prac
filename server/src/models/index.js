const { sequelize } = require("../config/database");

const Post = require("./post");
const User = require("./user");

module.export = {
  sequelize,
  Post,
  User,
};
