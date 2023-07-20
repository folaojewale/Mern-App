import { createContext, useReducer } from 'react'

// Create the TutorsContext to be used for providing and consuming tutors-related data
export const TutorsContext = createContext()

// Reducer function to handle state changes based on dispatched actions
export const tutorsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TUTORS':
      // Set the tutors data in the state when fetching the tutors list
      return {
        tutors: action.payload
      }
    case 'CREATE_TUTOR':
      // Add a new tutor to the state when creating a tutor
      return {
        tutors: [action.payload, ...state.tutors]
      }
    case 'DELETE_TUTOR':
      // Remove a tutor from the state when deleting a tutor
      return {
        tutors: state.tutors.filter(t => t._id !== action.payload._id)
      }
    default:
      // If no action type matches, return the current state
      return state
  }
}

// TutorsContextProvider component to wrap the application with the TutorsContext
export const TutorsContextProvider = ({ children }) => {
  // Initialize the state and the dispatch function using the tutorsReducer
  const [state, dispatch] = useReducer(tutorsReducer, {
    tutors: null // Initial state, indicating that tutors data is not loaded yet
  })

  // Provide the TutorsContext with the state and dispatch function to its children
  return (
    <TutorsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </TutorsContext.Provider>
  )
}