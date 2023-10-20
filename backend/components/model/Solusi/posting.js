// models/Posts.js
const Sequelize = require("sequelize");
const sequelize = require("../../../config/config.db");
const Users = require("../user");

const Posts = sequelize.define("Posts", {
  Post_Content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});
Posts.belongsTo(Users, { foreignKey: "Post_User" });
module.exports = Posts;
