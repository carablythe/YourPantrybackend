//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const cors = require('cors')
const app = express ();
const db = mongoose.connection;
require('dotenv').config();

NODE_ENV=production npm start;

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI  = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true}
);


// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}

app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

app.get("/", (req,res) => {
  res.send("hello")
})

app.use(cors())

mongoose.connection.once('open', () => {
  console.log('connected to mongod...');
});
//___________________
// Routes
//___________________
//localhost:3000
const recipeController = require ('./controllers/yourpantry.js');
app.use('/yourpantry', recipeController)
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));