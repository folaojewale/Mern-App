const express = require('express')
const router = express.Router()

// GET all past tutorials
router.get('/', (req, res) => {
  res.json({mssg: 'GET all workouts'})
})

// GET a single past tutorial
router.get('/:id', (req, res) => {
  res.json({mssg: 'GET a single workout'})
})

// DELETE past tutorial
router.delete('/:id', (req, res) => {
  res.json({mssg: 'DELETE a workout'})
})

// UPDATE past tutorial
router.patch('/:id', (req, res) => {
  res.json({mssg: 'UPDATE a workout'})
})

module.exports = router