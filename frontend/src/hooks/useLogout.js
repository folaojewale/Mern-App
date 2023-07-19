import { useAuthContext } from './useAuthContext'
import { useStudentsContext, useTutorialsContext, useTutorsContext } from './useContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchStudents } = useStudentsContext()
  const { dispatch: dispatchTutors } = useTutorsContext()
  const { dispatchTutorial: dispatchTutorials } = useTutorialsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchStudents({ type: 'SET_WORKOUTS', payload: null })
    dispatchTutors({ type: 'SET_TUTORS', payload: null })
    dispatchTutorials({ type: 'SET_TUTORIALS', payload: null })
  }

  return { logout }
}