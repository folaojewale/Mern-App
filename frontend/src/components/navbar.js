import { Link, useLocation } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Navbar = () => {

  const { logout } = useLogout()
  const { user } = useAuthContext()
  const location = useLocation()
  const homepage = location.pathname ==='/'

  const handleClick = () => {
    logout()
  }

  
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Maths Tutorial App</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
              {homepage ? null :<Link to="/"><button><FontAwesomeIcon icon={faAnglesLeft}/></button></Link>}
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>  
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar