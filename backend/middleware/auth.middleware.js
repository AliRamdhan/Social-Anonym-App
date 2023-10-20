const User = require("../components/model/user"); // Import your User model

// Middleware to check if a user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id); // Assuming you store user ID in req.user.id
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.User_role === 1) {
      // Assuming 'admin' is the role name for admin users
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You do not have admin privileges" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Middleware to check if a user is a regular user
const isUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id); // Assuming you store user ID in req.user.id
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.User_role === 2) {
      // Assuming 'user' is the role name for regular users
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You do not have user privileges" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { isAdmin, isUser };
