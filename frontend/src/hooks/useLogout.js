import { useAuthContext } from './useAuthContext'
import { useStudentsContext, useTutorialsContext, useTutorsContext } from './useContext'

// Custom hook to handle user logout
export const useLogout = () => {
  // Access the auth context dispatch function to update the authentication state
  const { dispatch } = useAuthContext()

  // Access the dispatch functions from other contexts to clear their respective data
  const { dispatch: dispatchStudents } = useStudentsContext()
  const { dispatch: dispatchTutors } = useTutorsContext()
  const { dispatchTutorial: dispatchTutorials } = useTutorialsContext()

  // Function to perform user logout
  const logout = () => {
    // Remove user data from local storage
    localStorage.removeItem('user')

    // Dispatch a logout action to update the auth context
    dispatch({ type: 'LOGOUT' })

    // Clear data in other contexts by setting their states to null
    dispatchStudents({ type: 'SET_WORKOUTS', payload: null })
    dispatchTutors({ type: 'SET_TUTORS', payload: null })
    dispatchTutorials({ type: 'SET_TUTORIALS', payload: null })
  }

  // Return the logout function to be used in components
  return { logout }
}