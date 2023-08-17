require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const server = express();
const productRouter = require("./routes/product");
const userRouter = require("./routes/userRouter");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");

//db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("database connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//middlewares
server.use((req, res) => {
  const decoded = jwt.verify(token, process.env.SECRET);
  console.log(decoded);
});
server.use(cors()); //to allow cross-orgin requests
server.use(express.json()); //bodyParser
server.use(morgan("default"));
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/products", productRouter.routes); // now the base url has been changed to /api and all the endpoints are going to work with api/xyz
server.use("/users", userRouter.routes);
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

//server start
server.listen(process.env.PORT, (req, res) => {
  console.log("server started!");
});
