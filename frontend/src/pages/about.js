import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const about = () => {

    return (
      <>
      <div className = 'about'>
          <header>
            <h1>About</h1>
          </header>

          <main>
            <section>
              <h2> Website</h2>
              <p>This website is a mern application using the Model, View and Controller model. The website allows you to create and delete students, tutors, and tutorials.</p>
            </section>

            <section>
              <h2>Objective</h2>
              <p>This was a summer project where I created my first mern app, as I will be entering my 3rd Year at Maynooth University. The backend works as an api so you can request any information you would like provided that the user has been given a token</p>
            </section>
          </main>

          <footer>
            <p><a href='https://github.com/folaojewale'>Check my GitHub for the Source Code <FontAwesomeIcon icon={faGithub}/></a></p>
          </footer>
      </div>
      </>
    )
  }
  
  export default about