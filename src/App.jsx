import { useContext, useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import { showGame } from './services/userService'
import NavBar from './components/NavBar/NavBar'
import Landing from './components/Landing/Landing'
import './App.css'
import { UserContext } from './contexts/UserContext'
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

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)

  useEffect(() => {
    // fetch function
    const fetchData = async () => {
      if (user) {navigate(`/users/${user._id}`)}
      const fetchedData = await showGame(settings)
      console.log('UseEffect Fetched Data triggered')
      setGameData(fetchedData)
    }
    fetchData()
  }, [settings])

  // fetch function
  const fetchData = async () => {
    const fetchedData = await showGame(settings)
    console.log('Function Fetched Data', fetchedData)
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
              onCardClick={handleCardClick}/> } />
            <Route path='users/:userId/shoppingCart' element={<ProductList />} />
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