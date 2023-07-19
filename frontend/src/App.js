import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './pages/home'
import Student from './pages/student/student'
import Tutor from './pages/tutor/tutor'
import Tutorial from './pages/tutorial/tutorial'
import About from './pages/about'
import Navbar from './components/navbar'
import Login from './pages/user/Login'
import Signup from './pages/user/Signup'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>} />

            <Route path="/" element={user ? <Home /> : <Navigate to="/login"/>} />
            <Route path="/student" element={user ? <Student /> : <Navigate to="/login"/>} />
            <Route path="/tutor" element={user ? <Tutor /> : <Navigate to="/login"/>} />
            <Route path="/tutorial" element={user ? <Tutorial /> : <Navigate to="/login"/>} />

            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
