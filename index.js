const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const massive = require("massive");

const products_controller = require("./products_controller");

const port = 3000;

const connectionString = "postgres://JamesScott@localhost/postgres";

const usersCtrl = require("./products_controller.js");

const app = express();
app.use(bodyParser.json());

app.use(cors());

const massiveConnection = massive(connectionString)
  .then(db => {
    app.set("db", db);
  })
  .catch(err => {
    console.log(err);
  });

app.post("/api/product", products_controller.create);
app.get("/api/products", products_controller.getAll);
app.get("/api/product/:id", products_controller.getOne);
app.put("/api/product/:id", products_controller.update);
app.delete("/api/product/:id", products_controller.delete);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
