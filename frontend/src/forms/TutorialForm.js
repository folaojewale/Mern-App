import { useState, useEffect } from 'react'
import { useTutorialsContext, useTutorsContext } from '../hooks/useContext'
import { useAuthContext } from '../hooks/useAuthContext'

const TutorialForm = () => {
  // Get the dispatchTutorial function from the TutorialsContext to handle tutorials-related actions
  const { dispatchTutorial } = useTutorialsContext()

  // Get the tutors and dispatch function from the TutorsContext to handle tutors-related actions
  const { tutors, dispatch } = useTutorsContext()

  // Get the user information from the AuthContext to check if the user is logged in
  const { user } = useAuthContext()

  // Fetch the tutors list from the server when the component mounts or when the user changes
  useEffect(() => {
    const fetchTutors = async () => {
      const response = await fetch('/api/tutors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_TUTORS', payload: json })
      }
    }

    fetchTutors()
  }, [dispatch, user])

  // States to hold the form input values and error messages
  const [title, setTitle] = useState('')
  const [tutor, setTutor] = useState('')
  const [time, setTime] = useState('')
  const [place, setPlace] = useState('')
  const [notes, setNotes] = useState('')
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

    // Create a tutorial object from the form input values
    const tutorial = { title, tutor, time, place, notes }

    // Send a POST request to the server to add the tutorial
    const response = await fetch('/api/tutorials', {
      method: 'POST',
      body: JSON.stringify(tutorial),
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
    // If the server response is OK, clear the form inputs and add the new tutorial to the state
    if (response.ok) {
      setError(null)
      setTitle('')
      setTutor('')
      setTime('')
      setPlace('')
      setNotes('')
      setEmptyFields([])
      dispatchTutorial({ type: 'CREATE_TUTORIAL', payload: json })
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Tutorial</h3>

      <label>Tutorial Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Tutor:</label>
      <select
        type="text"
        onChange={(e) => setTutor(e.target.value)}
        value={tutor}
        className={emptyFields.includes('tutor') ? 'error' : ''}
      >
        {tutors && tutors.map((tutor) => (
          <option value={tutor.name} key={tutor._id} selected>{tutor.name}</option>
        ))}
      </select>

      <label>Time:</label>
      <input
        type="date"
        onChange={(e) => setTime(e.target.value)}
        value={time}
        className={emptyFields.includes('time') ? 'error' : ''}
      />

      <label>Place:</label>
      <input
        type="text"
        onChange={(e) => setPlace(e.target.value)}
        value={place}
        className={emptyFields.includes('place') ? 'error' : ''}
      />

      <label>Notes:</label>
      <textarea
        type="text"
        onChange={(e) => setNotes(e.target.value)}
        value={notes}
        className={emptyFields.includes('notes') ? 'error' : ''}
      /><br></br>

      <button>Add Tutorial</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default TutorialForm