import { useContext, useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import { showGame } from './services/userService'
import NavBar from './components/NavBar/NavBar'
import Landing from './components/Landing/Landing'
import './App.css'
import { UserContext } from './contexts/UserContext'
import SettingsComponent from './components/SettingsComponent/SettingsComponent'
import SignUpForm from './components/SignUpForm/SignUpForm'
import SignInForm from './components/SignInForm/SignInForm'
import CardComponent from './components/CardComponent/CardComponent'
import CardDetails from './components/CardDetails/CardDetails'

const App = () => {
  // hooks
  const { user } = useContext(UserContext)
  const navigate = useNavigate();

  // state variable
  const [settings, setSettings] = useState([])
  const [gameData, setGameData] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)

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

  // handler functions 
  const handleCardClick = (game) => {
    setSelectedGame(game)
    setIsModalOpen(!isModalOpen)
  }

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen)
    setSelectedGame(null)
  }

  // prevent background scrolling
  if (isModalOpen) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? (
          <>
            <div className='card-container'>
              <CardComponent
                gameData={gameData}
                onCardClick={handleCardClick}
              />
            </div>
            {isModalOpen && (
              <CardDetails
                gameData={selectedGame}
                onClose={handleCloseModal}
                isModalOpen={isModalOpen}
              />
            )}
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