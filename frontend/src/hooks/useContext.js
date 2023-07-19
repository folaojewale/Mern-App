import { StudentsContext } from "../context/StudentsContext"
import { TutorsContext } from "../context/TutorsContext"
import { TutorialsContext } from "../context/TutorialContext"
import { useContext } from "react"

export const useStudentsContext = () => {
  const context = useContext(StudentsContext)

  if(!context) {
    throw Error('useStudentsContext must be used inside an StudentsContextProvider')
  }

  return context
}

export const useTutorsContext = () => {
  const context = useContext(TutorsContext)

  if(!context) {
    throw Error('useTutorsContext must be used inside an TutorsContextProvider')
  }

  return context
}

export const useTutorialsContext = () => {
  const context = useContext(TutorialsContext)

  if(!context) {
    throw Error('useTutorialsContext must be used inside an TutorialsContextProvider')
  }

  return context
}