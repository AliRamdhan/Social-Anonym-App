// models/Posts.js
const Sequelize = require("sequelize");
const sequelize = require("../../../config/config.db");

const Genre = sequelize.define("Genre", {
  Genre_Cerita: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});
module.exports = Genre;
