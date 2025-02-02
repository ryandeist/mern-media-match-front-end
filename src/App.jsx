// imports
import './App.css'
import { useContext, useEffect, useState } from 'react'
import { useLocation, Route, Routes } from 'react-router'
import { UserContext } from './contexts/UserContext'
import Landing from './components/Landing/Landing'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import SignInForm from './components/SignInForm/SignInForm'
import ProductList from './components/ProductList/ProductList'
import UserHomePage from './components/UserHomePage/UserHomePage'
import { getEntireCart } from './services/cartService'

// component
const App = () => {
  // hooks
  const location = useLocation()
  const { user } = useContext(UserContext)
  

  // state variables
  const [cart, setCart] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)

  // use effect
  useEffect(() => {
    const fetchCart = async () => {
        try {
        const cartData = await getEntireCart(user._id)
        setCart(cartData.cart)
        } catch (err) {
        console.log('Error Fetching Cart', err)
        }
    }
    fetchCart()
  },[location])


  // handler functions
  const handleCardClick = (game) => {
    setSelectedGame(game)
    setIsModalOpen(!isModalOpen)
  }

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen)
    setSelectedGame(null)
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
              onCardClick={handleCardClick}
              onClose={handleCloseModal}
              productsList={cart} 
              setProductsList={setCart}
              selectedGame={selectedGame}
            />} />
            <Route path='/library' element={<ProductList 
              isModalOpen={isModalOpen}
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