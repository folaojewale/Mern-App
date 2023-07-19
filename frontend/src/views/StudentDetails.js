import {useStudentsContext } from '../hooks/useContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StudentDetails = ({ student }) => {
  const { dispatch } = useStudentsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {

    if(!user) {
      return
    }

    const response = await fetch('/api/students/' + student._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_STUDENT', payload: json})
    }
  }

    return (
      <div className="layout-details">
        <h4>{student.name}</h4>
        <p><strong>School: </strong>{student.school}</p>
        <p><strong>Year: </strong>{student.year}</p>
        <p><strong>Parent Contact: </strong>{student.parentNumber}</p>
        <p><strong>Created: </strong>{formatDistanceToNow(new Date(student.createdAt), { addSuffix: true})}</p>
        <span onClick={handleClick}><FontAwesomeIcon icon={faTrashCan}/></span>
      </div>
    )
  }
  
  export default StudentDetails