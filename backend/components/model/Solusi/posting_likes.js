const Sequelize = require("sequelize");
const sequelize = require("../../../config/config.db");
const Users = require("../user");
const Posts = require("./posting");
const Likes = sequelize.define("Post_Likes", {
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

Likes.belongsTo(Posts, { foreignKey: "Likes_Posts" });
Likes.belongsTo(Users, { foreignKey: "Likes_Users" });

module.exports = Likes;
