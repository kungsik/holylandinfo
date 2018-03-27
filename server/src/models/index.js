const config = require('../config/config')
const mongoose = require('mongoose')
const fs = require('fs')

//Set up default mongoose connection
var mongoDB = config.db.database
mongoose.connect(mongoDB)
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise
//Get the default connection
var db = mongoose.connection
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))