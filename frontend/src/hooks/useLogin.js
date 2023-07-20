import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

// Custom hook to handle user login
export const useLogin = () => {
  // State variables to manage error and loading states
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  // Access the auth context and its dispatch function
  const { dispatch } = useAuthContext()

  // Function to perform the login process
  const login = async (email, password) => {
    // Set loading state to true and clear any previous errors
    setIsLoading(true)
    setError(null)

    // Make a login request to the backend
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    // Handle the response based on success or failure
    if (!response.ok) {
      // If the login request failed, update the error state and loading state accordingly
      setIsLoading(false)
      setError(json.error)
    } else {
      // If the login request was successful:
      // - Save the user data to local storage for persistence across sessions
      localStorage.setItem('user', JSON.stringify(json))

      // - Update the auth context with the user data
      dispatch({ type: 'LOGIN', payload: json })

      // - Update loading state to false
      setIsLoading(false)
    }
  }

  // Return the login function, isLoading state, and error state to be used in components
  return { login, isLoading, error }
}