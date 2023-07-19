const express = require('express')
const {
  getTutors,
  getTutor,
  createTutor,
  deleteTutor,
  updateTutor
} = require('../controllers/tutorController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET all tutors
router.get('/', getTutors)

// GET a single tutor
router.get('/:id', getTutor)

// POST a new tutor
router.post('/', createTutor)

// DELETE a tutor
router.delete('/:id', deleteTutor)

// UPDATE a tutor
router.patch('/:id', updateTutor)


module.exports = router