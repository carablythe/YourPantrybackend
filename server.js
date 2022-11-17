//___________________
//Dependencies
//___________________

require('dotenv').config()
const express = require('express')
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express()
const path = require ('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require ('./config/dbConn')
const { logEvents } = require('./middleware/logger')
const PORT = process.env.PORT || 3500

console.log(process.env.NODE_ENV) // *learned from Dave Gray's tutorial (see below)

connectDB() // *learned from Dave Gray's tutorial (see below)

app.use(logger) // *learned from Dave Gray's tutorial (see below)

app.use(express.json()) // returns middleware that only parses JSON

app.use(cookieParser()) // *learned from Dave Gray's tutorial (see below)

app.use(cors(corsOptions))

app.use('/', express.static(path.join(__dirname, 'public'))) // populates req.body with parsed info from forms - if no data from forms will return an empty object {}

app.get("/", (req,res) => {
    res.send("hello")
  })
  
//___________________
// Routes
//___________________
//localhost:3000
const recipeController = require ('./controllers/yourpantry.js');
app.use('/yourpantry', recipeController)

//___________________

app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


app.use(errorHandler) // *learned from Dave Gray's tutorial (see below)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 
    'mongoErrLog.log') 
})  // *learned from Dave Gray's tutorial (see below)


//The above code with * was learned from the MERN stack project tutorial by Dave Gray:
//https://www.youtube.com/watch?v=CvCiNeLnZ00&list=PL0Zuz27SZ-6P4dQUsoDatjEGpmBpcOW8V&index=14