const Sequelize = require("sequelize");
const sequelize = new Sequelize("social_anonym_app", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
dbConnect();
module.exports = sequelize;
