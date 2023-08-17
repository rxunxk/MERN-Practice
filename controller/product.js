const model = require("../model/product");
const Product = model.Product;
const ejs = require("ejs");
const path = require("path");

//view SSR -> Server side rendered
const getAllProductsSSR = async (req, res) => {
  try {
    await Product.find().then((response) => {
      ejs.renderFile(
        path.resolve(__dirname, "../pages/index.ejs"),
        {
          products: response,
        },
        function (err, str) {
          res.status(200).send(str);
        }
      );
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
//CREATE - POST
const createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save().then((response) => {
      res.status(201).json(response);
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

//READ - GET
const getAllProducts = async (req, res) => {
  try {
    await Product.find().then((response) => {
      res.status(200).json(response);
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

//READ - specific id - GET
const getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findById(id).then((response) =>
      res.status(200).json(response)
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

//UPDATE - Replace older object - PUT
const replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findOneAndReplace({ _id: id }, req.body, { new: true }).then(
      (response) => res.status(200).json(response)
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

//UPDATE - PATCH
const updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findOneAndUpdate({ _id: id }, req.body, { new: true }).then(
      (response) => res.status(200).json(response)
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

//DELETE - delete
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findOneAndDelete({ _id: id }, { new: true }).then(
      (response) => res.status(200).json(response)
    );
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createProduct = createProduct;
exports.getAllProducts = getAllProducts;
exports.getProduct = getProduct;
exports.replaceProduct = replaceProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.getAllProductsSSR = getAllProductsSSR;
