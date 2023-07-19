const express = require('express')
const {
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent
} = require('../controllers/studentController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET all students
router.get('/', getStudents)

// GET a single student
router.get('/:id', getStudent)

// POST a new student
router.post('/', createStudent)

// DELETE a student
router.delete('/:id', deleteStudent)

// UPDATE a student
router.patch('/:id', updateStudent)


module.exports = router