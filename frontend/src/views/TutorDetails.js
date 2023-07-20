import { useTutorsContext } from '../hooks/useContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TutorDetails = ({ tutor }) => {
  const { dispatch } = useTutorsContext()
  const { user } = useAuthContext()

  // Function to handle the delete button click
  const handleClick = async () => {
    // Check if the user is logged in
    if (!user) {
      return
    }

    // Delete the tutor using the API
    const response = await fetch('/api/tutors/' + tutor._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    // If the tutor is successfully deleted, dispatch a delete action to update the context
    if (response.ok) {
      dispatch({ type: 'DELETE_TUTOR', payload: json })
    }
  }

  return (
    // Render the tutor details
    <div className="layout-details">
      <h4>{tutor.name}</h4>
      <p><strong>Contact: </strong>{tutor.contact}</p>
      <p><strong>Email: </strong>{tutor.email}</p>
      <p><strong>Qualifications: </strong>{tutor.qualifications}</p>
      <p><strong>Created: </strong>{formatDistanceToNow(new Date(tutor.createdAt), { addSuffix: true })}</p>
      {/* Render the delete button with the trash can icon */}
      <span onClick={handleClick}><FontAwesomeIcon icon={faTrashCan} /></span>
    </div>
  )
}

export default TutorDetails