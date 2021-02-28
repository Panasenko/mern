const  express = require('express')

const mongoose = require("mongoose")
require("./database/mongoose")

const router = require("./routes/auth.routs.js")

const app = express()


app.use('/api/auth', router)

module.exports = app
