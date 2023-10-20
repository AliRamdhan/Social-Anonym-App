const Sequelize = require("sequelize");
const sequelize = require("../../../config/config.db");
const Users = require("../user");
const Cerita = require("./cerita");
const Likes = sequelize.define("Cerita_Likes", {
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

Likes.belongsTo(Cerita, { foreignKey: "Likes_Cerita" });
Likes.belongsTo(Users, { foreignKey: "Likes_Users" });

module.exports = Likes;
