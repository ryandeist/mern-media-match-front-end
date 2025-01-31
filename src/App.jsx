import './App.css'
import { Routes, Route, useNavigate } from 'react-router'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from './contexts/UserContext'
import { showGame } from './services/apiService'
// import { showSettings } from './services/userService'
import Landing from './components/Landing/Landing'
import NavBar from './components/NavBar/NavBar'

import SignUpForm from './components/SignUpForm/SignUpForm'
import SignInForm from './components/SignInForm/SignInForm'
import ProductList from './components/ProductList/ProductList'
import UserHomePage from './components/UserHomePage/UserHomePage'

const App = () => {
  // hooks
  const { user } = useContext(UserContext)
  const navigate = useNavigate();

  // state variable
  const [settings, setSettings] = useState([])
  const [gameData, setGameData] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)

  // useEffect(() => {
  //   // fetch function
  //   const fetchSettings = async () => {
  //     const fetchedSettings = await showSettings()
  //     console.log('saved settings', fetchSettings)
  //     setSettings(fetchedSettings || [])
  //   }
  //   fetchSettings()
  // }, [])

  useEffect(() => {
    // fetch function
    if (user) { navigate(`/users/${user._id}`) }
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
      <NavBar setIsDrawerOpen={setIsDrawerOpen} />
      <Routes>
        <Route path="/" element={<Landing />} />
        {user ? (
          <>
            <Route path='users/:userId' element={<UserHomePage
              settings={settings}
              setSettings={setSettings}
              fetchData={fetchData}
              selectedGame={selectedGame}
              onClose={handleCloseModal}
              isModalOpen={isModalOpen}
              gameData={gameData}
              onCardClick={handleCardClick}
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen} />}
            />
            <Route path='users/:userId/shoppingCart' element={<ProductList />} />
            <Route path='users/:userId/library' element={<ProductList />} />
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;