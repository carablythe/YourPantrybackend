const express = require("express");
const methodOverride = require("method-override");
const { mongoose } = require("mongoose");
const cors = require("cors");
const db = mongoose.connection;
const app = express();
require("dotenv").config();

//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const PROJECT3_DB = process.env.PROJECT3_DB;

// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", PROJECT3_DB));
db.on("disconnected", () => console.log("mongo disconnected"));

//middle
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(methodOverride("_method")); // allow POST, PUT and DELETE from a form

const recipesController = require("./controllers/recipes.js");
app.use("/recipes", recipesController);

//listeners
app.listen(3000, () => {
  console.log("listening for recipes..");
});

// Connect to Mongo
mongoose.connect(PROJECT3_DB, { useNewUrlParser: true });

// Error / success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", PROJECT3_DB));
db.on("disconnected", () => console.log("mongo disconnected"));
