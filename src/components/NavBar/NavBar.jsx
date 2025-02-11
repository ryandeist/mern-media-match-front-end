// imports
import './NavBar.css'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { SettingsContext } from '../../contexts/SettingsContext'
import Icon from '/logos/MediaMatchIcon.png'
// component
const NavBar = () => {
  // hooks
  const { user, setUser } = useContext(UserContext)
  const { handleSeeSettings } = useContext(SettingsContext)

  // state variables 
  const [isNavOpen, setIsNavOpen] = useState(false)

  // use effect
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsNavOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.addEventListener('resize', handleResize)
    }
  }, [])

  // handler functions
  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }
  
  // return
  return (
    <nav className='navbar'>
      <div className='left'>
        <Link to='/'><img src={Icon} alt='Media Match Icon' /></Link>
      </div>
      {user ? (

        <div className='right'>
          <ul className={`nav-links ${isNavOpen ? 'active' : ''}`}>
            <li><Link to={'/'}>Dashboard</Link></li>
            <li><Link to={'/cart'}>Cart</Link></li>
            <li><Link to={'/library'}>Library</Link></li>
            <li><button onClick={()=>handleSeeSettings()} className="navbar-settings-btn">Settings</button></li>
            <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
          </ul>
        </div>
      ) : (
        <div className='right'>
          <ul className={`nav-links ${isNavOpen ? 'active' : ''}`}>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/sign-up'>Sign Up</Link></li>
            <li><Link to='/sign-in'>Sign In</Link></li>
          </ul>
        </div>
      )}

      <div className='hamburger' onClick={handleToggleNav}>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </div>
    </nav>
  )
}

// export
export default NavBar