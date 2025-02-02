// imports
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { signIn } from '../../services/authService'
import styles from './SignInForm.module.css'
import VideoGames from '../../assets/VideoGames.png'

// component
const SignInForm = () => {
  // hooks
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

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

  // return
  return (
    <>
      <main className={styles.container}>
        <section>
          <img src={VideoGames} alt='A video game controller' />
        </section>
        <section>
          <form autoComplete="off" onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <p style={{ color: "red" }}>{message}</p>
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
            <button type="submit">Sign In</button>
          </form>
        </section>
      </main>
    </>
  )
}

// export
export default SignInForm