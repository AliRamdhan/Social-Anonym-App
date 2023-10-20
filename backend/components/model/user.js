const Sequelize = require("sequelize");
const sequelize = require("../../config/config.db");
const Role = require("./role");
const User = sequelize.define("users", {
  User_username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  User_email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  User_password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.belongsTo(Role, { foreignKey: "User_role" });

module.exports = User;
