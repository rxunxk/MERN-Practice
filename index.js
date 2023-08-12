require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const server = express();
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");

console.log("env: ", process.env.DB_PASSWORD);

server.use(express.json()); //bodyParser
server.use(morgan("default"));
server.use(express.static(process.env.PUBLIC));

server.use("/products", productRouter.routes); // now the base url has been changed to /api and all the endpoints are going to work with api/xyz
server.use("/users", userRouter.routes);

server.listen(process.env.PORT, (req, res) => {
  console.log("server started!");
});
