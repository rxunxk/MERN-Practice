const express = require("express");
const morgan = require("morgan");
const server = express();
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");

server.use(express.json()); //bodyParser
server.use(morgan("default"));
server.use(express.static("public"));
server.use("/products", productRouter.routes); // now the base url has been changed to /api and all the endpoints are going to work with api/xyz
server.use("/users", userRouter.routes);

server.listen(8080, (req, res) => {
  console.log("server started!");
});
