import './App.css'
import { Routes, Route, useNavigate, useParams } from 'react-router'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from './contexts/UserContext'
import Landing from './components/Landing/Landing'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import SignInForm from './components/SignInForm/SignInForm'
import ProductList from './components/ProductList/ProductList'
import UserHomePage from './components/UserHomePage/UserHomePage'
import ReviewForm from './components/ReviewForm/ReviewForm'


const App = () => {
  // hooks
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    if (user) { navigate(`/users/${user._id}`) }
  }, [user, navigate])

  return (
    <>
      <NavBar setIsDrawerOpen={setIsDrawerOpen} />
      <Routes>
        <Route path="/" element={<Landing />} />
        {user ? (
          <>
            <Route path='users/:userId' element={<UserHomePage
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