import { createContext, useReducer } from 'react'

export const TutorialsContext = createContext()

export const tutorialsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TUTORIALS':
      return { 
        tutorials: action.payload 
      }
    case 'CREATE_TUTORIAL':
      return { 
        tutorials: [action.payload, ...state.tutorials] 
      }
    case 'DELETE_TUTORIAL':
      return { 
        tutorials: state.tutorials.filter((t) => t._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const TutorialsContextProvider = ({ children }) => {
  const [state, dispatchTutorial] = useReducer(tutorialsReducer, { 
    tutorials: null
  })
  
  return (
    <TutorialsContext.Provider value={{ ...state, dispatchTutorial }}>
      { children }
    </TutorialsContext.Provider>
  )
}