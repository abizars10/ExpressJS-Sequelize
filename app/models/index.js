const Sequelize = require("sequelize");
const sequelize = new Sequelize("biodata_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const db = {};
db.Sequelize = Sequelize; // Property dependency
db.sequelize = sequelize; // Property connection

db.book = require("./book.model.js")(sequelize, Sequelize); // Property model

module.exports = db;
