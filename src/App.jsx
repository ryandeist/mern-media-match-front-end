import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/sign-up">Sign Up</Link>
        <Link to="/sign-in">Sign In</Link>
      </nav>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<h1>Empty Pizza Box Media Match!</h1>} />
      </Routes>
    </Router>
  )
}

export default App