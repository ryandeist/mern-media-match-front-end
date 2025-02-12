// imports
import './SignInForm.css'
import { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { signIn } from '../../services/authService'
import Logo from '/MediaMatchLogo22.png'

// component
const SignInForm = () => {
  // hooks
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()

  // state variables
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [message, setMessage] = useState('')
  const { username, password } = formData

  // handler functions
  const handleChange = (e) => {
    setMessage('')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      const signedInUser = await signIn(formData)

      setUser(signedInUser)
      navigate('/')
    } catch (err) {
      setMessage(err.message)
    }
  }

  // predicate function
  const isSignUpValid = () => {
    return !(
      username &&
      password 
    )
  }


  // return
  return (
    <>
      <main className='sign-in-page'>
        <h1 className='sign-in-header'>Sign In</h1>
        <section className='sign-in-row'>
          {location.pathname === "/sign-in" &&
            <div className='media-match-logo'>
              <img src={Logo} alt='Media Match Logo' />
            </div>
          }
          <div className='sign-in-form'>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </div>
              <p>{message}</p>
              <button disabled={isSignUpValid()}>Sign In</button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

// export
export default SignInForm