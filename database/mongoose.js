const mongoose = require('mongoose')
const config = require("config")

module.exports = function () {

  const mongodb = config.get("mongodb")

  const urlConnect = `${mongodb.url}:${mongodb.port}/${mongodb.collection}`

  mongoose.connect(urlConnect ,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  ).catch(err => {
   console.log(err)
    process.exit(1) 
  })

 // CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + urlConnect) 
}) 

mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err) 
}) 

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected') 
}) 

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
      console.log('Mongoose disconnected through ' + msg) 
      callback() 
  }) 
} 

// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
      process.kill(process.pid, 'SIGUSR2') 
  }) 
}) 

// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
      process.exit(0) 
  }) 
}) 

}()

require('../models/User')