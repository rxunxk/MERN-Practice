const express = require("express");
const productController = require("../controller/product"); //importing our controller
const router = express.Router(); //getting router

router
  .post("/", productController.createProduct)
  .get("/ssr", productController.getAllProductsSSR)
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getProduct)
  .put("/:id", productController.replaceProduct)
  .patch("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

exports.routes = router;
