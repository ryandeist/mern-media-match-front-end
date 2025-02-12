// imports
import './SignUpForm.css'
import { useState, useContext } from "react"
import { useLocation, useNavigate } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import { signUp } from "../../services/authService"
import Logo from "/MediaMatchLogo22.png"

// components
const SignUpForm = () => {
  // hooks
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()

  // state variables
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  })
  const [message, setMessage] = useState("")
  const { username, password, passwordConfirm } = formData

  // handler functions
  const handleChange = (evt) => {
    setMessage("")
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    try {
      const newUser = await signUp(formData)
      setUser(newUser)
      navigate("/")
    } catch (err) {
      setMessage(err.message)
    }
  }

  // predicate function
  const isSignUpValid = () => {
    return !(
      username &&
      username.length >= 5 &&
      password &&
      password.length >= 6 &&
      password === passwordConfirm
    )
  }

  // return
  return (
    <>
      <main className="sign-up-page">
        <h1 className="sign-up-header">Sign Up</h1>
        <section className="sign-up-row">
          {location.pathname === "/sign-up" && (
            <div className="media-match-logo">
              <img src={Logo} alt="Media Match Logo" />
            </div>
          )}
          <div className="sign-up-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="name"
                  name="username"
                  placeholder="No Special Characters Allowed"
                  value={username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Must be at least 6 characters"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirm">Confirm Password:</label>
                <input
                  type="password"
                  id="confirm"
                  name="passwordConfirm"
                  placeholder="Must be at least 6 characters"
                  value={passwordConfirm}
                  onChange={handleChange}
                  required
                />
              </div>
              <p>{message}</p>
              <button disabled={isSignUpValid()} >Sign Up</button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

// export
export default SignUpForm
