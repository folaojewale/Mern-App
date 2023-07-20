import { useTutorialsContext } from '../hooks/useContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TutorialDetails = ({ tutorial }) => {
  const { dispatchTutorial } = useTutorialsContext()
  const { user } = useAuthContext()

  // Function to handle the delete button click
  const handleClick = async () => {
    // Check if the user is logged in
    if (!user) {
      return
    }

    // Delete the tutorial using the API
    const response = await fetch('/api/tutorials/' + tutorial._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    // If the tutorial is successfully deleted, dispatch a delete action to update the context
    if (response.ok) {
      dispatchTutorial({ type: 'DELETE_TUTORIAL', payload: json })
    }
  }

  return (
    // Render the tutorial details
    <div className="layout-details">
      <h4>{tutorial.title}</h4>
      <p><strong>Tutor: </strong>{tutorial.tutor}</p>
      <p><strong>Time: </strong>{tutorial.time}</p>
      <p><strong>Place: </strong>{tutorial.place}</p>
      <p><strong>Notes: </strong>{tutorial.notes}</p>
      <p><strong>Created: </strong>{formatDistanceToNow(new Date(tutorial.createdAt), { addSuffix: true })}</p>
      {/* Render the delete button with the trash can icon */}
      <span onClick={handleClick}><FontAwesomeIcon icon={faTrashCan} /></span>
    </div>
  )
}

export default TutorialDetails