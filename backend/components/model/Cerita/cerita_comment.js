// models/Comments.js
const Sequelize = require("sequelize");
const sequelize = require("../../../config/config.db");
const Cerita = require("./cerita");
const Users = require("../user");

const Comments = sequelize.define("Cerita_Comments", {
  Comment_Content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

Comments.belongsTo(Cerita, { foreignKey: "Comment_Cerita" });
Comments.belongsTo(Users, { foreignKey: "Comment_User" });
module.exports = Comments;
