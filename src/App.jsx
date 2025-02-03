// imports
import './App.css'
import { useContext, useState } from 'react'
import { Route, Routes } from 'react-router'
import { UserContext } from './contexts/UserContext'
import Landing from './components/Landing/Landing'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import SignInForm from './components/SignInForm/SignInForm'
import ProductList from './components/ProductList/ProductList'
import UserHomePage from './components/UserHomePage/UserHomePage'
import ReviewForm from './components/ReviewForm/ReviewForm'


// component
const App = () => {
  // hooks
  const { user } = useContext(UserContext)

  // state variables
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)

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

  // return
  return (
    <>
      <NavBar />
      <Routes>
        {user ? (
          <>
            <Route path='/' element={<UserHomePage
              handleCardClick={handleCardClick}
              handleCloseModal={handleCloseModal}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              selectedGame={selectedGame}
            />} />
            <Route path='/cart' element={<ProductList
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              onCardClick={handleCardClick}
              onClose={handleCloseModal}
              selectedGame={selectedGame}
            />} />
            <Route path='/library' element={<ProductList
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              onCardClick={handleCardClick}
              onClose={handleCloseModal}
              selectedGame={selectedGame}
            />} />
            <Route path='/settings' element={<UserHomePage
              handleCardClick={handleCardClick}
              handleCloseModal={handleCloseModal}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              selectedGame={selectedGame}
            />} />
            <Route path='/*' element={<UserHomePage
              handleCardClick={handleCardClick}
              handleCloseModal={handleCloseModal}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              selectedGame={selectedGame}
            />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/*" element={<Landing />} />
          </>
        )}
      </Routes>
    </>
  )
}

// export
export default App