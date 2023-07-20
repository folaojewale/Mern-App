import { Link, useLocation } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = () => {
  // Custom hook to handle logout functionality
  const { logout } = useLogout()

  // Custom hook to access user information from the authentication context
  const { user } = useAuthContext()

  // React Router hook to get the current location
  const location = useLocation()

  // Check if the current page is the homepage ("/")
  const homepage = location.pathname === '/'

  // Function to handle the logout button click
  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        {/* Link to the homepage */}
        <Link to="/">
          <h1>Maths Tutorial App</h1>
        </Link>
        <nav>
          {/* If a user is logged in */}
          {user && (
            <div>
              {/* Display user's email */}
              <span><b>{user.email}</b></span>
              {/* Logout button */}
              <button onClick={handleClick}>Log out</button>
              {/* If not on the homepage, show a back button to the homepage */}
              {homepage ? null : (
                <Link to="/">
                  <button>
                    <FontAwesomeIcon icon={faAnglesLeft} />
                  </button>
                </Link>
              )}
            </div>
          )}
          {/* If no user is logged in */}
          {!user && (
            <div>
              {/* Link to the login page */}
              <Link to="/login">Login</Link>
              {/* Link to the signup page */}
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar