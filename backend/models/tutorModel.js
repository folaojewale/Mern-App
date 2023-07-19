const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tutorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  qualifications: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Tutor', tutorSchema)