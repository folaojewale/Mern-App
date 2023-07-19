import {useTutorsContext } from '../hooks/useContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TutorDetails = ({ tutor }) => {
  const { dispatch } = useTutorsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {

    if(!user) {
      return
    }

    const response = await fetch('/api/tutors/' + tutor._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_TUTOR', payload: json})
    }
  }

    return (
      <div className="layout-details">
        <h4>{tutor.name}</h4>
        <p><strong>Contact: </strong>{tutor.contact}</p>
        <p><strong>Email: </strong>{tutor.email}</p>
        <p><strong>Qualifications: </strong>{tutor.qualifications}</p>
        <p><strong>Created: </strong>{formatDistanceToNow(new Date(tutor.createdAt), { addSuffix: true})}</p>
        <span onClick={handleClick}><FontAwesomeIcon icon={faTrashCan}/></span>
      </div>
    )
  }
  
  export default TutorDetails