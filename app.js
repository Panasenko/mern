import express from "express"
import config from "config"
import mongoose from "mongoose"

const app = express()
const PORT = config.get('port') || 5000

async function start(){
  try {

  } catch(e) {
    console.log
  }
}

start()
 
app.listen(PORT, () =>
  console.log(`Example app liktening on port ${PORT}!`)
)
