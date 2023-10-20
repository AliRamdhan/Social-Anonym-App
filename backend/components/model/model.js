const Role = require("./role");
const Users = require("./user");
const Profiles = require("./user_profile");
const Solutions_Likes = require("./Solusi/posting_likes");
const Solutions_Comments = require("./Solusi/posting_comment");
const Solutions_Replies = require("./Solusi/posting_comment_replies");
const Solutions_Posts = require("./Solusi/posting");
const Cerita_Likes = require("./Cerita/cerita_likes");
const Cerita_Comments = require("./Cerita/cerita_comment");
const Cerita = require("./Cerita/cerita");
const Artikel = require("./artikel");
const sequelize = require("../../config/config.db");
const Genre = require("./Cerita/cerite_genre");

// Users.hasOne(Profiles, { as: "profiles" });
// Profiles.belongsTo(Users, { foreignKey: "Profile_User" });

// Users.hasMany(Posts, { as: "posts" });
// Posts.belongsTo(Users, { foreignKey: "Post_User" });

// Posts.hasMany(Comments, { as: "comments" });
// Comments.belongsTo(Posts, { foreignKey: "Comment_Post" });

// Users.hasMany(Comments, { as: "comments" });
// Comments.belongsTo(Users, { foreignKey: "Comment_User" });

// Comments.hasMany(Replies, { as: "replies" });
// Replies.belongsTo(Comments, { foreignKey: "Replies_Comments" });

// Posts.hasMany(Likes, { as: "likes" });
// Likes.belongsTo(Posts, { foreignKey: "Post_Likes" });

// Users.hasMany(Artikel, { as: "artikels" });
// Artikel.belongsTo(Users, { foreignKey: "Artikel_User" });

async function createRoles(roleDataArray) {
  try {
    const createdRoles = await Role.bulkCreate(roleDataArray);
    console.log(`Roles created: ${createdRoles.length} roles`);
    return createdRoles;
  } catch (error) {
    console.error("Error creating roles:", error.message);
    throw error; // You might want to handle the error differently in your application
  }
}
async function createGenre(genreDataArray) {
  try {
    const createdGenre = await Genre.bulkCreate(genreDataArray);
    console.log(`Genre created: ${createdGenre.length} Genre`);
    return createdGenre;
  } catch (error) {
    console.error("Error creating Genre:", error.message);
    throw error; // You might want to handle the error differently in your application
  }
}

// Example usage:
const newRoleDataArray = [{ Role_name: "Admin" }, { Role_name: "User" }];
const newGenreDataArray = [
  { Genre_Cerita: "Horor" },
  { Genre_Cerita: "Romantis" },
  { Genre_Cerita: "Petualangan" },
  { Genre_Cerita: "Sejarah" },
];

// createRoles(newRoleDataArray)
//   .then((createdRoles) => {
//     // Handle success
//     console.log("Roles created successfully:", createdRoles);
//   })
//   .catch((error) => {
//     // Handle error
//     console.error("Failed to create roles:", error);
//   });

// createGenre(newGenreDataArray)
//   .then((createdGenre) => {
//     // Handle success
//     console.log("Genre created successfully:", createdGenre);
//   })
//   .catch((error) => {
//     // Handle error
//     console.error("Failed to create Genre:", error);
//   });


async function addTable() {
  try {
    await sequelize.sync({ force: true });
    console.log("Table created successfully!");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    sequelize.close();
  }
}

async function dropTable() {
  try {
    await Artikel.drop({ cascade: true });
    await Profiles.drop({ cascade: true });
    await Solutions_Likes.drop({ cascade: true });
    await Solutions_Replies.drop({ cascade: true });
    await Solutions_Comments.drop({ cascade: true });
    await Solutions_Posts.drop({ cascade: true });
    await Cerita_Likes.drop({ cascade: true });
    await Cerita_Comments.drop({ cascade: true });
    await Cerita_Replies.drop({ cascade: true });
    await Cerita.drop({ cascade: true });
    await Users.drop({ cascade: true });
    await Role.drop({ cascade: true });
    console.log("All tables dropped!");
  } catch (error) {
    console.error("Error creating table:", error);
  } finally {
    sequelize.close();
  }
}
module.exports = { addTable, dropTable };
