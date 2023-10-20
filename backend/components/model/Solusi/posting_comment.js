// models/Comments.js

const Sequelize = require("sequelize");
const sequelize = require("../../../config/config.db");
const Posts = require("./posting");
const Users = require("../user");
const Comments = sequelize.define("Post_Comments", {
  Comment_Content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});
Comments.belongsTo(Posts, { foreignKey: "Comment_Post" });
Comments.belongsTo(Users, { foreignKey: "Comment_User" });
module.exports = Comments;
