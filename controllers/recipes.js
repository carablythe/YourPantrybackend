const express = require("express");
const Recipes = require("../models/recipes.js");
const router = express.Router();

//index
router.get("/", (req, res) => {
  Recipes.find({}, (err, foundRecipes) => {
    res.json(foundRecipes);
  });
});

//create
router.post("/", (req, res) => {
  Recipes.create(req.body, (err, createdRecipes) => {
    res.json(createdRecipes);
  });
});

//delete
router.delete("/:id", (req, res) => {
  Recipes.findByIdAndRemove(req.params.id, (err, deletedRecipe) => {
    res.json(deletedRecipe);
  });
});

//update
router.put("/:id", (req, res) => {
  Recipes.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedRecipe) => {
      res.json(updatedRecipe);
    }
  );
});

module.exports = router;
