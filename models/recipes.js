const mongoose = require("mongoose");

const recipesSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  directions: [String],
});

const Recipes = mongoose.model("Recipes", recipesSchema);

module.exports = Recipes;
