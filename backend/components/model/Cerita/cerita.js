// models/Posts.js
const Sequelize = require("sequelize");
const sequelize = require("../../../config/config.db");
const Users = require("../user");
const Genre = require("./cerite_genre");
const Cerita = sequelize.define("Cerita", {
  Cerita_Content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

Cerita.belongsTo(Users, { foreignKey: "Cerita_User" });
Cerita.belongsTo(Genre, { foreignKey: "Cerita_Genre" });
module.exports = Cerita;
