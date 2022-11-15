const mongoose = require ('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI);

const recipeSchema = new mongoose.Schema({
  dish: {type: String, required:true},
  ingredients: {type: String, required:true},
  directions: String,
  recipeURL: String,
  picture: String,
})

const Recipe = mongoose.model ('Recipes', recipeSchema);


module.exports = Recipe;
