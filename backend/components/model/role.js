const Sequelize = require("sequelize");
const sequelize = require("../../config/config.db");

const Role = sequelize.define("roles", {
  Role_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Role;
