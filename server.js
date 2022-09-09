const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

const { DB_HOST, PORT } = process.env

mongoose
  .connect(DB_HOST, console.log("Database connection successful"))
  .then(() => app.listen(PORT))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })