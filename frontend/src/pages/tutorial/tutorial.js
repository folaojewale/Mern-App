import { useEffect } from "react"
import { useTutorialsContext } from '../../hooks/useContext'
import { useAuthContext } from '../../hooks/useAuthContext'

//components
import TutorialDetails from '../../views/TutorialDetails'
import TutorialForm from '../../forms/TutorialForm'

const Tutorial = () => {
  const {tutorials, dispatchTutorial} = useTutorialsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchTutorials = async () => {
      const response = await fetch('/api/tutorials', {
        headers: {'Authorization': `Bearer ${user.token}`}
      })
      const json = await response.json()

      if (response.ok) {
        dispatchTutorial({type: 'SET_TUTORIALS', payload: json})
      }
    }

    if (user) {
      fetchTutorials()
    }

    fetchTutorials()
  }, [dispatchTutorial, user])

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