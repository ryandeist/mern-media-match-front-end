import { useContext, useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import { showGame } from './services/userService'
import NavBar from './components/NavBar/NavBar'
import './App.css'
import { UserContext } from './contexts/UserContext';

const App = () => {
  // state variable
  const [settings, setSettings] = useState(["Indie"])

  const fetchData = async () => {
    const data = await showGame( settings )
    console.log('Data:', data)
  }

  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      <h1>Hello world</h1>
      <button onClick={fetchData}>Fetch Data</button>
    </>
  );
};

export default App;