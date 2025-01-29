import { useContext, useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import { showGame } from './services/userService'

import NavBar from './components/NavBar/NavBar'

const App = () => {
  // state variable
  const [settings, setSettings] = useState(["Indie"])

  const fetchData = async () => {
    const data = await showGame( settings )
    console.log('Data:', data)
  }

  return (
    <>
      <NavBar />
      <h1>Hello world</h1>
      <button onClick={fetchData}>Fetch Data</button>
    </>
  )
}

export default App
