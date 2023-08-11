const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

const data = JSON.parse(fs.readFileSync("data.json"));
const products = data.products;

const server = express();

server.use(express.json()); //bodyParser
server.use(morgan("default"));
server.use(express.static("public"));

//#region
//a Baisc middle ware that creates a log of users
server.use((req, res, next) => {
  console.log(
    req.method,
    req.ip,
    req.hostname,
    new Date(),
    req.get("User-Agent")
  );
  next(); //this function passes the cursor to the endpoint.
});

const auth = (req, res, next) => {
  if (req.body.password === "123") {
    res.send({ type: "success" });
  } else {
    res.sendStatus(401);
  }
};

//server.use(auth); //auth on server
//#endregion

//API - End Points
//READ endpoint
//anything before endpoint is called the baseurl in our case it is localhost:8080

//CREATE
server.post("/products", (req, res) => {
  products.push(req.body);
  res.send(req.body);
});

//READ get /products
server.get("/products", (req, res) => {
  res.json(products);
});

//":id" is a way of telling node that this value will be sent via the URL &
//that it is a variable

//READ
server.get("/products/:id", (req, res) => {
  const id = +req.params.id;
  const product = products.find((p) => p.id === id);
  res.json(product);
});

//UPDATE -> PUT will always overwrite. older value will be replaced with newer value.
server.put("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.status(201).json();
});

//PATCH
server.patch("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1, { ...products[productIndex], ...req.body });
  res.status(201).json({ status: "updated successfully" });
});

//DELETE
server.delete("/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1);
  res.status(200).json({ status: "product deleted successfully" });
});

server.listen(8080, (req, res) => {
  console.log("server started!");
});
