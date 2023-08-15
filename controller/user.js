const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json"));
const users = data.users;

const createUser = (req, res) => {
  users.push(req.body);
  res.send(req.body);
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
