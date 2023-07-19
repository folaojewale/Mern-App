const express = require('express')
const {
  getTutorials,
  getTutorial,
  createTutorial,
  deleteTutorial,
  updateTutorial
} = require('../controllers/tutorialController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET all tutorials
router.get('/', getTutorials)

// GET a single tutorial
router.get('/:id', getTutorial)

// POST a new tutorial
router.post('/', createTutorial)

// DELETE a tutorial
router.delete('/:id', deleteTutorial)

// UPDATE a tutorial
router.patch('/:id', updateTutorial)


module.exports = router