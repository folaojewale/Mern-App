import { useEffect } from "react"
import { useTutorialsContext } from '../../hooks/useContext'
import { useAuthContext } from '../../hooks/useAuthContext'

// Components
import TutorialDetails from '../../views/TutorialDetails'
import TutorialForm from '../../forms/TutorialForm'

const Tutorial = () => {
  // Access the tutorials state and dispatch function from the TutorialsContext
  const { tutorials, dispatchTutorial } = useTutorialsContext()

  // Access the user object from the AuthContext
  const { user } = useAuthContext()

  useEffect(() => {
    // Function to fetch tutorials from the server
    const fetchTutorials = async () => {
      const response = await fetch('/api/tutorials', {
        headers: {'Authorization': `Bearer ${user.token}`}
      })
      const json = await response.json()

      // If the request is successful, update the tutorials state
      if (response.ok) {
        dispatchTutorial({ type: 'SET_TUTORIALS', payload: json })
      }
    }

    // Fetch tutorials only if a user is logged in
    if (user) {
      fetchTutorials()
    }

    // Fetch tutorials on component mount
    fetchTutorials()
  }, [dispatchTutorial, user])

  // Render the list of tutorial details and the tutorial form
  return (
    <>
      <div className="">
        {tutorials && tutorials.map(tutorial => (
          <TutorialDetails tutorial={tutorial} key={tutorial._id} />
        ))}
      </div>
      <TutorialForm />
    </>
  )
}

export default Tutorial