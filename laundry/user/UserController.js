// const UserService = require("./UserService");
const UserServiceCreateJWT = require("../user/services/UserServiceCreateJWT");
const UserServiceRegister = require("../user/services/UserServiceRegister");

const UserController = require("express").Router();

// const service = UserService();

UserController.post("/login", async (req, res) => {
  const token = await UserServiceCreateJWT(req.body.email);
  return res.status(200).json(token);
});

UserController.post("/register", async (req, res) => {
  const user = await UserServiceRegister(
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.password
  );

  return res.status(200).json(user);
});

module.exports = UserController;
