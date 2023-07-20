import { useState } from 'react'
import { useTutorsContext } from '../hooks/useContext'
import { useAuthContext } from '../hooks/useAuthContext'

const TutorForm = () => {
  // Get the dispatch function from the TutorsContext to handle tutors-related actions
  const { dispatch } = useTutorsContext()

  // Get the user information from the AuthContext to check if the user is logged in
  const { user } = useAuthContext()

  // States to hold the form input values and error messages
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const [qualifications, setQualifications] = useState('')
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

    // Create a tutor object from the form input values
    const tutor = { name, contact, email, qualifications }

    // Send a POST request to the server to add the tutor
    const response = await fetch('/api/tutors', {
      method: 'POST',
      body: JSON.stringify(tutor),
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
    // If the server response is OK, clear the form inputs and add the new tutor to the state
    if (response.ok) {
      setError(null)
      setName('')
      setContact('')
      setEmail('')
      setQualifications('')
      setEmptyFields([])
      dispatch({ type: 'CREATE_TUTOR', payload: json })
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Tutor</h3>

      <label>Tutor Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Contact Number:</label>
      <input
        type="number"
        onChange={(e) => setContact(e.target.value)}
        value={contact}
        className={emptyFields.includes('contact') ? 'error' : ''}
      />

      <label>Email:</label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className={emptyFields.includes('email') ? 'error' : ''}
      />

      <label>Qualifications:</label>
      <input
        type="text"
        onChange={(e) => setQualifications(e.target.value)}
        value={qualifications}
        className={emptyFields.includes('qualifications') ? 'error' : ''}
      />

      <button>Add Tutor</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default TutorForm