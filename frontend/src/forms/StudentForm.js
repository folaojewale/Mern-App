import { useState } from 'react'
import { useStudentsContext } from '../hooks/useContext'
import { useAuthContext } from '../hooks/useAuthContext'

const StudentForm = () => {
  // Get the dispatch function from the StudentsContext to handle students-related actions
  const { dispatch } = useStudentsContext()

  // Get the user information from the AuthContext to check if the user is logged in
  const { user } = useAuthContext()

  // States to hold the form input values and error messages
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [year, setYear] = useState('')
  const [parentNumber, setParentNumber] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if the user is logged in
    if (!user) {
      setError('Login is required')
      return
    }

    // Create a student object from the form input values
    const student = { name, school, year, parentNumber }

    // Send a POST request to the server to add the student
    const response = await fetch('/api/students', {
      method: 'POST',
      body: JSON.stringify(student),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    // Parse the response JSON
    const json = await response.json()

    // Handle errors if the server response is not OK
    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    // If the server response is OK, clear the form inputs and add the new student to the state
    if (response.ok) {
      setError(null)
      setName('')
      setSchool('')
      setYear('')
      setParentNumber('')
      setEmptyFields([])
      dispatch({ type: 'CREATE_STUDENT', payload: json })
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Student</h3>

      <label>Student Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>School:</label>
      <input
        type="text"
        onChange={(e) => setSchool(e.target.value)}
        value={school}
        className={emptyFields.includes('school') ? 'error' : ''}
      />

      <label>Year:</label>
      <input
        type="number"
        onChange={(e) => setYear(e.target.value)}
        value={year}
        className={emptyFields.includes('year') ? 'error' : ''}
      />

      <label>Parent Contact Number:</label>
      <input
        type="number"
        onChange={(e) => setParentNumber(e.target.value)}
        value={parentNumber}
        className={emptyFields.includes('parentNumber') ? 'error' : ''}
      />

      <button>Add Student</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default StudentForm