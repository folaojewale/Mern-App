import { createContext, useReducer } from 'react'

export const TutorsContext = createContext()

export const tutorsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TUTORS':
      return { 
        tutors: action.payload 
      }
    case 'CREATE_TUTOR':
      return { 
        tutors: [action.payload, ...state.tutors] 
      }
    case 'DELETE_TUTOR':
      return { 
        tutors: state.tutors.filter(t => t._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const TutorsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tutorsReducer, { 
    tutors: null
  })
  
  return (
    <TutorsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </TutorsContext.Provider>
  )
}