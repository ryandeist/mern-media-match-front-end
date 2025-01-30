import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { showGame } from './services/userService';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import SettingsComponent from './components/SettingsComponent/SettingsComponent'
import CardComponent from './components/CardComponent/CardComponent';
import { UserContext } from './contexts/UserContext'
import './App.css';

const App = () => {
  // hooks
  const { user } = useContext(UserContext)
  // state variable
  const [settings, setSettings] = useState([])
  const [gameData, setGameData] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    // fetch function
    const fetchData = async () => {
      const fetchedData = await showGame(settings)
      console.log('Fetched Data', fetchedData)
      setGameData(fetchedData)
    }
    fetchData()
  }, [settings])

  // fetch function
  const fetchData = async () => {
    const fetchedData = await showGame(settings)
    console.log('Fetched Data', fetchedData)
    setGameData(fetchedData)
  }
  return (

    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? (
          <>
            <CardComponent gameData={gameData} />
            <button onClick={fetchData}>Fetch Data</button>
            <SettingsComponent settings={settings} setSettings={setSettings} />
          </>
        ) : (
          <Landing />
        )} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
      </Routes>
    </>
  );
};

export default App;