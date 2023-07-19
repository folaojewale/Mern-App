import { useEffect } from "react"
import { useTutorsContext } from '../../hooks/useContext'
import { useAuthContext } from '../../hooks/useAuthContext'

//components
import TutorDetails from '../../views/TutorDetails'
import TutorForm from '../../forms/TutorForm'


const Tutor = () => {
  const {tutors, dispatch} = useTutorsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchTutors = async () => {
      const response = await fetch('/api/tutors', {
        headers: {'Authorization': `Bearer ${user.token}`}
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_TUTORS', payload: json})
      }
    }

    if (user) {
      fetchTutors()
    }

    fetchTutors()
  }, [dispatch, user])

    return (
      <>
        <div className="">
          {tutors && tutors.map(tutor => (
              <TutorDetails tutor={tutor} key={tutor._id} />
          ))}
        </div>
        <TutorForm />
      </>
    )
  }
  
  export default Tutor