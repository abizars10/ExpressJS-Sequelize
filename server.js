const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

const db = require("./app/models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// import controller
const bookController = require("./app/controllers/book.controller.js");

// create book router
app.post("/", (req, res) => {
  console.log(">> create book api");
  bookController.create(req, res);
});

// find all books router
app.get("/", (req, res) => {
  bookController.findAll(req, res);
});

// find book by id router
app.get("/:id", (req, res) => {
  bookController.findOne(req, res);
});

// delete book with an id router
app.delete("/:id", (req, res) => {
  bookController.delete(req, res);
});

// update book with an id router
app.put("/:id", (req, res) => {
  bookController.update(req, res);
});

// patch book with an id router
app.patch("/:id", (req, res) => {
  bookController.patch(req, res);
});

// set port, listen for request
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
