import { useEffect } from "react"
import { useStudentsContext } from '../../hooks/useContext'
import { useAuthContext } from '../../hooks/useAuthContext'

// Components
import StudentDetails from '../../views/StudentDetails'
import StudentForm from '../../forms/StudentForm'

const Student = () => {
  // Access the students state and dispatch function from the StudentsContext
  const { students, dispatch } = useStudentsContext()

  // Access the user object from the AuthContext
  const { user } = useAuthContext()

  useEffect(() => {
    // Function to fetch students from the server
    const fetchStudents = async () => {
      const response = await fetch('/api/students', {
        headers: {'Authorization': `Bearer ${user.token}`}
      })
      const json = await response.json()

      // If the request is successful, update the students state
      if (response.ok) {
        dispatch({type: 'SET_STUDENTS', payload: json})
      }
    }

    // Fetch students only if a user is logged in
    if (user) {
      fetchStudents()
    }

    // Fetch students on component mount
    fetchStudents()
  }, [dispatch, user])

  // Render the list of student details and the student form
  return (
    <>
      <div className="">
        {students && students.map(student => (
          <StudentDetails student={student} key={student._id} />
        ))}
      </div>
      <StudentForm />
    </>
  )
}

export default Student