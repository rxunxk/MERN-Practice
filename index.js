require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const server = express();
const productRouter = require("./routes/product");
const userRouter = require("./routes/userRouter");
const mongoose = require("mongoose");

//db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("database connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

server.use(express.json()); //bodyParser
server.use(morgan("default"));
server.use(express.static(process.env.PUBLIC));

server.use("/products", productRouter.routes); // now the base url has been changed to /api and all the endpoints are going to work with api/xyz
server.use("/users", userRouter.routes);

server.listen(process.env.PORT, (req, res) => {
  console.log("server started!");
});
