const User = require("../model/user"); // Update the path as needed

// CREATE - Create a new user
async function createUser(req, res) {
  try {
    const { User_username, User_email, User_password } = req.body;
    const newUser = await User.create({
      User_username,
      User_email,
      User_password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
}

// READ - Get all users
async function getUsers(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching users" });
  }
}

// READ - Get a user by ID
async function getUserById(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching user" });
  }
}

// UPDATE - Update a user by ID
async function updateUserById(req, res) {
  try {
    const { User_username, User_email, User_password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.User_username = User_username;
    user.User_email = User_email;
    user.User_password = User_password;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating user" });
  }
}

// DELETE - Delete a user by ID
async function deleteUserById(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting user" });
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
