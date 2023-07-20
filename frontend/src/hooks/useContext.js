// Import necessary context objects and React's useContext hook
import { StudentsContext } from "../context/StudentsContext"
import { TutorsContext } from "../context/TutorsContext"
import { TutorialsContext } from "../context/TutorialContext"
import { useContext } from "react"

// Custom hook to access the StudentsContext and its values
export const useStudentsContext = () => {
  // Access the StudentsContext using the useContext hook
  const context = useContext(StudentsContext)

  // If the context is not available, throw an error indicating that it must be used inside a StudentsContextProvider
  if (!context) {
    throw Error('useStudentsContext must be used inside a StudentsContextProvider')
  }

  // Return the context
  return context
}

// Custom hook to access the TutorsContext and its values
export const useTutorsContext = () => {
  // Access the TutorsContext using the useContext hook
  const context = useContext(TutorsContext)

  // If the context is not available, throw an error indicating that it must be used inside a TutorsContextProvider
  if (!context) {
    throw Error('useTutorsContext must be used inside a TutorsContextProvider')
  }

  // Return the context
  return context
}

// Custom hook to access the TutorialsContext and its values
export const useTutorialsContext = () => {
  // Access the TutorialsContext using the useContext hook
  const context = useContext(TutorialsContext)

  // If the context is not available, throw an error indicating that it must be used inside a TutorialsContextProvider
  if (!context) {
    throw Error('useTutorialsContext must be used inside a TutorialsContextProvider')
  }

  // Return the context
  return context
}