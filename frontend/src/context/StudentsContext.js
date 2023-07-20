import { createContext, useReducer } from 'react'

// Create the StudentsContext to be used for providing and consuming students-related data
export const StudentsContext = createContext()

// Reducer function to handle state changes based on dispatched actions
export const studentsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STUDENTS':
      // Set the students data in the state when fetching the students list
      return {
        students: action.payload
      }
    case 'CREATE_STUDENT':
      // Add a new student to the state when creating a student
      return {
        students: [action.payload, ...state.students]
      }
    case 'DELETE_STUDENT':
      // Remove a student from the state when deleting a student
      return {
        students: state.students.filter(s => s._id !== action.payload._id)
      }
    default:
      // If no action type matches, return the current state
      return state
  }
}

// StudentsContextProvider component to wrap the application with the StudentsContext
export const StudentsContextProvider = ({ children }) => {
  // Initialize the state and the dispatch function using the studentsReducer
  const [state, dispatch] = useReducer(studentsReducer, {
    students: null // Initial state, indicating that students data is not loaded yet
  })

  // Provide the StudentsContext with the state and dispatch function to its children
  return (
    <StudentsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </StudentsContext.Provider>
  )
}
