import { useEffect } from "react"
import { useStudentsContext } from '../../hooks/useContext'
import { useAuthContext } from '../../hooks/useAuthContext'

//components
import StudentDetails from '../../views/StudentDetails'
import StudentForm from '../../forms/StudentForm'

const Student = () => {
  const {students, dispatch} = useStudentsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('/api/students', {
        headers: {'Authorization': `Bearer ${user.token}`}
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_STUDENTS', payload: json})
      }
    }

    if (user) {
      fetchStudents()
    }

    fetchStudents()
  }, [dispatch, user])

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