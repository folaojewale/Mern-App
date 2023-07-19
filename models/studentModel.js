const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  parentNumber: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Student', studentSchema)