require('dotenv').config()

const express = require('express')
const mongoose = require("mongoose")

const studentRoutes = require('./routes/students')
const tutorRoutes = require('./routes/tutors')
const tutorialRoutes = require('./routes/tutorials')
const pasttutorialRoutes = require('./routes/past-tutorials')
const userRoutes = require('./routes/user')

//express app
const app = express()

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })


// middleware
app.use(express.json())

//routes
app.use('/api/students', studentRoutes)
app.use('/api/tutors', tutorRoutes)
app.use('/api/tutorials', tutorialRoutes)
//app.use('/api/past-tutorials', pasttutorialRoutes)
app.use('/api/user', userRoutes)




// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 