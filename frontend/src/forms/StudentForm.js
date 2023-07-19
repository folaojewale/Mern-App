import { useState } from 'react'
import { useStudentsContext } from '../hooks/useContext'
import { useAuthContext } from '../hooks/useAuthContext'

const StudentForm = () => {
  const { dispatch } = useStudentsContext()
  const { user } = useAuthContext()

  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [year, setYear] = useState('')
  const [parentNumber, setparentNumber] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!user){
      setError('Login is required')
      return
    }

    const student = {name, school, year, parentNumber}
    
    const response = await fetch('/api/students', {
      method: 'POST',
      body: JSON.stringify(student),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setName('')
      setSchool('')
      setYear('')
      setparentNumber('')
      setEmptyFields([])
      dispatch({type: 'CREATE_STUDENT', payload: json})
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
        onChange={(e) => setparentNumber(e.target.value)} 
        value={parentNumber} 
        className={emptyFields.includes('parentNumber') ? 'error' : ''}
      />

      <button>Add Student</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default StudentForm