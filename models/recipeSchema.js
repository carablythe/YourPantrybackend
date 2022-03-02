const mongoose = require ('mongoose');

const recipeSchema = new mongoose.Schema({
  dish: String,
  ingredients: String,
  directions: String,
  picture: String,
})

//hello
const Recipe = mongoose.model ('Recipes', recipeSchema);


module.exports = Recipe;
