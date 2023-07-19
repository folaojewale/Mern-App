import { Link } from 'react-router-dom'
import{
  faPersonChalkboard,
  faUser,
  faChalkboard,
  faCircleInfo
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Home = () => {
    return (
      <div className='home'>
        <Link to='/student'>
          <div>
            <FontAwesomeIcon icon={faUser} className='icon'/>
            <span>Student</span>
          </div>
        </Link>

        <Link to='/tutorial'>
          <div>
            <FontAwesomeIcon icon={faChalkboard} className='icon'/>
            <span>Tutorial</span>
          </div>
        </Link>

        <Link to='/tutor'>
          <div>
            <FontAwesomeIcon icon={faPersonChalkboard} className='icon'/>
            <span>Tutor</span>
          </div>
        </Link>

        <Link to='/about'>
          <div>
            <FontAwesomeIcon icon={faCircleInfo} className='icon'/>
            <span>About</span>
          </div>
        </Link>

      </div>
    )
  }
  
  export default Home