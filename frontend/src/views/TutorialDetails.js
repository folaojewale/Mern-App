import { useTutorialsContext } from '../hooks/useContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TutorialDetails = ({ tutorial }) => {
  const { dispatchTutorial } = useTutorialsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {

    if(!user) {
      return
    }

    const response = await fetch('/api/tutorials/' + tutorial._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatchTutorial({type: 'DELETE_TUTORIAL', payload: json})
    }
  }

    return (
      <div className="layout-details">
        <h4>{tutorial.title}</h4>
        <p><strong>Tutor: </strong>{tutorial.tutor}</p>
        <p><strong>Time: </strong>{tutorial.time}</p>
        <p><strong>Place: </strong>{tutorial.place}</p>
        <p><strong>Notes: </strong>{tutorial.notes}</p>
        <p><strong>Created: </strong>{formatDistanceToNow(new Date(tutorial.createdAt), { addSuffix: true})}</p>
        <span onClick={handleClick}><FontAwesomeIcon icon={faTrashCan}/></span>
      </div>
    )
  }
  
  export default TutorialDetails