const Tutor = require('../models/tutorModel')
const mongoose = require('mongoose')

// get all students
const getTutors = async (req, res) => {
  const user_id = req.user._id

  const tutor = await Tutor.find({user_id}).sort({createdAt: -1})

  res.status(200).json(tutor)
}

// get a single tutor
const getTutor = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such tutor'})
  }

  const tutor = await Tutor.findById(id)

  if (!tutor) {
    return res.status(404).json({error: 'No such tutor'})
  }

  res.status(200).json(tutor)
}

// create a new tutor
const createTutor = async (req, res) => {
  const {name, contact, email, qualifications} = req.body

  let emptyFields = []

  if(!name) {
    emptyFields.push('name')
  }
  if(!contact) {
    emptyFields.push('contact')
  }
  if(!email) {
    emptyFields.push('email')
  }
  if(!qualifications) {
    emptyFields.push('qualifications')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill the required fields', emptyFields})
  }
  


  // add to the database
  try {
    const user_id = req.user._id
    const tutor = await Tutor.create({name, contact, email, qualifications, user_id})
    res.status(200).json(tutor)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a tutor
const deleteTutor = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such tutor'})
    }
  
    const tutor = await Tutor.findOneAndDelete({_id: id})
  
    if(!tutor) {
      return res.status(400).json({error: 'No such tutor'})
    }
  
    res.status(200).json(tutor)
}

// update a tutor
const updateTutor = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such tutor'})
    }
  
    const tutor = await Tutor.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!tutor) {
      return res.status(400).json({error: 'No such tutor'})
    }
  
    res.status(200).json(tutor)
}

module.exports = {
    getTutors,
    getTutor,
    createTutor,
    deleteTutor,
    updateTutor
}