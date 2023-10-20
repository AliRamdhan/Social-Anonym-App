// models/Artikel.js

const Sequelize = require("sequelize");
const sequelize = require("../../config/config.db");
const Users = require("./user");

const Artikel = sequelize.define("Artikel", {
  Artikel_Title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Artikel_Content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  Artikel_Picture: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

// Users.hasMany(Artikel, { as: "artikels" });
Artikel.belongsTo(Users, { foreignKey: "Artikel_User" });
module.exports = Artikel;
