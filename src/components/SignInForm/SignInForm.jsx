// imports
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { signIn } from '../../services/authService'
import styles from './SignInForm.module.css'
import Logo from '/public/Logo.png'

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
          <h1>Sign In</h1>
          <img src={Logo} alt='Media Match Logo' />
        </section>
        <section>
          <form autoComplete="off" onSubmit={handleSubmit}>
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