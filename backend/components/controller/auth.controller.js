const User = require("../model/user");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authRegister = async (req, res) => {
  const { User_username, User_email, User_password, User_role } = req.body;
  const schema = Joi.object({
    User_username: Joi.string().required(),
    User_email: Joi.string().email().required(),
    User_password: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    User_role: Joi.number().integer().min(1),
  });
  const role = User_role || 2;
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const emailExist = await User.findOne({
      where: { User_email: User_email },
    });
    if (emailExist) {
      res.status(400).json({ message: "Email was registered" });
    }

    const saltPassword = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(User_password, saltPassword);
    const user = await User.create({
      User_username: User_username,
      User_email: User_email,
      User_password: password,
      User_role: role,
    });
    res
      .status(200)
      .json({ message: "Account was successfully registered", User: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const authLogin = async (req, res) => {
  const { User_email, User_password } = req.body;
  const schema = Joi.object({
    User_email: Joi.string().email().required(),
    User_password: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await User.findOne({ where: { User_email: User_email } });
    if (!user) {
      res.status(400).json({ message: "email invalid or not register yet" });
    }
    const password = await bcrypt.compare(User_password, user.User_password);
    if (!password) {
      res.status(400).json({ message: "password invalid or not register yet" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "8h", // Adjust the expiration time as needed
    });

    res.cookie("secret_key", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res
      .status(200)
      .json({ message: "Logis succesfull", token: token, User: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const authHome = async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      if (user.User_role === 1) {
        res.status(200).json({ message: "Admin Home Page", User: user });
      } else if (user.User_role === 2) {
        res.status(200).json({ message: "User Home Page", User: user });
      }
    } else {
      res.status(404).send({ error: "No users found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  authHome,
  authLogin,
  authRegister,
};
