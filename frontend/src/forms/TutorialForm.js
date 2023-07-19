import { useState, useEffect } from 'react'
import { useTutorialsContext, useTutorsContext } from '../hooks/useContext'
import { useAuthContext } from '../hooks/useAuthContext'

const TutorialForm = () => {

  const { dispatchTutorial } = useTutorialsContext()
  const { tutors, dispatch } = useTutorsContext()
  const { user } = useAuthContext()

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
      console.log(json)

      if (response.ok) {
        dispatch({type: 'SET_TUTORS', payload: json})
      }
    }

    fetchTutors()
  }, [dispatch, user])

  const [title, setTitle] = useState('')
  const [tutor, setTutor] = useState('')
  const [time, setTime] = useState('')
  const [place, setPlace] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!user){
      setError('Login is required')
      return
    }

    const tutorial = {title, tutor, time, place, notes}
    const response = await fetch('/api/tutorials', {
      method: 'POST',
      body: JSON.stringify(tutorial),
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
      setTitle('')
      setTutor('')
      setTime('')
      setPlace('')
      setNotes('')
      setEmptyFields([])
      dispatchTutorial({type: 'CREATE_TUTORIAL', payload: json})
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
        {tutors && tutors.map(tutor => (
          <option value={tutor.name} key={tutor._id}>{tutor.name}</option>
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