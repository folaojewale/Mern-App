import { createContext, useReducer } from 'react'

// Create the TutorialsContext to be used for providing and consuming tutorials-related data
export const TutorialsContext = createContext()

// Reducer function to handle state changes based on dispatched actions
export const tutorialsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TUTORIALS':
      // Set the tutorials data in the state when fetching the tutorials list
      return {
        tutorials: action.payload
      }
    case 'CREATE_TUTORIAL':
      // Add a new tutorial to the state when creating a tutorial
      return {
        tutorials: [action.payload, ...state.tutorials]
      }
    case 'DELETE_TUTORIAL':
      // Remove a tutorial from the state when deleting a tutorial
      return {
        tutorials: state.tutorials.filter((t) => t._id !== action.payload._id)
      }
    default:
      // If no action type matches, return the current state
      return state
  }
}

// TutorialsContextProvider component to wrap the application with the TutorialsContext
export const TutorialsContextProvider = ({ children }) => {
  // Initialize the state and the dispatch function using the tutorialsReducer
  const [state, dispatchTutorial] = useReducer(tutorialsReducer, {
    tutorials: null // Initial state, indicating that tutorials data is not loaded yet
  })

  // Provide the TutorialsContext with the state and dispatch function to its children
  return (
    <TutorialsContext.Provider value={{ ...state, dispatchTutorial }}>
      { children }
    </TutorialsContext.Provider>
  )
}