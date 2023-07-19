const Student = require('../models/studentModel')
const mongoose = require('mongoose')

// get all students
const getStudents = async (req, res) => {
  const user_id = req.user._id

  const student = await Student.find({user_id}).sort({createdAt: -1})

  res.status(200).json(student)
}

// get a single student
const getStudent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such student'})
  }

  const student = await Student.findById(id)

  if (!student) {
    return res.status(404).json({error: 'No such student'})
  }

  res.status(200).json(student)
}

// create a new student
const createStudent = async (req, res) => {
  const {name, school, year, parentNumber} = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!school) {
    emptyFields.push('school')
  }
  if(!year) {
    emptyFields.push('year')
  }
  if(!parentNumber) {
    emptyFields.push('parentNumber')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill the required fields', emptyFields})
  }

  // add to the database
  try {
    const user_id = req.user._id
    const student = await Student.create({ name, school, year, parentNumber, user_id })
    res.status(200).json(student)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a student
const deleteStudent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such student'})
    }
  
    const student = await Student.findOneAndDelete({_id: id})
  
    if(!student) {
      return res.status(400).json({error: 'No such student'})
    }
  
    res.status(200).json(student)
}

// update a student
const updateStudent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such student'})
    }
  
    const student = await Student.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!student) {
      return res.status(400).json({error: 'No such student'})
    }
  
    res.status(200).json(student)
}

module.exports = {
    getStudents,
    getStudent,
    createStudent,
    deleteStudent,
    updateStudent
}