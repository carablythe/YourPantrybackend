const express = require ('express');
const router = express.Router();
const YourPantry = require('../models/recipeSchema.js')

router.get('/', (req, res) => {
  YourPantry.find({}, (err, foundRecipe)  => {
    res.json(foundRecipe)
  })
})

router.delete('/:id', (req, res) => {
  YourPantry.findByIdAndRemove(req.params.id, (err, deletedRecipe) => {
    res.json(deletedRecipe);
  })
})

router.put('/:id', (req, res) => {
  YourPantry.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedRecipe) => {
    res.json(updatedRecipe)
  })
})

router.post('/', (req, res) => {
  YourPantry.create(req.body, (err, createdRecipe) => {
    res.json(createdRecipe);
  })
})


module.exports = router;
