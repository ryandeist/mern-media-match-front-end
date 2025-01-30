import { useContext, useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import { showGame } from './services/userService'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import { UserContext } from './contexts/UserContext'
import SettingsComponent from './components/SettingsComponent/SettingsComponent'

const App = () => {
  // hooks
  const { user } = useContext(UserContext)
  // state variable
  const [settings, setSettings] = useState([])
  const [gameData, setGameData] = useState({})

  // fetch function
  const fetchData = async () => {
    const data = await showGame( settings )
    console.log('Data', data)
    setGameData(data)
  }

  return (
    <>
      <NavBar />
      <h1>Hello world</h1>
      <button onClick={fetchData}>Fetch Data</button>
      <SettingsComponent settings={settings} setSettings={setSettings}/>
    </>
  );
};

export default App;