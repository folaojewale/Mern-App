import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"

const Login = () => {
  // State variables to store email and password input values
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Custom hook 'useLogin' to handle login functionality
  const { login, error, isLoading } = useLogin()

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Call the 'login' function from the 'useLogin' hook
    await login(email, password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
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

      {/* Button to submit the login form */}
      <button disabled={isLoading}>Log in</button>

      {/* Display the error message if there is an error */}
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login
