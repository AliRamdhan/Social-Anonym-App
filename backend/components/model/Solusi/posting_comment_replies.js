// models/ReplyComments.js

const Sequelize = require("sequelize");
const sequelize = require("../../../config/config.db");
const Users = require("../user");
const Comments = require("./posting_comment");
const Replies = sequelize.define("Post_ReplyComments", {
  Reply_Content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

Replies.belongsTo(Comments, { foreignKey: "Replies_Comments" });
Replies.belongsTo(Users, { foreignKey: "Replies_Users" });
module.exports = Replies;
