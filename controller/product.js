const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json"));
const products = data.products;

const createProduct = (req, res) => {
  products.push(req.body);
  res.send(req.body);
};

const getAllProducts = (req, res) => {
  res.json(products);
};

const getProduct = (req, res) => {
  const id = +req.params.id;
  const product = products.find((p) => p.id === id);
  res.json(product);
};

const replaceProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.status(201).json();
};

const updateProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1, { ...products[productIndex], ...req.body });
  res.status(201).json({ status: "updated successfully" });
};

const deleteProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1);
  res.status(200).json({ status: "product deleted successfully" });
};

exports.createProduct = createProduct;
exports.getAllProducts = getAllProducts;
exports.getProduct = getProduct;
exports.replaceProduct = replaceProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
