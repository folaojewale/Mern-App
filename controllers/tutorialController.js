const Tutorial = require('../models/tutorialModel')
const mongoose = require('mongoose')

// get all students
const getTutorials = async (req, res) => {
  const user_id = req.user._id

  const tutorial = await Tutorial.find({user_id}).sort({createdAt: -1})

  res.status(200).json(tutorial)
}

// get a single tutorial
const getTutorial = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such tutorial'})
  }

  const tutorial = await Tutorial.findById(id)

  if (!tutorial) {
    return res.status(404).json({error: 'No such tutorial'})
  }

  res.status(200).json(tutorial)
}

// create a new tutorial
const createTutorial = async (req, res) => {
  const {title, tutor, time, place, notes} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!tutor) {
    emptyFields.push('tutor')
  }
  if(!time) {
    emptyFields.push('time')
  }
  if(!place) {
    emptyFields.push('place')
  }
  if(!notes) {
    emptyFields.push('notes')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill the required fields', emptyFields})
  }


  // add to the database
  try {
    const user_id = req.user._id
    const tutorial = await Tutorial.create({title, tutor, time, place, notes, user_id})
    res.status(200).json(tutorial)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a tutorial
const deleteTutorial = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such tutorial'})
    }
  
    const tutorial = await Tutorial.findOneAndDelete({_id: id})
  
    if(!tutorial) {
      return res.status(400).json({error: 'No such tutorial'})
    }
  
    res.status(200).json(tutorial)
}

// update a tutorial
const updateTutorial = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such tutorial'})
    }
  
    const tutorial = await Tutorial.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!tutorial) {
      return res.status(400).json({error: 'No such tutorial'})
    }
  
    res.status(200).json(tutorial)
}

module.exports = {
    getTutorials,
    getTutorial,
    createTutorial,
    deleteTutorial,
    updateTutorial
}