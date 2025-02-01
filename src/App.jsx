import './App.css'
import { Routes, Route, useParams } from 'react-router'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from './contexts/UserContext'
import Landing from './components/Landing/Landing'
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm'
import SignInForm from './components/SignInForm/SignInForm'
import ProductList from './components/ProductList/ProductList'
import UserHomePage from './components/UserHomePage/UserHomePage'
import SettingsDrawer from './components/SettingsDrawer/SettingsDrawer'

const App = () => {
  // hooks
  const { user } = useContext(UserContext)
  // const navigate = useNavigate()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // useEffect(() => {
  //   if (user) { navigate(`/users/${user._id}`) }
  // }, [user])

  return (
    <>
      <NavBar setIsDrawerOpen={setIsDrawerOpen} />
      <Routes>
        {user ? (
          <>
            <Route path='/' element={<UserHomePage/>} />
            <Route path='/cart' element={<ProductList />} />
            <Route path='/library' element={<ProductList />} />
            <Route path='/settings' element={<UserHomePage
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen} />}
            />
          </>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default App