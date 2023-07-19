const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tutorialSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  tutor: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  user_id: {
    type: String,
    required: true
  }

}, { timestamps: true })

module.exports = mongoose.model('Tutorial', tutorialSchema)