const fs = require("fs");
const path = require("path");
const model = require("../model/user");
const User = model.User;
const jwt = require("jsonwebtoken");

const data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../data.json"))
);
const users = data.users;

//POST - Create a new user
const createUser = async (req, res) => {
  const user = new User(req.body);
  user.token = jwt.sign({ password: req.body.password }, process.env.SECRET);
  try {
    await user.save().then((response) => {
      res.status(201).json(response);
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const getAllUsers = (req, res) => {
  res.json(users);
};

const getUser = (req, res) => {
  const id = +req.params.id;
  const product = users.find((p) => p.id === id);
  res.json(product);
};

const replaceUser = (req, res) => {
  const id = +req.params.id;
  const productIndex = users.findIndex((p) => p.id === id);
  users.splice(productIndex, 1, { ...req.body, id: id });
  res.status(201).json();
};

const updateUser = (req, res) => {
  const id = +req.params.id;
  const productIndex = users.findIndex((p) => p.id === id);
  users.splice(productIndex, 1, { ...users[productIndex], ...req.body });
  res.status(201).json({ status: "updated successfully" });
};

const deleteUser = (req, res) => {
  const id = +req.params.id;
  const productIndex = users.findIndex((p) => p.id === id);
  users.splice(productIndex, 1);
  res.status(200).json({ status: "product deleted successfully" });
};

exports.createUser = createUser;
exports.getAllUsers = getAllUsers;
exports.getUser = getUser;
exports.replaceUser = replaceUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
