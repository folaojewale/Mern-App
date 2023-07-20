import { useStudentsContext } from '../hooks/useContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StudentDetails = ({ student }) => {
  const { dispatch } = useStudentsContext()
  const { user } = useAuthContext()

  // Function to handle the delete button click
  const handleClick = async () => {
    // Check if the user is logged in
    if (!user) {
      return
    }

    // Delete the student using the API
    const response = await fetch('/api/students/' + student._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    // If the student is successfully deleted, dispatch a delete action to update the context
    if (response.ok) {
      dispatch({ type: 'DELETE_STUDENT', payload: json })
    }
  }

  return (
    // Render the student details
    <div className="layout-details">
      <h4>{student.name}</h4>
      <p><strong>School: </strong>{student.school}</p>
      <p><strong>Year: </strong>{student.year}</p>
      <p><strong>Parent Contact: </strong>{student.parentNumber}</p>
      <p><strong>Created: </strong>{formatDistanceToNow(new Date(student.createdAt), { addSuffix: true })}</p>
      {/* Render the delete button with the trash can icon */}
      <span onClick={handleClick}><FontAwesomeIcon icon={faTrashCan} /></span>
    </div>
  )
}

export default StudentDetails