const mongoose = require ('mongoose');

const recipeSchema = new mongoose.Schema({
  dish: {type: String, required:true},
  ingredients: {type: String, required:true},
  directions: String,
  recipeURL: String,
  picture: String,
})

module.exports = mongoose.model ('Recipes', recipeSchema);
