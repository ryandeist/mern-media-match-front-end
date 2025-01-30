import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { showGame } from './services/userService';
import NavBar from './components/NavBar/NavBar';
import Landing  from './components/Landing/Landing';
import './App.css'
import { UserContext } from './contexts/UserContext'
import SettingsComponent from './components/SettingsComponent/SettingsComponent'
import CardComponent from './components/CardComponent/CardComponent';

const App = () => {
  // hooks
  const { user } = useContext(UserContext)
  // state variable
  const [settings, setSettings] = useState([])
  const [gameData, setGameData] = useState([])

  useEffect(()=> {
    // fetch function
    const fetchData = async () => {
      const fetchedData = await showGame( settings )
      console.log('Fetched Data', fetchedData)
      setGameData(fetchedData)
    }
    fetchData()
  }, [settings])
  
  // fetch function
  const fetchData = async () => {
    const fetchedData = await showGame( settings )
    console.log('Fetched Data', fetchedData)
    setGameData(fetchedData)
  }

  return (

    <>
      <NavBar />
      {user ?  (
        <Landing />
      ) :  (
        <>
          <CardComponent gameData={gameData} />
          <button onClick={fetchData}>Fetch Data</button>
          <SettingsComponent settings={settings} setSettings={setSettings} />
        </>  
      )}
    </>
  );
};

export default App;