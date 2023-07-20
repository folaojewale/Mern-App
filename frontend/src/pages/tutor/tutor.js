import { useEffect } from "react"
import { useTutorsContext } from '../../hooks/useContext'
import { useAuthContext } from '../../hooks/useAuthContext'

// Components
import TutorDetails from '../../views/TutorDetails'
import TutorForm from '../../forms/TutorForm'

const Tutor = () => {
  // Access the tutors state and dispatch function from the TutorsContext
  const { tutors, dispatch } = useTutorsContext()

  // Access the user object from the AuthContext
  const { user } = useAuthContext()

  useEffect(() => {
    // Function to fetch tutors from the server
    const fetchTutors = async () => {
      const response = await fetch('/api/tutors', {
        headers: {'Authorization': `Bearer ${user.token}`}
      })
      const json = await response.json()

      // If the request is successful, update the tutors state
      if (response.ok) {
        dispatch({type: 'SET_TUTORS', payload: json})
      }
    }

    // Fetch tutors only if a user is logged in
    if (user) {
      fetchTutors()
    }

    // Fetch tutors on component mount
    fetchTutors()
  }, [dispatch, user])

  // Render the list of tutor details and the tutor form
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