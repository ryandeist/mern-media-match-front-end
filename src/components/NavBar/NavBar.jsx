// imports
import './NavBar.css'
import { useContext } from 'react'
import { Link } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { SettingsContext } from '../../contexts/SettingsContext'
import Logo from '../../assets/Logo.png'

// component
const NavBar = () => {
  // hooks
  const { user, setUser } = useContext(UserContext)
  const { handleSeeSettings } = useContext(SettingsContext)

  // handler functions
  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }
  
  // return
  return (
    <nav className='navbar'>
      
      {user ? (
        <ul>
          <Link to='/'><img src={Logo} alt='Media Match Logo' /></Link>
          <li><Link to={'/'}>Dashboard</Link></li>
          <li><Link to={'/cart'}>Cart</Link></li>
          <li><Link to={'/library'}>Library</Link></li>
          <li><button onClick={()=>handleSeeSettings()} className="navbar-settings-btn">Settings</button></li>
          <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul>
          <Link to='/'><img src={Logo} alt='Media Match Logo' /></Link>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/sign-up'>Sign Up</Link></li>
          <li><Link to='/sign-in'>Sign In</Link></li>
        </ul>
      )}
    </nav>
  )
}

// export
export default NavBar