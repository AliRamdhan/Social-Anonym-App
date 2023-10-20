const Sequelize = require("sequelize");
const sequelize = require("../../config/config.db");
const User = require("./user");
const Profile = sequelize.define("User_Profile", {
  Profile_firstname: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Profile_lastname: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Profile_bio: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  Profile_picture: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

Profile.belongsTo(User, { foreignKey: "Profile_User" });
module.exports = Profile;
