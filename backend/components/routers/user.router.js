const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controller/user.controller"); // Update the path as needed

// Routes for User CRUD operations
router.get("/users", getUsers);
router.post("/users/create", createUser);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
