import { useState } from "react"
import { useSignup } from "../../hooks/useSignup"

const Signup = () => {
  // State variables to store email and password input values
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Custom hook 'useSignup' to handle signup functionality
  const { signup, error, isLoading } = useSignup()

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Call the 'signup' function from the 'useSignup' hook
    await signup(email, password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      {/* Button to submit the signup form */}
      <button disabled={isLoading}>Sign up</button>

      {/* Display the error message if there is an error */}
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup
