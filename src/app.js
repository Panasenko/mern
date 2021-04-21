const  express = require('express')
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
require("./database/mongoose")

const router = require("./routes/auth.routs.js")

const app = express()

app.use(bodyParser.json());

app.use('/api/auth', router)

module.exports = app
