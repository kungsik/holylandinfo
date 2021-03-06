const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

app.use(cors())

require('./passport')
require('./models')
require('./routes')(app)

app.listen(config.port)
